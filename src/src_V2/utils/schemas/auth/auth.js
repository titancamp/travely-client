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

export function loginValidationSchema() {
  return object({
    email: BaseSchemas.requiredEmail,
    password: BaseSchemas.requiredText(),
  });
}

export function registerAgencyValidationSchema() {
  return object({
    agencyName: BaseSchemas.requiredText(),
    email: BaseSchemas.requiredEmail,
    ownerName: BaseSchemas.requiredText(),
    password: BaseSchemas.password,
    repeatPassword: BaseSchemas.repeatPassword('password'),
  });
}

export function restorePasswordValidationSchema() {
  return object({
    email: BaseSchemas.requiredEmail,
  });
}

export function setNewPasswordValidationSchema() {
  return object({
    password: BaseSchemas.password,
    repeatPassword: BaseSchemas.repeatPassword('password'),
  });
}
