import { object, string, number, array } from 'yup';
import { ERROR_MESSAGES, PhoneRegex } from '../../constants';

export const BaseSchemas = {
  email: string().email(ERROR_MESSAGES.email),
  requiredEmail: string().email(ERROR_MESSAGES.email).required(ERROR_MESSAGES.required),
  requiredNumber: number()
    .typeError(ERROR_MESSAGES.number)
    .required(ERROR_MESSAGES.required)
    .nullable(),
  phone: string()
    .typeError(ERROR_MESSAGES.phone)
    .matches(PhoneRegex, ERROR_MESSAGES.phone),
  autocompleteField: object().shape({ id: number(), label: string() }).nullable(),
  requiredAutocompleteField: object()
    .shape({ id: number(), label: string() })
    .required(ERROR_MESSAGES.required)
    .nullable(),
  multiAutocompleteField: array().of(
    object().shape({
      value: string(),
      label: string(),
    })
  ),
  integer: (max = 99) =>
    number()
      .typeError(ERROR_MESSAGES.integer)
      .integer(ERROR_MESSAGES.integer)
      .positive(ERROR_MESSAGES.positive)
      .max(max, ERROR_MESSAGES.maxNumberField(max)),
  floatingNumber: (max = 999999.99) =>
    number()
      .typeError(ERROR_MESSAGES.number)
      .positive(ERROR_MESSAGES.positive)
      .max(max, ERROR_MESSAGES.maxNumberField(max)),
  requiredText: (max = 150) =>
    string().max(max, ERROR_MESSAGES.maxTextField(max)).required(ERROR_MESSAGES.required),
  textField: (max = 150) => string().max(max, ERROR_MESSAGES.maxTextField(max)),
};
