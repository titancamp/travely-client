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
  email: string().email(ERROR_MESSAGES.email),
  requiredNumber: number()
    .typeError(ERROR_MESSAGES.number)
    .required(ERROR_MESSAGES.required)
    .nullable(),
  phone: string()
    .typeError(ERROR_MESSAGES.phone)
    .matches(PhoneRegex, ERROR_MESSAGES.phone),
  autocompleteField: object()
    .shape({ id: number(), label: string() })
    .required(ERROR_MESSAGES.required)
    .nullable(),
  integer: (max = 99) =>
    number()
      .typeError(ERROR_MESSAGES.integer)
      .integer(ERROR_MESSAGES.integer)
      .positive(ERROR_MESSAGES.positive)
      .max(max, ERROR_MESSAGES.maxNumberField(max)),
  floatingNumber: (max = 99999.99) =>
    number()
      .typeError(ERROR_MESSAGES.number)
      .positive(ERROR_MESSAGES.positive)
      .max(max, ERROR_MESSAGES.maxNumberField(max)),
  requiredText: (max = 150) =>
    string().max(max, ERROR_MESSAGES.maxTextField(max)).required(ERROR_MESSAGES.required),
  textField: (max = 150) => string().max(max, ERROR_MESSAGES.maxTextField(max)),
};

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
    type: BaseSchemas.autocompleteField,
    price: BaseSchemas.floatingNumber(),
    additionalBeds: BaseSchemas.integer(),
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
