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
    setTimeout(() => {
      if (isExpanded && ref && ref.current) {
        const element = ref.current;
        element.style.scrollMarginTop = scrollMarginTop;
        element.scrollIntoView({ behavior, block, inline });
      }
    }, 200);
  }, [isExpanded]);

  return ref;
}
