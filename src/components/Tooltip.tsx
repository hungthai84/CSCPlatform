import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyles = () => {
    switch (position) {
      case 'top': return { bottom: '100%', left: '50%', x: '-50%', y: -8, originY: 1 };
      case 'bottom': return { top: '100%', left: '50%', x: '-50%', y: 8, originY: 0 };
      case 'left': return { right: '100%', top: '50%', y: '-50%', x: -8, originX: 1 };
      case 'right': return { left: '100%', top: '50%', y: '-50%', x: 8, originX: 0 };
      default: return { bottom: '100%', left: '50%', x: '-50%', y: -8, originY: 1 };
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center w-full h-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 px-2 py-1 text-xs font-semibold text-white bg-slate-800 rounded shadow-md whitespace-nowrap pointer-events-none"
            style={getPositionStyles()}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
