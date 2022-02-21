import { array, boolean, number, object, string } from 'yup';

import {
  PaymentType,
  payableValidationValues,
} from '../../../modules/manager/financial/constants';
import { BaseSchemas } from '../BaseSchemas';

/**
 * Initial values for receivables.
 */

export function receivableRowListInitialValues(initialValues) {
  return {
    actualCost: '',
    dueDate: '',
    paymentHistory: [],
    notes: '',
    ...initialValues,
  };
}

export function receivablePaymentHistoryInitialValues(id, autoFocus = false) {
  return {
    id,
    invoiceId: '',
    paidAmount: '',
    paymentType: PaymentType.Cash,
    paymentDate: new Date(),
    attachment: {},
    sentFlag: false,
    autoFocus,
  };
}

/**
 * Yup schemas for receivables.
 */

export function paymentHistorySchema() {
  return object().shape({
    invoiceId: BaseSchemas.textField(64),
    paidAmount: BaseSchemas.floatingNumber(99999999999999999999.99),
    paymentType: number().oneOf([PaymentType.Cash, PaymentType.Transfer]),
    paymentDate: string().nullable(),
    attachment: object().shape({}).nullable(),
    sentFlag: boolean(),
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
