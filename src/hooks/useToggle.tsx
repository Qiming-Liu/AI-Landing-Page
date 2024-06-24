import { useCallback, useState } from 'react';

type ToggleTuple = [boolean, () => void];

const useToggle = (initialState = false): ToggleTuple => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};

export default useToggle;
