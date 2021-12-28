import EXAMPLE_TYPES from '../types/example.types';

const INITIAL_EXAMPLE = {
  setup: false,
};

/**
 * @description - Only for setup purposes, removable on the next commits.
 */
const exampleReducer = (state = INITIAL_EXAMPLE, { type, payload }) => {
  switch (type) {
    case EXAMPLE_TYPES.INIT_APPLICATION_EXAMPLE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default exampleReducer;
