export const acceptedFileTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'application/pdf',
];

export const paymentHistoryColumnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  attachment: 'attachment',
};

export const paymentHistoryColumns = () => ({
  invoiceId: {
    label: 'Invoice ID',
    type: paymentHistoryColumnTypes.text,
  },
  paidAmount: {
    label: 'Paid Amount',
    type: paymentHistoryColumnTypes.price,
  },
  paymentDate: {
    label: 'Payment Date',
    type: paymentHistoryColumnTypes.date,
  },
  paymentType: {
    label: 'Payment Type',
    type: paymentHistoryColumnTypes.select,
  },
  attachment: {
    label: 'Attachment',
    type: paymentHistoryColumnTypes.attachment,
    tooltip:
      'Please upload png, jpg, jpeg, gif, pdf file type. File size should be 10 MB.',
  },
});

export const payableValidationValues = {
  actualCostMaxValue: 999999999.99,
  paidAmountMaxValue: 99999999999999999999.99,
};
