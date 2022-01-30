export function payablePaymentHistory(
  id,
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  attachment = {}
) {
  return { id, invoiceId, paidAmount, paymentDate, paymentType, attachment };
}

export function receivablePaymentHistory(
  id,
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  invoiceSentFlag,
  attachment
) {
  return {
    id,
    invoiceId,
    paidAmount,
    paymentDate,
    paymentType,
    invoiceSentFlag,
    attachment,
  };
}
