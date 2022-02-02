import { array, number, object } from 'yup';

import { PaymentType } from '../../../modules/manager/financial/constants';
import { ERROR_MESSAGES } from '../../constants';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for receivables.
 */

export function receivablesRowListInitialValues(initialValues) {
  return {
    actualCost: '',
    dueDate: '',
    paymentHistory: [],
    notes: '',
    ...initialValues,
  };
}

export function receivablesPaymentHistoryInitialValues(id) {
  return {
    id,
    invoiceId: '',
    paidAmount: '',
    paymentType: PaymentType.Cash,
    paymentDate: '',
    attachment: '',
    sendFlag: false,
  };
}

/**
 * Yup schemas for receivables.
 */

export function receivablesPaymentHistorySchema() {
  return object().shape({
    invoiceId: BaseSchemas.requiredText(64),
    paidAmount: BaseSchemas.floatingNumber(20),
    paymentType: number().oneOf([PaymentType[1], PaymentType[2]]),
    // paymentDate: '',
    attachment: object().shape([]).nullable(),
  });
}

export function receivablesRowListSchema() {
  return object().shape({
    actualCost: BaseSchemas.floatingNumber().required(ERROR_MESSAGES.required),
    paymentHistory: array().of(receivablesPaymentHistorySchema()),
    notes: BaseSchemas.textField(500),
  });
}
