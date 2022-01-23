export default function paymentHistory(
  id,
  invoiceId,
  paidAmount,
  paymentDate,
  paymentType,
  attachment = {}
) {
  return { id, invoiceId, paidAmount, paymentDate, paymentType, attachment };
}
