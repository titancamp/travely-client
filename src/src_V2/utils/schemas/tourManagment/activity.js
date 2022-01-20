import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';
// import { ERROR_MESSAGES } from '../../constants';

/**
 * Initial values for activity.
 */
export function mainInfoInitialValues(initialValues) {
  return {
    name: '',
    notes: '',
    duration: '',
    attributes: [],
    description: '',
    ...initialValues,
  };
}

/**
 * Yup schemas for activity.
 */
export function mainInfoSchema() {
  return object().shape({
    duration: BaseSchemas.integer(),
    notes: BaseSchemas.textField(500),
    name: BaseSchemas.requiredText(50),
    description: BaseSchemas.textField(500),
  });
}
