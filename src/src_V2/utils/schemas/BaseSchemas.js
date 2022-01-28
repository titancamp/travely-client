import { array, number, object, string } from 'yup';

import { ERROR_MESSAGES, PasswordStrengthRegexes, PhoneRegex } from '../constants';

export const BaseSchemas = {
  email: string().email(ERROR_MESSAGES.email),

  requiredEmail: string().email(ERROR_MESSAGES.email).required(ERROR_MESSAGES.required),

  password: string()
    .required(ERROR_MESSAGES.required)
    .test('password-strength', ERROR_MESSAGES.password, function (password) {
      const strengthRegexes = Object.values(PasswordStrengthRegexes);
      for (let i = 0; i < strengthRegexes.length; ++i) {
        if (!strengthRegexes[i].test(password)) {
          return false;
        }
      }
      return true;
    }),

  repeatPassword: (passwordKey) =>
    string()
      .required(ERROR_MESSAGES.required)
      .test('password-match', ERROR_MESSAGES.repeatPassword, function (repeatPassword) {
        return repeatPassword === this.parent[passwordKey];
      }),

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

  floatingNumber: (max = 999999.99, typeMsg = ERROR_MESSAGES.number) =>
    number()
      .typeError(typeMsg)
      .positive(ERROR_MESSAGES.positive)
      .max(max, ERROR_MESSAGES.maxNumberField(max)),

  floatingRequiredNumber: (max) =>
    BaseSchemas.floatingNumber(max).required(ERROR_MESSAGES.required),

  requiredText: (max = 150, msg = ERROR_MESSAGES.maxTextField(max)) =>
    string().max(max, msg).required(ERROR_MESSAGES.required),

  textField: (max = 150, msg = ERROR_MESSAGES.maxTextField(max)) =>
    string().max(max, msg),
};
