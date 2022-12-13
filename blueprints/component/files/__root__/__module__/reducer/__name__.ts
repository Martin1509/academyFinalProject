import * as types from '<%= camelEntityName %>/actionTypes';
import type {State} from '<%= camelEntityName %>/types';

export const initialState = {

};

export default (state: State, action: Object) => {
    switch (action.type) {

        default: {
            return state;
        }
    }
};
