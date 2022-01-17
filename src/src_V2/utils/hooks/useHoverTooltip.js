import { useEffect, useState } from 'react';

export function useHoverTooltip(text, textElementRef) {
  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);

    return () => {
      window.removeEventListener('resize', compareSize);
    };
  }, []);

  return hoverStatus;
}
