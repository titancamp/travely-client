import { useEffect, useRef } from 'react';

export default function useScrollIntoView(
  isExpanded,
  scrollIntoViewOptions,
  scrollMarginTop = '10px'
) {
  const ref = useRef(null);

  const {
    behavior = 'auto',
    block = 'start',
    inline = 'nearest',
  } = scrollIntoViewOptions;

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.scrollMarginTop = scrollMarginTop;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isExpanded && ref && ref.current) {
        ref.current.scrollIntoView({ behavior, block, inline });
      }
    }, 200);
  }, [isExpanded]);

  return ref;
}
