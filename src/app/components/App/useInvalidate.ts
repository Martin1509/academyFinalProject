import {useState, useCallback} from 'react';

export default () => {
  const [value, setValue] = useState<number>(0);

  const invalidate = useCallback(()=> {
    setValue((prev) => prev + 1);
  }, [setValue]);

  return [
    value,
    invalidate
  ] as const;
};
