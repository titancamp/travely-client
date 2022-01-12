import { object } from 'yup';
import { BaseSchemas } from '../tourManagment/BaseSchemas';

export function restorePasswordInitialValues(initialValues) {
  return {
    email: '',
    ...initialValues,
  };
}

export function LoginInitialValues(initialValues) {
  return {
    email: '',
    password: '',
    ...initialValues,
  };
}

export function restorePasswordSchema() {
  return object().shape({
    email: BaseSchemas.requiredEmail,
  });
}

export function loginPasswordSchema() {
  return object().shape({
    email: BaseSchemas.requiredEmail,
    password: BaseSchemas.requiredText(),
  });
}
