export const CONTAINER_SIZES = {
  DRAWER_EXPANDED_WIDTH: 320,
};

export const ERROR_MESSAGES = {
  required: 'The filed is required',
  number: 'The filed must be a number',
  positive: 'The filed must be positive',
  email: 'The field is not a valid email',
  integer: 'The filed must be an integer',
  phone: 'The field is not a valid phone number',
  password: 'All validation levels must be passed',
  repeatPassword: "Passwords doesn't match",
  maxNumberField: (max) => `The value must be at most ${max}`,
  maxTextField: (max) => `The filed must be at most ${max} characters`,
};

export const PasswordStrengthNames = {
  1: 'One lowercase character',
  2: 'One uppercase character',
  4: 'One number',
  8: 'One special character',
  16: '8-20 characters',
};

export const PasswordStrengthRegexes = {
  1: /^.*[a-z]/,
  2: /^.*[A-Z]/,
  4: /^.*[0-9]/,
  8: /^.*[!@#$%^&*]/,
  16: /^.{8,20}$/,
};

//Armenian Phone regexp
export const PhoneRegex =
  /^(([+374]{4}|[0]{1}))?(\s|-)?([1-9]{2})(\s|-)?(\d{2})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;
