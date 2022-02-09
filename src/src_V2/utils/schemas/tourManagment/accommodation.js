import { object } from 'yup';

import { ERROR_MESSAGES } from '../../constants';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for accommodation.
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
    services: [],
    ...initialValues,
  };
}

export function AddRoomInitialValues(initialValues) {
  return {
    beds: '',
    price: '',
    type: null,
    quantity: '',
    services: [],
    additionalBeds: '',
    ...initialValues,
  };
}

export function FilterInitialValues() {
  return {
    services: [],
    hotelServices: [],
    checkIn: '',
    checkOut: '',
    type: '',
    quantity: '',
    price: '',
    numberOfBeds: '',
    additionalBeds: '',
  };
}

/**
 * Yup schemas for accommodation.
 */
export function mainInfoSchema() {
  return object().shape({
    region: BaseSchemas.autocompleteField,
    notes: BaseSchemas.textField(500),
    name: BaseSchemas.requiredText(50),
    type: BaseSchemas.requiredAutocompleteField,
    city: BaseSchemas.textField(50, ERROR_MESSAGES.letters(50)),
    address: BaseSchemas.textField(150, ERROR_MESSAGES.maxWithSpaces(150)),
  });
}

export function addRoomSchema() {
  return object().shape({
    beds: BaseSchemas.integer(),
    quantity: BaseSchemas.integer(),
    price: BaseSchemas.floatingNumber(),
    additionalBeds: BaseSchemas.integer(),
    type: BaseSchemas.requiredAutocompleteField,
  });
}

export function AccommodationFilterSchema() {
  return object().shape({
    region: BaseSchemas.autocompleteField,
    quantity: BaseSchemas.integer(),
    price: BaseSchemas.floatingNumber(),
    priceFrom: BaseSchemas.floatingNumber(),
    priceTo: BaseSchemas.floatingNumber(),
    beds: BaseSchemas.integer(),
    additionalBeds: BaseSchemas.integer(),
    type: BaseSchemas.requiredAutocompleteField,
  });
}
