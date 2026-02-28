import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
  color: string;
}

export function FloatingElements() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const isNight = theme === 'night';
    const colors = isNight 
      ? ['#1770f7', '#3b82f6', '#8b5cf6', '#06b6d4']
      : ['#1770f7', '#60a5fa', '#f97316', '#10b981'];

    // Initialize floating elements
    elementsRef.current = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.1 + 0.05,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const animate = () => {
      elementsRef.current = elementsRef.current.map(el => {
        let newX = el.x + el.speedX;
        let newY = el.y + el.speedY;

        // Wrap around
        if (newX < -10) newX = 110;
        if (newX > 110) newX = -10;
        if (newY < -10) newY = 110;
        if (newY > 110) newY = -10;

        return { ...el, x: newX, y: newY };
      });

      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.floating-shape');
        elements.forEach((el, i) => {
          const element = elementsRef.current[i];
          if (element) {
            (el as HTMLElement).style.left = `${element.x}%`;
            (el as HTMLElement).style.top = `${element.y}%`;
            (el as HTMLElement).style.transform = `rotate(${element.x * 3}deg)`;
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  const renderShape = (shape: string, color: string, size: number) => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            className="rounded-full"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              filter: `blur(${size * 0.3}px)`
            }} 
          />
        );
      case 'square':
        return (
          <div 
            className="rounded-lg"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              filter: `blur(${size * 0.3}px)`,
              transform: 'rotate(45deg)'
            }} 
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              filter: `blur(${size * 0.2}px)`
            }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {elementsRef.current.map((el, i) => (
        <div
          key={i}
          className="floating-shape absolute transition-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            opacity: el.opacity,
            willChange: 'left, top, transform'
          }}
        >
          {renderShape(el.shape, el.color, el.size)}
        </div>
      ))}
    </div>
  );
}
