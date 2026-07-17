import { useState, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';
import MacOSAppIcon from './MacOSAppIcon';

const MAX_SCALE = 1.6;
const BASE_SCALE = 1;

export default function MacOSDock({ apps, onLaunch, runningApps = [] }) {
  const [order, setOrder] = useState(apps);
  const [hoveredId, setHoveredId] = useState(null);

  const handleReorder = useCallback((newOrder) => {
    setOrder(newOrder);
  }, []);

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
      <motion.div
        className="flex items-center justify-end gap-2 px-4 rounded-3xl border border-white/30"
        style={{
          height: 72,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        }}
      >
        <Reorder.Group
          axis="x"
          values={order}
          onReorder={handleReorder}
          className="flex items-center gap-2"
        >
          {order.map((app) => {
            const isHovered = hoveredId === app.id;
            const scale = isHovered ? MAX_SCALE : BASE_SCALE;

            return (
              <Reorder.Item
                key={app.id}
                value={app}
                className="cursor-grab active:cursor-grabbing"
                whileDrag={{ scale: 1.2 }}
                onMouseEnter={() => setHoveredId(app.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <MacOSAppIcon
                  app={app}
                  onClick={onLaunch}
                  scale={scale}
                  running={runningApps.includes(app.id)}
                  isActive={false}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </motion.div>
    </div>
  );
}
