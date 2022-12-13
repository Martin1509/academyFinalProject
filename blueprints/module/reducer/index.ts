import reduceReducers from 'reduce-reducers';

import type {State} from '<%= camelEntityName %>/types';

export const initialState: State = {
};

export default reduceReducers(
    (state: State = initialState, action: Object) => {

    }
);
