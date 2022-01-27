import { useCallback, useState } from 'react';

export default function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((forcedValue) => {
    setState((state) => (typeof forcedValue === 'boolean' ? forcedValue : !state));
  }, []);

  return [state, toggle];
}
