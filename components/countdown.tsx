import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipCardProps {
  value: number;
  label: string;
  shouldFlip: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ value, label, shouldFlip }) => {
  // Separate state for the static top and bottom so we can update them at different times
  const [topDisplay, setTopDisplay] = useState(value);
  const [bottomDisplay, setBottomDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [bottomOverlayValue, setBottomOverlayValue] = useState(value);
  const prev = useRef(value);

  // Trigger the flip
  useEffect(() => {
    if (shouldFlip && value !== prev.current) {
      setFlipping(true);

      // Bottom overlay initially shows OLD value (not visible while at 90°)
      setBottomOverlayValue(bottomDisplay);

      // Mid-animation (0.3 s): update TOP static half + switch overlay to NEW value so it reveals while rotating
      setTimeout(() => {
        setTopDisplay(value);
        setBottomOverlayValue(value);
      }, 300);

      // End of animation (0.6 s): update BOTTOM static half and finish
      setTimeout(() => {
        setBottomDisplay(value);
        setFlipping(false);
        prev.current = value;
      }, 600);
    } else if (!shouldFlip && value !== prev.current) {
      // No animation → update both halves immediately
      setTopDisplay(value);
      setBottomDisplay(value);
      setBottomOverlayValue(value);
      prev.current = value;
    }
  }, [value, shouldFlip, bottomDisplay]);

  const curTop = topDisplay.toString().padStart(2, '0');
  const curBottom = bottomDisplay.toString().padStart(2, '0');
  const nxt = bottomOverlayValue.toString().padStart(2, '0');

  return (
    <div className="flip-container">
      <div className="flip-clock">
        {/* Static top half showing current (top) value */}
        <div className="static-top">
          <span>{curTop}</span>
        </div>
        {/* Static bottom half showing current (bottom) value */}
        <div className="static-bottom">
          <span>{curBottom}</span>
        </div>

        {flipping && (
          <>
            {/* Animated top flipping away */}
            <div className="flip-top">
              <span>{curTop}</span>
            </div>
            {/* Animated bottom flipping in */}
            <div className="flip-bottom">
              <span>{nxt}</span>
            </div>
          </>
        )}
      </div>
      <div className="flip-label">{label}</div>

      <style jsx>{`
        .flip-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .flip-clock {
          position: relative;
          width: 80px;
          height: 100px;
          perspective: 400px;
        }

        /* Top & bottom static halves */
        .static-top,
        .flip-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          overflow: hidden;
          background: linear-gradient(to bottom, #1f1f1f, #121212);
          border: 2px solid #2a2a2a;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1;
          box-shadow: inset 0 1px 0 rgba(30, 155, 113, 0.1);
        }

        .static-bottom,
        .flip-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          overflow: hidden;
          background: linear-gradient(to top, #1f1f1f, #121212);
          border: 2px solid #2a2a2a;
          border-radius: 0 0 8px 8px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 1;
          box-shadow: inset 0 1px 0 rgba(30, 155, 113, 0.1);
        }

        .static-top span,
        .static-bottom span,
        .flip-top span,
        .flip-bottom span {
          color: #1e9b71;
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          transform: translateY(50%);
        }

        .static-bottom span,
        .flip-bottom span {
          transform: translateY(-50%);
        }

        /* Top half flips up over 0.3s */
        .flip-top {
          z-index: 2;
          animation: flipTopAnim 0.3s ease-in forwards;
          transform-origin: bottom center;
        }

        /* Bottom half flips down, delayed 0.3s for total 0.6s */
        .flip-bottom {
          z-index: 1;
          animation: flipBottomAnim 0.3s ease-out 0.3s forwards;
          transform-origin: top center;
        }

        @keyframes flipTopAnim {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(-90deg); }
        }

        @keyframes flipBottomAnim {
          from { transform: rotateX(90deg); }
          to   { transform: rotateX(0deg); }
        }

        /* Label under each card */
        .flip-label {
          color: #1e9b71;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .flip-clock {
            width: 100px;
            height: 120px;
          }
          
          .static-top span,
          .static-bottom span,
          .flip-top span,
          .flip-bottom span {
            font-size: 3rem;
          }
          
          .flip-label {
            font-size: 1rem;
          }
        }

        @media (min-width: 1024px) and (max-width: 1279px) {
          .flip-clock {
            width: 110px;
            height: 130px;
          }
          
          .static-top span,
          .static-bottom span,
          .flip-top span,
          .flip-bottom span {
            font-size: 3.25rem;
          }
        }

        @media (min-width: 1280px) {
          .flip-clock {
            width: 120px;
            height: 140px;
          }
          
          .static-top span,
          .static-bottom span,
          .flip-top span,
          .flip-bottom span {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [shouldFlip, setShouldFlip] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = targetDate.getTime() - Date.now();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      // Get previous time left using functional state update
      setTimeLeft((prevTimeLeft) => {
        // Determine which cards should flip
        setShouldFlip({
          seconds: newTimeLeft.seconds !== prevTimeLeft.seconds,
          minutes: newTimeLeft.minutes !== prevTimeLeft.minutes,
          hours: newTimeLeft.hours !== prevTimeLeft.hours,
          days: newTimeLeft.days !== prevTimeLeft.days,
        });

        return newTimeLeft;
      });
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="countdown-container">
      <div className="countdown-grid">
        <FlipCard
          label="Days"
          shouldFlip={shouldFlip.days}
          value={timeLeft.days}
        />
        <FlipCard
          label="Hours"
          shouldFlip={shouldFlip.hours}
          value={timeLeft.hours}
        />
        <FlipCard
          label="Minutes"
          shouldFlip={shouldFlip.minutes}
          value={timeLeft.minutes}
        />
        <FlipCard
          label="Seconds"
          shouldFlip={shouldFlip.seconds}
          value={timeLeft.seconds}
        />
      </div>

      <style jsx>{`
        .countdown-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }

        .countdown-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 400px;
        }

        @media (min-width: 640px) {
          .countdown-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            max-width: 600px;
          }
        }

        @media (min-width: 1024px) {
          .countdown-grid {
            gap: 3rem;
            max-width: 800px;
          }
        }
      `}</style>
    </div>
  );
};

export default Countdown;
