import { object } from 'yup';

import { ERROR_MESSAGES } from '../../constants';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for transportation.
 */
export function mainInfoInitialValues(initialValues) {
  return {
    city: '',
    name: '',
    notes: '',
    type: null,
    address: '',
    region: null,
    weekends: false,
    attachments: [],
    workingDays: false,
    checkInWeekend: '',
    checkOutWeekend: '',
    checkInWorkingDay: '',
    checkOutWorkingDay: '',
    ...initialValues,
  };
}

export function FilterInitialValues() {
  return {
    menu: [],
    type: null,
    region: null,
    city: null,
    priceFrom: '',
    priceTo: '',
    checkIn: '',
    checkOut: '',
  };
}

export function menuInitialValues(initialValues) {
  return {
    menuTags: [],
    attachments: [],
    ...initialValues,
  };
}

/**
 * Yup schemas for food.
 */
export function mainInfoSchema() {
  return object().shape({
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    type: BaseSchemas.requiredAutocompleteField,
    price: BaseSchemas.floatingNumber(
      99999999.99,
      ERROR_MESSAGES.rightFormat(', e.g. 99,999,999.99')
    ),
    city: BaseSchemas.textField(50, ERROR_MESSAGES.letters(50)),
    address: BaseSchemas.textField(150, ERROR_MESSAGES.maxWithSpaces(150)),
    name: BaseSchemas.requiredText(50, ERROR_MESSAGES.lettersAndNumbers(50)), //
  });
}

export function FoodFiltersSchema() {
  return object().shape({
    menu: BaseSchemas.autocompleteField,
    type: BaseSchemas.autocompleteField,
    region: BaseSchemas.autocompleteField,
    city: BaseSchemas.autocompleteField,
    priceFrom: BaseSchemas.floatingNumber(
      99999999.99,
      ERROR_MESSAGES.rightFormat(', e.g. 99,999,999.99')
    ),
    priceTo: BaseSchemas.floatingNumber(
      99999999.99,
      ERROR_MESSAGES.rightFormat(', e.g. 99,999,999.99')
    ),
  });
}
