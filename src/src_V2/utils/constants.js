export const CONTAINER_SIZES = {
  DRAWER_EXPANDED_WIDTH: 320,
  DRAWER_COLLAPSED_WIDTH: 33,
};

export const ERROR_MESSAGES = {
  required: 'The filed is required',
  integer: 'The filed must be integer',
  email: "The field isn't valid email",
  positive: 'The filed must be positive',
  phone: "The field isn't valid phone number",
  maxNumberField: 'The filed value must be lower than 99',
  maxTextField: 'The filed must be at most 150 characters',
  maxNoteField: 'The filed must be at most 1500 characters',
};

//Phone temporary regexp for the app
export const PhoneRegex =
  /^(([+374]{4}|[0]{1}))?(\s|-)?([1-9]{2})(\s|-)?(\d{2})(\s|-)?(\d{2})(\s|-)?(\d{2})$/;
