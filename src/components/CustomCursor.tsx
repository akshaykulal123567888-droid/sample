import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type CursorVariant = 'default' | 'hover' | 'button' | 'project' | 'text' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isClicking, setIsClicking] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring trailing effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices that have a mouse / fine pointer
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if inside input or textarea
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setVariant('text');
        setCursorText('');
        return;
      }

      // Check for custom cursor attributes or interactive elements
      const projectCard = target.closest('[data-cursor="project"]');
      const interactiveButton = target.closest('button, [role="button"], .group');
      const interactiveLink = target.closest('a');
      const isClickable = target.closest(
        'button, a, [role="button"], input, textarea, .cursor-pointer, [data-cursor]'
      );

      if (projectCard) {
        setVariant('project');
        setCursorText('VIEW');
      } else if (interactiveButton) {
        setVariant('button');
        setCursorText('');
      } else if (interactiveLink || isClickable) {
        setVariant('hover');
        setCursorText('');
      } else {
        setVariant('default');
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setVariant('hidden');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      setVariant('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  // Variants styling configuration
  const getOuterSize = () => {
    if (isClicking) return 24;
    switch (variant) {
      case 'project':
        return 74;
      case 'button':
        return 56;
      case 'hover':
        return 48;
      case 'text':
        return 12;
      case 'hidden':
        return 0;
      default:
        return 32;
    }
  };

  const outerSize = getOuterSize();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none select-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && variant !== 'hidden' ? 1 : 0,
        }}
        animate={{
          width: outerSize,
          height: outerSize,
          backgroundColor:
            variant === 'project'
              ? 'rgba(182, 0, 168, 0.85)'
              : variant === 'button'
              ? 'rgba(215, 226, 234, 0.15)'
              : variant === 'hover'
              ? 'rgba(215, 226, 234, 0.2)'
              : 'transparent',
          borderColor:
            variant === 'project'
              ? 'rgba(255, 255, 255, 0.9)'
              : variant === 'button'
              ? 'rgba(182, 0, 168, 0.8)'
              : variant === 'hover'
              ? '#D7E2EA'
              : 'rgba(215, 226, 234, 0.45)',
          borderWidth: variant === 'project' ? 1 : 1.5,
          backdropFilter: variant === 'project' || variant === 'button' ? 'blur(4px)' : 'none',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 320,
          mass: 0.4,
        }}
      >
        {variant === 'project' && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold uppercase tracking-widest text-white"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center Precise Dot (Locks with actual cursor) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none bg-[#D7E2EA]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && variant !== 'hidden' && variant !== 'project' ? 1 : 0,
        }}
        animate={{
          width: variant === 'button' ? 8 : variant === 'hover' ? 6 : variant === 'text' ? 3 : 5,
          height: variant === 'button' ? 8 : variant === 'hover' ? 6 : variant === 'text' ? 18 : 5,
          backgroundColor:
            variant === 'button'
              ? '#FFFFFF'
              : variant === 'hover'
              ? '#B600A8'
              : '#D7E2EA',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

export default CustomCursor;
