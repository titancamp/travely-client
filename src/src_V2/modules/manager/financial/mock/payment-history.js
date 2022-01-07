export default function paymentHistory(
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  attachment
) {
  return { invoiceId, paidAmount, paymentDate, paymentType, attachment };
}
