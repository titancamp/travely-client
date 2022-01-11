export const rowsPerPageOptions = [20, 50, 100];

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
    { id: 'dueDate', label: 'Due date' },
    { id: 'paymentDate', label: 'Payment date' },
    { id: 'paymentType', label: 'Payment type' },
    { id: 'invoiceAttachment', label: 'Invoice Attachment' },
  ];
};
