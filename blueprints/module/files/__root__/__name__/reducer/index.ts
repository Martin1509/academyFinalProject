import reduceReducers from 'reduce-reducers';

import {State} from '<%= camelEntityName %>/types';

export const initialState: State = {
};

export default reduceReducers(
    initialState
);
