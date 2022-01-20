export const CONTAINER_SIZES = {
  DRAWER_EXPANDED_WIDTH: 320,
};

export const ERROR_MESSAGES = {
  required: 'The filed is required.',
  number: 'The filed must be a number.',
  positive: 'The filed must be positive.',
  email: 'The field is not a valid email.',
  integer: 'The filed must be an integer.',
  phone: 'The field is not a valid phone number.',
  password: 'All validation levels must be passed.',
  repeatPassword: 'Passwords doesn\'t match.',
  maxNumberField: (max) => `The value must be at most ${max}.`,
  maxTextField: (max) => `The filed must be at most ${max} characters.`,
  rightFormat: (example) => `Please, enter the right format ${example}.`,  
  maxWithSpaces: (max) => `Please, enter up to ${max} characters with spaces.`,
  lettersAndNumbers: (max) =>
    `Please, enter only letters and numbers with spaces up to ${max} characters.`,
  letters: (max) => `Please, enter only letters with spaces up to ${max} characters.`,
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

// Armenian Phone regexp
export const PhoneRegex =
  /^([+374]{4}|[0]{1})?([1-9]{2})(((-\d{3}-\d{3})|(-\d{2}-\d{2}-\d{2})|( \d{3} \d{3})|( \d{2} \d{2} \d{2}))|(\d{6}))$/;
