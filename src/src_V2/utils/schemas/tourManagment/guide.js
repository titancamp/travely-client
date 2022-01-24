import { object, array } from 'yup';
import { BaseSchemas } from '../BaseSchemas';
import { ERROR_MESSAGES } from '../../constants';

/**
 * Initial values for transportation page.
 */
export function mainInfoInitialValues(initialValues) {
  return {
    city: '',
    name: '',
    notes: '',
    type: null,
    address: '',
    checkIn: '',
    checkOut: '',
    region: null,
    ...initialValues,
  };
}

export function addGuideInitialValues(initialValues) {
  return {
    age: '',
    phone: '',
    email: '',
    sex: null,
    name: '',
    skills: [],
    languages: [],
    experience: '',
    ...initialValues,
  };
}

/**
 * Yup schemas for transportation page.
 */
export function mainInfoSchema() {
  return object().shape({
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    person: BaseSchemas.textField(50),
    name: BaseSchemas.requiredText(50),
    type: BaseSchemas.requiredAutocompleteField,
    price: BaseSchemas.floatingNumber(99999999.99),
    city: BaseSchemas.textField(50, ERROR_MESSAGES.letters(50)),
    address: BaseSchemas.textField(150, ERROR_MESSAGES.maxWithSpaces(150)),
  });
}

export function addGuideSchema() {
  return object().shape({
    skills: array(),
    phone: BaseSchemas.phone,
    email: BaseSchemas.email,
    sex: BaseSchemas.autocompleteField,
    age: BaseSchemas.integer(120),
    name: BaseSchemas.requiredText(50),
    experience: BaseSchemas.integer(50),
    languages: BaseSchemas.multiAutocompleteField,
  });
}
