import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

export function LoginInitialValues(initialValues) {
  return {
    email: '',
    password: '',
    ...initialValues,
  };
}

export function registerAgencyInitialValues(initialValues) {
  return {
    agencyName: '',
    email: '',
    ownerName: '',
    password: '',
    repeatPassword: '',
    ...initialValues,
  };
}

export function restorePasswordInitialValues(initialValues) {
  return {
    email: '',
    ...initialValues,
  };
}

export function setNewPasswordInitialValues(initialValues) {
  return {
    password: '',
    repeatPassword: '',
    ...initialValues,
  };
}

export function loginPasswordSchema() {
  return object().shape({
    email: BaseSchemas.requiredEmail,
    password: BaseSchemas.requiredText(),
  });
}

export function restorePasswordSchema() {
  return object().shape({
    email: BaseSchemas.requiredEmail,
  });
}

export function registerAgencySchema() {
  return object().shape({
    agencyName: BaseSchemas.requiredText(),
    email: BaseSchemas.requiredEmail,
    ownerName: BaseSchemas.requiredText(),
  });
}
