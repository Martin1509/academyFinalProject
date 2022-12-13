import {Dispatch} from 'redux';

import {SHOW_ERROR_DETAILS} from 'config';
import * as types from 'app/actionTypes';
import {toErrorMessages} from 'common/utils';

export const handleError = (error: any) => {
  return setErrors(toErrorMessages(error));
};

export const setErrors = (...errors: string[]) => {
  if (SHOW_ERROR_DETAILS) {
    errors
      .filter(error => !!error)
    // eslint-disable-next-line no-console
      .forEach(console.error);
  }

  return ({
    type: types.SET_ERRORS,
    errors
  });
};

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS
});

export const clearPaths = () => ({
  type: types.CLEAR_PATHS
});

export const run = (action: Function) => async (dispatch: Dispatch) => {
  try {
    await action();
  } catch (e) {
    dispatch(handleError(e));
  }
};
