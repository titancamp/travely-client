import { object } from 'yup';
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
    name: BaseSchemas.textField(),
    email: BaseSchemas.email,
    position: BaseSchemas.textField(),
    phone: BaseSchemas.phone,
    companyName: BaseSchemas.textField(),
    companyAddress: BaseSchemas.textField(),
    companyEmail: BaseSchemas.email,
    companyPhone: BaseSchemas.phone,
  });
