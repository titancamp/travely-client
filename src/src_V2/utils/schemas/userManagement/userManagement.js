import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

export const editAccountInitialValues = (initialValues) => ({
  name: '',
  email: '',
  position: '',
  phone: '',
  companyName: '',
  permissions: {
    templates: 0,
    packages: 0,
    receivable: 0,
    payable: 0,
  },
  ...initialValues,
});

export const editAccountValidationSchema = () =>
  object({
    name: BaseSchemas.requiredText(),
    // email: BaseSchemas.requiredEmail,
    position: BaseSchemas.requiredText(),
    phone: BaseSchemas.phone,
  });
