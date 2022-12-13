import {DependencyList, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Selector} from 'app/types';
import useReduxStore from 'common/hooks/useReduxStore';

export default (loadActions: Function[], selectors: Selector[], isAllowed?: () => boolean, deps: DependencyList = []) => {
  const dispatch = useDispatch();
  const values = useReduxStore(selectors);

  useEffect(() => {
    if (!isAllowed || isAllowed()) {
      loadActions.forEach(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return values.concat(loadActions.map(loadAction => () => dispatch(loadAction)));
};
