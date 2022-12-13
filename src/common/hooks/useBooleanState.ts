import {useState, useCallback} from 'react';

export default (initialState = false) => {
  const [value, setValue] = useState<boolean>(initialState);

  return [
    value,
    useCallback(() => setValue(true), []),
    useCallback(() => setValue(false), [])
  ] as const;
};
