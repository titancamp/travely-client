import { object } from 'yup';

import { ERROR_MESSAGES } from '../../constants';
import { BaseSchemas } from '../BaseSchemas';

export const userConfigInitialValues = (initialValues) => ({
  name: '',
  email: '',
  position: '',
  phone: '',
  companyName: '',
  permissions: {
    templates: 3,
    packages: 3,
    receivable: 3,
    payable: 3,
  },
  ...initialValues,
});

export const userConfigValidationSchema = () =>
  object({
    name: BaseSchemas.requiredText(),
    email: BaseSchemas.email.required(ERROR_MESSAGES.required),
    position: BaseSchemas.requiredText(),
    phone: BaseSchemas.phone.required(ERROR_MESSAGES.required),
  });