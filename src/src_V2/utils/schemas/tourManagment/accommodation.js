import { object, string, number } from 'yup';
import { ERROR_MESSAGES, PhoneRegex } from '../../constants';

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

const BaseSchemas = {
  integer: number()
    .typeError(ERROR_MESSAGES.integer)
    .integer(ERROR_MESSAGES.integer)
    .positive(ERROR_MESSAGES.positive)
    .max(99, ERROR_MESSAGES.maxNumberField),
  requiredText: string()
    .max(150, ERROR_MESSAGES.maxTextField)
    .required(ERROR_MESSAGES.required),
  textField: string().max(150, ERROR_MESSAGES.maxTextField),
  autocompleteField: object()
    .shape({ id: number(), label: string() })
    .required(ERROR_MESSAGES.required)
    .nullable(),
  requiredNumber: number().required(ERROR_MESSAGES.required).nullable(),
};

export function mainInfoSchema() {
  return object().shape({
    city: BaseSchemas.textField,
    region: BaseSchemas.textField,
    address: BaseSchemas.textField,
    name: BaseSchemas.requiredText,
    type: BaseSchemas.autocompleteField,
    notes: string().max(1500, ERROR_MESSAGES.maxNoteField),
  });
}

export function addRoomSchema() {
  return object().shape({
    beds: BaseSchemas.integer,
    type: BaseSchemas.autocompleteField,
    quantity: BaseSchemas.integer,
    additionalBeds: BaseSchemas.integer,
    price: number().positive().max(),
  });
}

export function contactSchema() {
  return object().shape({
    email: string().email(ERROR_MESSAGES.email),
    phone: string()
      .typeError(ERROR_MESSAGES.phone)
      .matches(PhoneRegex, ERROR_MESSAGES.phone),
    person: BaseSchemas.textField,
  });
}

export function partnershipSchema() {
  return object().shape({
    signInDate: '',
    expiryDate: '',
    price: number()
      .typeError(ERROR_MESSAGES.integer)
      .integer(ERROR_MESSAGES.integer)
      .positive(ERROR_MESSAGES.positive)
      .max(99999.99, ERROR_MESSAGES.maxNumberField),
    percentage: BaseSchemas.integer,
    attachments: object().shape([]).nullable(),
  });
}
