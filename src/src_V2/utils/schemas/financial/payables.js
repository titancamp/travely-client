import { array, number, object, string } from 'yup';

import { PaymentType } from '../../../modules/manager/financial/constants';
import { payableValidationValues } from '../../../modules/manager/financial/constants';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for payables.
 */

export function payableRowListInitialValues(initialValues) {
  return {
    actualCost: '',
    dueDate: '',
    paymentHistory: [],
    notes: '',
    ...initialValues,
  };
}

export function payablePaymentHistoryInitialValues(id, autoFocus = false) {
  return {
    id,
    invoiceId: '',
    paidAmount: '',
    paymentType: PaymentType.Cash,
    paymentDate: new Date(),
    attachment: {},
    autoFocus,
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
    paymentDate: string().nullable(),
    attachment: object().shape({}).nullable(),
  });
}

export function rowListSchema() {
  return object().shape({
    actualCost: BaseSchemas.floatingRequiredNumber(
      payableValidationValues.actualCostMaxValue
    ),
    paymentHistory: array().of(paymentHistorySchema()),
    notes: BaseSchemas.textField(500),
  });
}
