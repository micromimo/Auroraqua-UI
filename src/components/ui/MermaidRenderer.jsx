import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function MermaidRenderer({ code }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!code) return;

    const renderMermaid = async () => {
      try {
        await mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#fbcfe8',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#ec4899',
            lineColor: '#ec4899',
            secondaryColor: '#ddd6fe',
            tertiaryColor: '#cffafe',
            mainBkg: 'transparent',
            backgroundColor: 'transparent',
            nodeBorder: '#ec4899',
            nodeBg: 'rgba(255, 255, 255, 0.6)',
            nodeTextColor: '#1e293b',
            arrowColor: '#ec4899',
            edgeColor: '#ec4899',
            clusterBkg: 'rgba(255, 211, 219, 0.3)',
            clusterBorder: '#ec4899',
            fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
            fontSize: '14px',
          },
        });

        const result = await mermaid.render(`mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, code);
        
        if (result && (result.svg || result)) {
          const svgContent = typeof result === 'string' ? result : result.svg;
          if (svgContent && svgContent.trim()) {
            svgRef.current.innerHTML = svgContent;
          }
        }
      } catch (error) {
        console.error('Failed to render mermaid:', error);
        svgRef.current.innerHTML = `<div class="text-sm text-red-500 p-4">Mermaid 渲染失败: ${error.message}</div>`;
      }
    };

    const timer = setTimeout(renderMermaid, 50);
    return () => clearTimeout(timer);
  }, [code]);

  return <div ref={svgRef} className="flex justify-center items-center min-h-[100px]" />;
}