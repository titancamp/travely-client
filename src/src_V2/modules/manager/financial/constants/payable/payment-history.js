export const payablePaymentHistoryColumnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  attachment: 'attachment',
};

export const payablePaymentHistoryColumns = () => ({
  invoiceId: {
    label: 'Invoice ID',
    type: payablePaymentHistoryColumnTypes.text,
  },
  paidAmount: {
    label: 'Paid Amount',
    type: payablePaymentHistoryColumnTypes.price,
  },
  paymentDate: {
    label: 'Payment Date',
    type: payablePaymentHistoryColumnTypes.date,
  },
  paymentType: {
    label: 'Payment Type',
    type: payablePaymentHistoryColumnTypes.select,
  },
  attachment: {
    label: 'Attachment',
    type: payablePaymentHistoryColumnTypes.attachment,
    tooltip:
      'Please upload png, jpg, jpeg, gif, pdf file type. File size should be 10 MB.',
  },
});

export const payableValidationValues = {
  actualCostMaxValue: 999999999.99,
  paidAmountMaxValue: 99999999999999999999.99,
};
