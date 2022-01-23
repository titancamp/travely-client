import { number, object, array } from 'yup';

import { BaseSchemas } from '../BaseSchemas';
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
    paymentType: PaymentType.Cash,
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
    paidAmount: BaseSchemas.floatingNumber(99999999999999999999.99),
    paymentType: number().oneOf([PaymentType.Cash, PaymentType.Transfer]),
    attachment: object().shape([]).nullable(),
  });
}

export function rowListSchema() {
  return object().shape({
    actualCost: BaseSchemas.floatingRequiredNumber(999999999.99),
    paymentHistory: array().of(paymentHistorySchema()),
    notes: BaseSchemas.textField(500),
  });
}
