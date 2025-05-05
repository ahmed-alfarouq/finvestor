"use client";
import React, { useEffect, useState } from "react";

interface TimerProps {
  duration?: number;
  onComplete?: () => void;
}

const Timer = ({ duration, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return <strong>{timeLeft}s</strong>;
};

export default Timer;
