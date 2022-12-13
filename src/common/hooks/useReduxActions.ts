import {useDispatch} from 'react-redux';
import {useCallback} from 'react';

export default (actions: Function[]) => {
  const dispatch = useDispatch();
  return actions.map(action =>
    useCallback((...args) => dispatch(action(...args)), [action])
  );
};
