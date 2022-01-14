import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for transportation.
 */
export function mainInfoInitialValues(initialValues) {
  return {
    city: '',
    name: '',
    notes: '',
    type: null,
    address: '',
    checkIn: '',
    checkOut: '',
    region: null,
    ...initialValues,
  };
}

export function menuInitialValues(initialValues) {
  return {
    menuTags: [],
    ...initialValues,
  };
}

/**
 * Yup schemas for accommodation.
 */
export function mainInfoSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    city: BaseSchemas.textField(),
    address: BaseSchemas.textField(),
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    person: BaseSchemas.textField(50),
    name: BaseSchemas.requiredText(50),
    type: BaseSchemas.requiredAutocompleteField,
  });
}
