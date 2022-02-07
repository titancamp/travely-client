import { object } from 'yup';

import { ERROR_MESSAGES } from '../../constants';
import { BaseSchemas } from '../BaseSchemas';

// TODO: Possible to separate account/company forms after API is ready

export const accountIntialValues = (initialValues) => ({
  name: '',
  position: '',
  email: '',
  phone: '',
  companyName: '',
  companyAddress: '',
  companyEmail: '',
  companyPhone: '',
  companyLogo: '',
  ...initialValues,
});

export const accountValidationSchema = () =>
  object().shape({
    name: BaseSchemas.requiredText(),
    email: BaseSchemas.email,
    position: BaseSchemas.requiredText(),
    phone: BaseSchemas.phone.required(ERROR_MESSAGES.required),
    companyName: BaseSchemas.textField(),
    companyAddress: BaseSchemas.textField(),
    companyEmail: BaseSchemas.email,
    companyPhone: BaseSchemas.phone.required(ERROR_MESSAGES.required),
  });

export const changePasswordInitialValues = (initialValues) => ({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  ...initialValues,
});

export const changePasswordValidationSchema = () =>
  object().shape({
    oldPassword: BaseSchemas.requiredText(),
    newPassword: BaseSchemas.password,
    confirmNewPassword: BaseSchemas.repeatPassword('newPassword'),
  });
