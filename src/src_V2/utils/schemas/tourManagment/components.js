import { object } from 'yup';

import { BaseSchemas } from '../BaseSchemas';

export function partnershipInitialValues(initialValues) {
  return {
    signInDate: '',
    attachments: [],
    expiryDate: '',
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

export function FilterInitialValues() {
  return {
    model: '',
    seats: '',
    carSeats: '',
    license: [],
    languages: [],
    region: null,
    city: null,
    type: null,
    car: null,
  };
}

export function partnershipSchema() {
  return object().shape({
    attachments: object().shape([]).nullable(),
  });
}

export function contactSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    person: BaseSchemas.textField(50),
  });
}

export function TransportationFiltersSchema() {
  return object().shape({
    seats: BaseSchemas.integer(),
    carSeats: BaseSchemas.integer(),
    model: BaseSchemas.requiredText(50),
    languages: BaseSchemas.autocompleteField,
    region: BaseSchemas.autocompleteField,
    city: BaseSchemas.autocompleteField,
    type: BaseSchemas.autocompleteField,
    car: BaseSchemas.autocompleteField,
    license: BaseSchemas.multiAutocompleteField,
  });
}
