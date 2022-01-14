import { useEffect, useState } from 'react';

export function useTimer(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  function resetTimer() {
    setSeconds(initialSeconds);
    setIsActive(true);
  }

  useEffect(() => setIsActive(true), []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (seconds <= 0) {
      setIsActive(false);
    }
  }, [setIsActive]);

  return [seconds, resetTimer];
}
