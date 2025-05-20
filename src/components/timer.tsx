"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  duration?: number;
  onComplete?: () => void;
}

const Timer = ({ duration = 0, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && onComplete) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  return <strong>{timeLeft}s</strong>;
};

export default Timer;
