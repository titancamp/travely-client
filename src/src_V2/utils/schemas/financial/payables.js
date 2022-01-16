import { number, object, array } from 'yup';

import { BaseSchemas } from '../BaseSchemas';
import { ERROR_MESSAGES } from '../../constants';
import { PaymentType } from '../../../modules/manager/financial/constants';

/**
 * Initial values for payables.
 */

export function rowListInitialValues(initialValues) {
  return {
    actualCost: '',
    dueDate: '',
    paymentHistory: [],
    notes: '',
    ...initialValues,
  };
}

export function paymentHistoryInitialValues(id) {
  return {
    id,
    invoiceId: '',
    paidAmount: '',
    paymentType: '',
    paymentDate: '',
    attachment: '',
  };
}

/**
 * Yup schemas for payables.
 */

export function paymentHistorySchema() {
  return object().shape({
    invoiceId: BaseSchemas.requiredText(64),
    paidAmount: BaseSchemas.floatingNumber(20),
    paymentType: number().oneOf([PaymentType[1], PaymentType[2]]),
    // paymentDate: '',
    attachment: object().shape([]).nullable(),
  });
}

export function rowListSchema() {
  return object().shape({
    actualCost: BaseSchemas.floatingNumber().required(ERROR_MESSAGES.required),
    paymentHistory: array().of(paymentHistorySchema()),
    notes: BaseSchemas.textField(500),
  });
}
