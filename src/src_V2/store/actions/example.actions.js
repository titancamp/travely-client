import EXAMPLE_TYPES from '../types/example.types';

export const example = (payload) => (dispatch) => {
  dispatch({ type: EXAMPLE_TYPES.INIT_APPLICATION_EXAMPLE, payload });
};
