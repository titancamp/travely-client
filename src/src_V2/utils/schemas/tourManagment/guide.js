import { object } from 'yup';
import { BaseSchemas } from '../BaseSchemas';

export function addGuideInitialValues(initialValues) {
  return {
    age: '',
    phone: '',
    email: '',
    sex: null,
    person: '',
    skills: '',
    languages: [],
    experience: '',
    ...initialValues,
  };
}

export function addGuideSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    skills: BaseSchemas.textField(),
    person: BaseSchemas.textField(),
    experience: BaseSchemas.integer(),
    sex: BaseSchemas.autocompleteField,
    age: BaseSchemas.integer(120),
    languages: BaseSchemas.multiAutocompleteField,
  });
}
