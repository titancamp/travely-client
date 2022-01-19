import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

export const editAccountInitialValues = (initialValues) => ({
  name: '',
  email: '',
  position: '',
  phone: '',
  companyName: '',
  permissions: {
    templates: '',
    packages: '',
    receivable: '',
    payable: '',
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
