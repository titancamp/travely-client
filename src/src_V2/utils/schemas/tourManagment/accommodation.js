import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for accommodation.
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
    services: [],
    ...initialValues,
  };
}

export function AddRoomInitialValues(initialValues) {
  return {
    beds: '',
    price: '',
    type: null,
    quantity: '',
    services: [],
    additionalBeds: '',
    ...initialValues,
  };
}

/**
 * Yup schemas for accommodation.
 */
export function mainInfoSchema() {
  return object().shape({
    city: BaseSchemas.textField(),
    address: BaseSchemas.textField(),
    name: BaseSchemas.requiredText(),
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    type: BaseSchemas.requiredAutocompleteField,
  });
}

export function addRoomSchema() {
  return object().shape({
    beds: BaseSchemas.integer(),
    quantity: BaseSchemas.integer(),
    price: BaseSchemas.floatingNumber(),
    additionalBeds: BaseSchemas.integer(),
    type: BaseSchemas.requiredAutocompleteField,
  });
}
