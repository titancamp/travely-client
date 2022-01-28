export const receivableColumns = () => {
  return [
    { id: 'receivableId', label: 'Receivable ID' },
    { id: 'tourId', label: 'Tour ID' },
    { id: 'tourName', label: 'Tour name' },
    { id: 'invoiceId', label: 'Invoice ID' },
    { id: 'partner', label: 'Partner name' },
    { id: 'currency', label: 'Currency' },
    { id: 'totalAmount', label: 'Total ammount' },
    { id: 'invoiceSentFlag', label: 'Invoice sent' },
    { id: 'paidAmount', label: 'Paid Amount' },
    { id: 'remainingAmount', label: 'Remaining Amount' },
    { id: 'status', label: 'Status' },
    { id: 'createdDate', label: 'Created date' },
    { id: 'dueDate', label: 'Due date' },
    { id: 'invoiceAttachment', label: 'Invoice Attachment' },
  ];
};

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
