import { object } from 'yup';

import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for activity page.
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
 * Yup schemas for activity page.
 */
export function mainInfoSchema() {
  return object().shape({
    duration: BaseSchemas.floatingNumber(999),
    notes: BaseSchemas.textField(500),
    name: BaseSchemas.requiredText(50),
    description: BaseSchemas.textField(500),
    price: BaseSchemas.floatingNumber(99999999.99),
  });
}
