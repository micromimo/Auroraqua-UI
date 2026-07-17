import { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react';

export default function PillTabBar({ tabs = [], activeTab, onChange, className = '', orientation = 'horizontal' }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });
  const [canScroll, setCanScroll] = useState({ start: false, end: false });

  const isVertical = orientation === 'vertical';

  const updateIndicator = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeTabEl = tabRefs.current[activeTab];

    if (activeTabEl) {
      const tabRect = activeTabEl.getBoundingClientRect();
      if (isVertical) {
        setIndicator({
          top: tabRect.top - containerRect.top,
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
          height: tabRect.height,
          opacity: 1,
        });
      } else {
        setIndicator({
          top: tabRect.top - containerRect.top,
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
          height: tabRect.height,
          opacity: 1,
        });
      }
    }
  }, [activeTab, isVertical]);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScroll({
      start: el.scrollTop > 0,
      end: el.scrollTop < el.scrollHeight - el.clientHeight - 1,
    });
  }, []);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    if (isVertical && scrollRef.current) {
      checkScroll();
      scrollRef.current.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollRef.current?.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [isVertical, checkScroll, tabs, activeTab]);

  const containerClasses = isVertical
    ? 'flex-col w-12 h-full'
    : 'flex-row w-full';

  const tabClasses = isVertical
    ? 'flex-col items-center justify-center gap-1 py-2 px-1'
    : 'flex-row items-center justify-center gap-2 px-4 py-2';

  return (
    <div className={`flex rounded-full overflow-hidden border border-white/20 p-0.5 liquid-glass relative ${containerClasses} ${className}`}>
      {/* 滚动容器 */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto overflow-x-hidden ${isVertical ? 'w-full h-full' : 'w-full'} scrollbar-hide`}
      >
        <div ref={containerRef} className={`relative flex rounded-full ${isVertical ? 'flex-col' : 'flex-row'}`}>
          {/* 胶囊指示器 */}
          <div
            className={`absolute rounded-full bg-gradient-to-r from-pink-200/80 to-pink-200/40 border border-pink-300/50 shadow-[rgba(244,114,182,0.3)_0px_0px_20px,rgba(255,255,255,0.6)_0px_1px_0px_inset] transition-all duration-300 ease-out z-0 pointer-events-none`}
            style={
              isVertical
                ? {
                    top: indicator.top,
                    left: indicator.left,
                    width: indicator.width,
                    height: indicator.height,
                    opacity: indicator.opacity,
                  }
                : {
                    top: indicator.top,
                    left: indicator.left,
                    width: indicator.width,
                    height: indicator.height,
                    opacity: indicator.opacity,
                  }
            }
          />
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabRefs.current[tab.id] = el;
                }}
                onClick={() => onChange?.(tab.id)}
                className={`group flex-1 flex ${tabClasses} rounded-full text-sm font-medium transition-colors relative overflow-hidden z-10 ${
                  isActive ? 'text-[#be185d]' : 'text-muted hover:text-body'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                )}
                <span 
                  className="relative z-10 text-center whitespace-nowrap"
                  style={isVertical ? { writingMode: 'vertical-rl', textOrientation: 'upright' } : {}}
                >{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-pink-500/30 text-pink-700' : 'bg-white/30 text-muted'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
