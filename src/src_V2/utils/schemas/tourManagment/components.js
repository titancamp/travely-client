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
