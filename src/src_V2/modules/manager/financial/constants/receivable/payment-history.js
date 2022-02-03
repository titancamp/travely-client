export const receivablePaymentHistoryColumnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  file: 'file',
  checkbox: 'checkbox',
};

export const receivablePaymentHistoryColumns = () => ({
  invoiceId: {
    label: 'Invoice ID',
    type: receivablePaymentHistoryColumnTypes.text,
  },
  paidAmount: {
    label: 'Paid Amount',
    type: receivablePaymentHistoryColumnTypes.price,
  },
  paymentDate: {
    label: 'Payment Date',
    type: receivablePaymentHistoryColumnTypes.date,
  },
  paymentType: {
    label: 'Payment Type',
    type: receivablePaymentHistoryColumnTypes.select,
  },
  attachment: {
    label: 'Attachment',
    type: receivablePaymentHistoryColumnTypes.file,
    tooltip:
      'Please upload png, jpg, jpeg, gif, pdf file type. File size should be 10 MB.',
  },
  invoiceSentFlag: {
    label: 'Sent',
    type: receivablePaymentHistoryColumnTypes.checkbox,
  },
});
