import { object } from 'yup';
import { BaseSchemas } from './BaseSchemas';

/**
 * Initial values for transportation.
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

export function AddDriverInitialValues(initialValues) {
  return {
    name: '',
    phone: '',
    license: null,
    languages: null,
    ...initialValues,
  };
}

export function AddCarInitialValues(initialValues) {
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

export function addDriverSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    name: BaseSchemas.textField(),
    license: BaseSchemas.autocompleteField,
    languages: BaseSchemas.autocompleteField,
  });
}

export function partnershipSchema() {
  return object().shape({
    attachments: object().shape([]).nullable(),
    price: BaseSchemas.floatingNumber(999999.99),
    percentage: BaseSchemas.floatingNumber(999.99),
  });
}
