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
    type: null,
    address: '',
    checkIn: '',
    checkOut: '',
    region: null,
    services: [],
    ...initialValues,
  };
}

export function AddDriverInitialValues(initialValues) {
  return {
    name: '',
    phone: '',
    license: [],
    languages: [],
    ...initialValues,
  };
}

export function AddCarInitialValues(initialValues) {
  return {
    model: '',
    plate: '',
    color: '',
    seats: '',
    carSeats: '',
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
    region: BaseSchemas.textField(),
    address: BaseSchemas.textField(),
    notes: BaseSchemas.textField(500),
    person: BaseSchemas.textField(50),
    name: BaseSchemas.requiredText(50),
    type: BaseSchemas.requiredAutocompleteField,
  });
}

export function addDriverSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    name: BaseSchemas.requiredText(50),
    languages: BaseSchemas.autocompleteField,
    license: BaseSchemas.multiAutocompleteField,
  });
}

export function addCarSchema() {
  return object().shape({
    seats: BaseSchemas.integer(),
    carSeats: BaseSchemas.integer(),
    color: BaseSchemas.textField(50),
    plate: BaseSchemas.textField(10),
    model: BaseSchemas.requiredText(50),
  });
}

export function partnershipSchema() {
  return object().shape({
    attachments: object().shape([]).nullable(),
    price: BaseSchemas.floatingNumber(999999.99),
    percentage: BaseSchemas.floatingNumber(999.99),
  });
}
