import { object } from 'yup';

import { ERROR_MESSAGES } from '../../constants';
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
 * Yup schemas for transportation.
 */
export function mainInfoSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    person: BaseSchemas.textField(50),
    name: BaseSchemas.requiredText(50),
    type: BaseSchemas.requiredAutocompleteField,
    city: BaseSchemas.textField(50, ERROR_MESSAGES.letters(50)),
    address: BaseSchemas.textField(150, ERROR_MESSAGES.maxWithSpaces(150)),
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
