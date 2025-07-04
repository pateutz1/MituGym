import React, { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/libs/utils';

interface TypingTextProps {
  /** Array of text strings to cycle through */
  texts: string[];
  /** Speed of typing in milliseconds per character */
  typingSpeed?: number;
  /** Speed of deleting in milliseconds per character */
  deletingSpeed?: number;
  /** Pause duration after completing a text in milliseconds */
  pauseDuration?: number;
  /** Pause duration after deleting a text in milliseconds */
  deletePauseDuration?: number;
  /** Whether to loop through texts infinitely */
  loop?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Cursor character */
  cursor?: string;
  /** Whether to show cursor */
  showCursor?: boolean;
  /** Cursor blink speed in milliseconds */
  cursorBlinkSpeed?: number;
  /** Starting text that doesn't get typed/deleted */
  prefix?: string;
  /** Text that appears after the typing text */
  suffix?: string;
  /** Callback when typing animation completes */
  onComplete?: () => void;
  /** Whether to start typing immediately */
  autoStart?: boolean;
  /** Delay before starting the animation */
  startDelay?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  deletePauseDuration = 500,
  loop = true,
  className,
  cursor = '|',
  showCursor = true,
  cursorBlinkSpeed = 530,
  prefix = '',
  suffix = '',
  onComplete,
  autoStart = true,
  startDelay = 0,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorChar, setShowCursorChar] = useState(true);
  const [hasStarted, setHasStarted] = useState(!autoStart);
  const [isClient, setIsClient] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorIntervalRef = useRef<NodeJS.Timeout>();
  
  // Create stable reference for texts array
  const stableTexts = useMemo(() => texts, [texts]);
  const stableOnComplete = useRef(onComplete);
  
  // Update ref when callback changes
  useEffect(() => {
    stableOnComplete.current = onComplete;
  }, [onComplete]);

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;

    cursorIntervalRef.current = setInterval(() => {
      setShowCursorChar(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [showCursor, cursorBlinkSpeed]);

  // Start delay effect
  useEffect(() => {
    if (autoStart && startDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);

      return () => clearTimeout(delayTimeout);
    }
  }, [autoStart, startDelay]);

  // Main typing effect
  useEffect(() => {
    if (!isClient || !hasStarted || stableTexts.length === 0) return;

    const currentFullText = stableTexts[currentTextIndex];

    if (isTyping) {
      // Typing phase
      if (currentText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing current text
        timeoutRef.current = setTimeout(() => {
          if (loop || currentTextIndex < stableTexts.length - 1) {
            setIsTyping(false);
          } else {
            setIsComplete(true);
            stableOnComplete.current?.();
          }
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next text
        timeoutRef.current = setTimeout(() => {
          setCurrentTextIndex((prev) => {
            if (loop) {
              return (prev + 1) % stableTexts.length;
            }
            return Math.min(prev + 1, stableTexts.length - 1);
          });
          setIsTyping(true);
        }, deletePauseDuration);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentText, 
    currentTextIndex, 
    isTyping, 
    stableTexts, 
    typingSpeed, 
    deletingSpeed, 
    pauseDuration, 
    deletePauseDuration, 
    loop, 
    hasStarted,
    isClient
  ]);

  // Manual start function
  const startTyping = () => {
    setHasStarted(true);
  };

  // Reset function
  const reset = () => {
    setCurrentTextIndex(0);
    setCurrentText('');
    setIsTyping(true);
    setIsComplete(false);
    setHasStarted(autoStart);
  };

  return (
    <span className={cn("inline-block", className)}>
      {prefix}
      <span className="relative">
        {currentText}
        {showCursor && (
          <span
            className={cn(
              "inline-block ml-1 transition-opacity duration-100",
              showCursorChar ? "opacity-100" : "opacity-0"
            )}
          >
            {cursor}
          </span>
        )}
      </span>
      {suffix}
    </span>
  );
};

// Preset configurations for common use cases
export const TypingTextPresets = {
  // Fitness goals
  fitnessGoals: (texts: string[]) => (
    <TypingText
      texts={texts}
      typingSpeed={80}
      deletingSpeed={40}
      pauseDuration={2500}
      className="text-primary font-bold"
      cursor="█"
      cursorBlinkSpeed={600}
    />
  ),

  // Hero headlines
  heroHeadline: (texts: string[]) => (
    <TypingText
      texts={texts}
      typingSpeed={120}
      deletingSpeed={60}
      pauseDuration={3000}
      className="bg-gradient-to-r from-primary via-emerald-500 to-green-600 bg-clip-text text-transparent font-bold"
      cursor="|"
      cursorBlinkSpeed={500}
    />
  ),

  // Service descriptions
  services: (texts: string[]) => (
    <TypingText
      texts={texts}
      typingSpeed={60}
      deletingSpeed={30}
      pauseDuration={2000}
      className="text-white/90"
      cursor="_"
      cursorBlinkSpeed={400}
    />
  ),

  // Quick highlights
  highlights: (texts: string[]) => (
    <TypingText
      texts={texts}
      typingSpeed={50}
      deletingSpeed={25}
      pauseDuration={1500}
      className="text-emerald-400 font-semibold"
      cursor="▌"
      cursorBlinkSpeed={350}
    />
  ),

  // Motivational quotes
  quotes: (texts: string[]) => (
    <TypingText
      texts={texts}
      typingSpeed={70}
      deletingSpeed={35}
      pauseDuration={4000}
      className="text-white/80 italic"
      cursor="|"
      cursorBlinkSpeed={700}
    />
  ),
};

export default TypingText; 