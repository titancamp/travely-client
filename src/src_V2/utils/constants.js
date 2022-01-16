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
  maxNumberField: (max) => `The value must be at most ${max}`,
  maxTextField: (max) => `The filed must be at most ${max} characters`,
};

//Armenian Phone regexp
export const PhoneRegex =
  /^(([+374]{4}|[0]{1}))?(\s|-)?(\d{2})(\s|-)?(\d{2})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;
