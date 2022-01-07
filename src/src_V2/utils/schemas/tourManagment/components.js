import { object } from 'yup';
import { BaseSchemas } from './BaseSchemas';

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
    price: BaseSchemas.floatingNumber(999999.99),
    percentage: BaseSchemas.floatingNumber(999.99),
  });
}

export function contactSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    person: BaseSchemas.textField(),
  });
}
