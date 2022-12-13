import {DependencyList, useEffect, useRef} from 'react';

export default (fn: () => void, interval = 1000, deps: DependencyList = [], runOnInit = true) => {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const updaterID = setInterval(() => fnRef.current(), interval);

    if (runOnInit) {
      fnRef.current();
    }
    return () => clearInterval(updaterID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval].concat(deps));
};
