import { object } from 'yup';
import { BaseSchemas } from './BaseSchemas';

/**
 * Initial values for accommodation.
 */
export function mainInfoInitialValues(initialValues) {
  return {
    city: '',
    name: '',
    notes: '',
    region: '',
    type: null,
    address: '',
    checkIn: '',
    checkOut: '',
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

export function contactInitialValues(initialValues) {
  return {
    email: '',
    phone: '',
    person: '',
    ...initialValues,
  };
}

export function partnershipInitialValues(initialValues) {
  return {
    price: '',
    percentage: '',
    signInDate: '',
    attachments: [],
    expiryDate: '',
    ...initialValues,
  };
}

/**
 * Yup schemas for accommodation.
 */
export function mainInfoSchema() {
  return object().shape({
    city: BaseSchemas.textField(),
    region: BaseSchemas.textField(),
    address: BaseSchemas.textField(),
    name: BaseSchemas.requiredText(),
    type: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
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

export function contactSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    person: BaseSchemas.textField(),
  });
}

export function partnershipSchema() {
  return object().shape({
    attachments: object().shape([]).nullable(),
    price: BaseSchemas.floatingNumber(999999.99),
    percentage: BaseSchemas.floatingNumber(999.99),
  });
}
