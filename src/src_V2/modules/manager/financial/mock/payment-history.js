export default function paymentHistory(
  id,
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  attachment
) {
  return { id, invoiceId, paidAmount, paymentDate, paymentType, attachment };
}

export function receivablePaymentHistory(
  id,
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  attachment,
  invoiceSentFlag
) {
  return {
    id,
    invoiceId,
    paidAmount,
    paymentDate,
    paymentType,
    attachment,
    invoiceSentFlag,
  };
}
