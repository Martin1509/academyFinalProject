import {useSelector} from 'react-redux';

import {Selector} from 'app/types';

export default (selectors: Selector[]) => selectors.map(selector => useSelector(selector));
