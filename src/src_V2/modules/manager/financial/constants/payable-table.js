export const payableColumns = () => {
  return [
    { id: 'paymentId', label: 'Payment ID' },
    { id: 'tourId', label: 'Tour ID' },
    { id: 'tourNam', label: 'Tour name' },
    { id: 'supplier', label: 'Supplier' },
    { id: 'currency', label: 'Currency' },
    { id: 'plannedCost', label: 'Planed cost' },
    { id: 'actualCost', label: 'Actual cost' },
    { id: 'difference', label: 'Difference' },
    { id: 'paidCost', label: 'Paid' },
    { id: 'remaining', label: 'Remaining' },
    { id: 'status', label: 'Status' },
    { id: 'createdDate', label: 'Created date' },
    { id: 'invoiceId', label: 'Invoice ID' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'paymentDate', label: 'Payment date' },
    { id: 'paymentType', label: 'Payment type' },
    { id: 'invoiceAttachment', label: 'Invoice Attachment' },
  ];
};

export const paymentHistoryColumnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  file: 'file',
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
    type: paymentHistoryColumnTypes.file,
    tooltip:
      'Please upload png, jpg, jpeg, gif, pdf file type. File size should be 10 MB.',
  },
});
