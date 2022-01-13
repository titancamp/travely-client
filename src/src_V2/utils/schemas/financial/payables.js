import { object } from 'yup';
import { BaseSchemas } from '../tourManagment/BaseSchemas';
import { ERROR_MESSAGES } from '../../constants';

/**
 * Initial values for payables.
 */
export function searchInitialValue(initialValue) {
  return {
    search: '',
    ...initialValue,
  };
}

export function rowListInitialValues(initialValues) {
  return {
    actualCost: '',
    dueDate: '',
    paymentHistory: {
      invoiceId: '',
      paidAmount: '',
      paymentDate: '',
      paymentType: '',
      attachment: '',
    },
    notes: '',
    ...initialValues,
  };
}

/**
 * Yup schemas for payables.
 */
export function rowListSchema() {
  return object().shape({
    actualCost: BaseSchemas.floatingNumber().required(ERROR_MESSAGES.required),
    // paymentHistory: object().shape({
    //   // invoiceId: '',
    //   paidAmount: BaseSchemas.floatingNumber(),
    //   // paymentDate: '',
    //   paymentType: '',
    //   // attachment: '',
    // }),
    notes: BaseSchemas.textField(200),
  });
}
