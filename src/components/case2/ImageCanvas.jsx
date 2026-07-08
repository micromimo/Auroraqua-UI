import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import GlassCard from './GlassCard';

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function ImageCanvas({
  imagePath,
  bbox,
  maskBase64,
  action,
  isFinished,
  showImage = true,
}) {
  const wrapperRef = useRef(null);
  const imgElRef = useRef(null);
  const overlayRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const maskImgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [wrapperSize, setWrapperSize] = useState({ w: 0, h: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imagePath) {
      setImgUrl(null);
      setError(null);
      setImgSize({ w: 0, h: 0 });
      return;
    }

    setError(null);

    const isBlob = imagePath.startsWith("blob:");
    const isData = imagePath.startsWith("data:");
    const isHttp = imagePath.startsWith("http");

    if (isBlob || isData || isHttp) {
      setImgUrl(imagePath);
      return;
    }

    setImgUrl(imagePath);
  }, [imagePath]);

  const debouncedUpdate = useMemo(() => {
    return debounce(() => {
      if (wrapperRef.current) {
        const r = wrapperRef.current.getBoundingClientRect();
        const newW = Math.floor(r.width);
        const newH = Math.floor(r.height);
        if (newW !== wrapperSize.w || newH !== wrapperSize.h) {
          setWrapperSize({ w: newW, h: newH });
        }
      }
    }, 100);
  }, [wrapperSize.w, wrapperSize.h]);

  useEffect(() => {
    const update = () => debouncedUpdate();
    update();
    if (wrapperRef.current) {
      const obs = new ResizeObserver(update);
      obs.observe(wrapperRef.current);
      return () => obs.disconnect();
    }
  }, [debouncedUpdate]);

  const handleImgLoad = useCallback((e) => {
    const el = e.currentTarget;
    setImgSize({ w: el.naturalWidth, h: el.naturalHeight });
    setError(null);
  }, []);

  const handleImgError = useCallback(() => {
    setError("无法加载图像，请检查文件格式或路径");
  }, []);

  const renderOverlay = useCallback((shouldRender) => {
    const overlay = overlayRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!overlay || !maskCanvas) return;
    if (!imgSize.w || !imgSize.h || !wrapperSize.w || !wrapperSize.h) return;

    const padding = 16;
    const maxW = wrapperSize.w - padding * 2;
    const maxH = wrapperSize.h - padding * 2;
    const aspect = imgSize.w / imgSize.h;
    let drawW = maxW;
    let drawH = maxW / aspect;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = maxH * aspect;
    }
    const offsetX = (wrapperSize.w - drawW) / 2;
    const offsetY = (wrapperSize.h - drawH) / 2;

    const dpr = window.devicePixelRatio || 1;

    const overlayCtx = overlay.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");

    if (!overlayCtx || !maskCtx) return;

    if (shouldRender) {
      overlay.width = wrapperSize.w * dpr;
      overlay.height = wrapperSize.h * dpr;
      overlay.style.width = `${wrapperSize.w}px`;
      overlay.style.height = `${wrapperSize.h}px`;
      overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maskCanvas.width = wrapperSize.w * dpr;
      maskCanvas.height = wrapperSize.h * dpr;
      maskCanvas.style.width = `${wrapperSize.w}px`;
      maskCanvas.style.height = `${wrapperSize.h}px`;
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    maskCtx.clearRect(0, 0, wrapperSize.w, wrapperSize.h);
    if (maskBase64) {
      if (!maskImgRef.current) {
        maskImgRef.current = new Image();
      }
      maskImgRef.current.onload = () => {
        maskCtx.drawImage(maskImgRef.current, offsetX, offsetY, drawW, drawH);
      };
      maskImgRef.current.src = `data:image/png;base64,${maskBase64}`;
    }

    overlayCtx.clearRect(0, 0, wrapperSize.w, wrapperSize.h);

    if (bbox && !isFinished) {
      const scale = drawW / imgSize.w;
      const bx = bbox.x * scale + offsetX;
      const by = bbox.y * scale + offsetY;
      const bw = bbox.width * scale;
      const bh = bbox.height * scale;

      const isZoom = (action || "").toLowerCase().includes("zoom");
      const color = isZoom ? "#ec4899" : "#a78bfa";

      overlayCtx.save();
      overlayCtx.strokeStyle = color;
      overlayCtx.lineWidth = 3;
      overlayCtx.shadowColor = color;
      overlayCtx.shadowBlur = 12;
      overlayCtx.strokeRect(bx, by, bw, bh);
      overlayCtx.fillStyle = `${color}22`;
      overlayCtx.fillRect(bx, by, bw, bh);

      const cornerLen = Math.min(16, Math.min(bw, bh) * 0.2);
      overlayCtx.strokeStyle = color;
      overlayCtx.lineWidth = 4;
      overlayCtx.beginPath();
      overlayCtx.moveTo(bx, by + cornerLen);
      overlayCtx.lineTo(bx, by);
      overlayCtx.lineTo(bx + cornerLen, by);
      overlayCtx.moveTo(bx + bw - cornerLen, by);
      overlayCtx.lineTo(bx + bw, by);
      overlayCtx.lineTo(bx + bw, by + cornerLen);
      overlayCtx.moveTo(bx + bw, by + bh - cornerLen);
      overlayCtx.lineTo(bx + bw, by + bh);
      overlayCtx.lineTo(bx + bw - cornerLen, by + bh);
      overlayCtx.moveTo(bx + cornerLen, by + bh);
      overlayCtx.lineTo(bx, by + bh);
      overlayCtx.lineTo(bx, by + bh - cornerLen);
      overlayCtx.stroke();
      overlayCtx.restore();
    }
  }, [imgSize, wrapperSize, bbox, action, isFinished, maskBase64]);

  useEffect(() => {
    renderOverlay(true);
  }, [renderOverlay]);

  useEffect(() => {
    if (bbox || action || isFinished) {
      renderOverlay(false);
    }
  }, [bbox, action, isFinished, renderOverlay]);

  return (
    <GlassCard glow className="w-full h-full flex-1 flex flex-col min-h-0 overflow-hidden">
      <div ref={wrapperRef} className="relative w-full h-full">
        {!imagePath ? (
          <div className="absolute inset-0 flex items-center justify-center text-center text-slate-600">
            <div>
              <div className="text-5xl mb-4 opacity-70">🖼️</div>
              <div className="text-lg font-medium">请在左侧点击「选择图像」开始</div>
              <div className="text-sm mt-2 text-slate-500">
                支持 JPG / PNG / WEBP
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-center text-slate-700 px-6">
            <div>
              <div className="text-5xl mb-4">⚠️</div>
              <div className="text-sm text-pink-700 break-all">{error}</div>
            </div>
          </div>
        ) : (
          <>
            {imgUrl && showImage && (
              <img
                ref={imgElRef}
                src={imgUrl}
                alt="preview"
                onLoad={handleImgLoad}
                onError={handleImgError}
                className="absolute rounded-xl"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  boxShadow: "0 0 40px rgba(236, 72, 153, 0.35)",
                  display: imgSize.w ? "block" : "none",
                }}
              />
            )}
            <canvas
              ref={maskCanvasRef}
              className="absolute inset-0 pointer-events-none"
            />
            <canvas
              ref={overlayRef}
              className="absolute inset-0 pointer-events-none"
            />
            {!imgSize.w && imgUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                加载中...
              </div>
            )}
          </>
        )}
        {isFinished && imgSize.w ? (
          <div className="absolute top-4 left-4 liquid-glass-strong px-4 py-2 rounded-xl text-xs">
            <span className="neon-text-pink font-semibold tracking-wider">
              ✓ 提取完成
            </span>
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}