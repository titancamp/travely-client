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

export function FilterInitialValues() {
  return {
    type: null,
    destination: null,
    duration: '',
    priceFrom: '',
    priceTo: '',
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

export function FilterActivitySchema() {
  return object().shape({
    type: BaseSchemas.requiredAutocompleteField,
    destination: BaseSchemas.autocompleteField,
    duration: BaseSchemas.floatingNumber(999),
    priceFrom: BaseSchemas.floatingNumber(99999999.99),
    priceTo: BaseSchemas.floatingNumber(99999999.99),
  });
}
