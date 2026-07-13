export function createSmoothPath(data, key, maxValue) {
  const points = data.map((d, i) => ({
    x: 40 + (i / (data.length - 1)) * 340,
    y: 200 - (d[key] / maxValue) * 160
  }));

  if (points.length < 2) return '';

  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    path += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
  }
  
  path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return path;
}

export function createAreaPath(data, key, maxValue) {
  const linePath = createSmoothPath(data, key, maxValue);
  if (!linePath) return '';
  
  const lastX = 40 + ((data.length - 1) / (data.length - 1)) * 340;
  return `${linePath} L ${lastX} 200 L 40 200 Z`;
}

export default function ChartLine({ data, keyName, color, gradientId, onMouseEnter, onMouseLeave }) {
  const points = data.map((d, i) => ({
    x: 40 + (i / (data.length - 1)) * 340,
    y: 200 - (d[keyName] / 100) * 160
  }));

  return (
    <>
      <path
        d={createAreaPath(data, keyName, 100)}
        fill={`url(#${gradientId})`}
        opacity="0.3"
      />
      <path
        d={createSmoothPath(data, keyName, 100)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => (
        <g key={i}>
          <circle
            cx={points[i].x}
            cy={points[i].y}
            r="4"
            fill="white"
            stroke={color}
            strokeWidth="2"
            className="opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
            onMouseEnter={(e) => onMouseEnter?.(d, i, e)}
            onMouseLeave={onMouseLeave}
          />
          <circle
            cx={points[i].x}
            cy={points[i].y}
            r="2"
            fill={color}
            className="opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
            onMouseEnter={(e) => onMouseEnter?.(d, i, e)}
            onMouseLeave={onMouseLeave}
          />
        </g>
      ))}
    </>
  );
}