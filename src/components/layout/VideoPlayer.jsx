import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Maximize, Minimize, Eye, EyeOff, RotateCcw, Monitor, Cpu, Zap, Activity, Gauge, HardDrive } from 'lucide-react'
import StatPill from '../data/StatPill'
import ControlButton from '../form/ControlButton'

export default function VideoPlayer({ 
  isConnected, 
  displayScale, 
  rotation, 
  showFpsOverlay,
  stats 
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const [isSystemFullscreen, setIsSystemFullscreen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSystemFullscreen) {
        setIsSystemFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSystemFullscreen])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  const toggleSystemFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setIsSystemFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsSystemFullscreen(false)
    }
  }, [])

  return (
    <div className="absolute inset-0 p-6 pt-24 flex items-center justify-center">
      <div 
        ref={containerRef}
        className={`video-container glass-dark w-full h-full flex items-center justify-center ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={(e) => {
          if (e.target === containerRef.current) setShowOverlay(v => !v)
        }}
      >
        {isConnected ? (
          <>
            <div className="relative" style={{ 
              transform: `scale(${displayScale})`,
              transition: 'transform 0.3s ease'
            }}>
              <div className="rounded-lg bg-gray-900 w-[1920px] h-[1080px] max-w-full max-h-[calc(100vh-180px)] flex items-center justify-center">
                <div className="text-center text-white/60">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">视频流预览区域</p>
                  <p className="text-xs mt-1 opacity-50">1920 × 1080</p>
                </div>
              </div>
            </div>
            
            {showOverlay && (
              <>
                <div className="absolute top-4 left-4 flex gap-2">
                  <StatPill label="分辨率" value="1920×1080" icon={<HardDrive className="w-3 h-3" />} />
                  <StatPill label="帧率" value={`${stats.fps} FPS`} icon={<Gauge className="w-3 h-3" />} 
                           color={stats.fps >= 24 ? 'text-green-500' : stats.fps >= 15 ? 'text-yellow-500' : 'text-red-500'} />
                  <StatPill label="编码" value="H.264" icon={<Cpu className="w-3 h-3" />} />
                  <StatPill label="帧" value={stats.frameId.toLocaleString()} icon={<Activity className="w-3 h-3" />} />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-dark rounded-full px-4 py-2 flex items-center gap-2">
                  <ControlButton 
                    onClick={() => setIsPaused(!isPaused)} 
                    title={isPaused ? '播放' : '暂停'}
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={toggleFullscreen} 
                    title="视频流全屏"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </ControlButton>

                  <ControlButton 
                    onClick={toggleSystemFullscreen}
                    title="系统全屏"
                  >
                    <Monitor className="w-4 h-4" />
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={() => setShowOverlay(false)} 
                    title="隐藏控件"
                  >
                    <EyeOff className="w-4 h-4" />
                  </ControlButton>

                  <div className="w-px h-5 bg-white/20 mx-1" />

                  <button
                    onClick={() => rotation && setShowOverlay(false)}
                    className="glass-btn rounded-lg p-2 flex items-center justify-center"
                    title="逆时针旋转"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl glass flex items-center justify-center">
              <Monitor className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-heading mb-2">等待连接...</h2>
            <p className="text-sm text-body">请点击左侧设置面板中的连接按钮</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
              <Cpu className="w-4 h-4" />
              <span>服务端: <code className="px-2 py-1 bg-white/50 rounded">localhost:8765</code></span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted">
              <Zap className="w-4 h-4" />
              <span>状态: 等待初始化</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}