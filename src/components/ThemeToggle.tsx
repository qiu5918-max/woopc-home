import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full transition-all duration-500 ease-out"
      style={{
        background: theme === 'night' 
          ? 'linear-gradient(135deg, #1e3a5f, #0a0a0f)' 
          : 'linear-gradient(135deg, #60a5fa, #fbbf24)',
        boxShadow: theme === 'night'
          ? 'inset 0 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(23, 112, 247, 0.3)'
          : 'inset 0 2px 4px rgba(0,0,0,0.1), 0 0 10px rgba(251, 191, 36, 0.3)'
      }}
      aria-label={theme === 'day' ? '切换到深夜模式' : '切换到白天模式'}
    >
      {/* Stars for night mode */}
      {theme === 'night' && (
        <>
          <span className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
          <span className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <span className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </>
      )}
      
      {/* Clouds for day mode */}
      {theme === 'day' && (
        <>
          <span className="absolute top-1 right-3 w-3 h-1.5 bg-white/40 rounded-full" />
          <span className="absolute top-3 right-5 w-2 h-1 bg-white/30 rounded-full" />
        </>
      )}
      
      {/* Toggle Circle */}
      <span
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
        style={{
          left: theme === 'night' ? '4px' : 'calc(100% - 28px)',
          background: theme === 'night' 
            ? 'linear-gradient(135deg, #3b82f6, #1e40af)' 
            : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {theme === 'night' ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" />
        )}
      </span>
    </button>
  );
}
