import {
  DifferenceCell,
  InvoiceAttachmentCell,
  PaymentTypeCell,
  StatusCell,
} from '../payables/table/custom-cells/CustomCells';

export const payableColumnTypes = {
  usualRow: 'usualRow',
  moneyMask: 'moneyMask',
  date: 'date',
  custom: 'custom',
};

export const payableColumns = () => ({
  paymentId: {
    label: 'Payment ID',
    type: payableColumnTypes.usualRow,
  },
  tourId: {
    label: 'Tour ID',
    type: payableColumnTypes.usualRow,
  },
  tourName: {
    label: 'Tour name',
    type: payableColumnTypes.usualRow,
  },
  supplier: {
    label: 'Supplier',
    type: payableColumnTypes.usualRow,
  },
  currency: {
    label: 'Currency',
    type: payableColumnTypes.usualRow,
  },
  plannedCost: {
    label: 'Planed cost',
    type: payableColumnTypes.moneyMask,
  },
  actualCost: {
    label: 'Actual cost',
    type: payableColumnTypes.moneyMask,
  },
  difference: {
    label: 'Difference',
    type: payableColumnTypes.custom, // difference
    tag(value) {
      return <DifferenceCell value={value} />;
    },
  },
  paidCost: {
    label: 'Paid',
    type: payableColumnTypes.moneyMask,
  },
  remaining: {
    label: 'Remaining',
    type: payableColumnTypes.moneyMask,
  },
  status: {
    label: 'Status',
    type: payableColumnTypes.custom,
    tag(value) {
      return <StatusCell value={value} />;
    },
  },
  createdDate: {
    label: 'Created date',
    type: payableColumnTypes.date,
  },
  invoiceId: {
    label: 'Invoice ID',
    type: payableColumnTypes.usualRow,
  },
  dueDate: {
    label: 'Due Date',
    type: payableColumnTypes.date,
  },
  paymentDate: {
    label: 'Payment date',
    type: payableColumnTypes.date,
  },
  paymentType: {
    label: 'Payment type',
    type: payableColumnTypes.custom,
    tag(value) {
      return <PaymentTypeCell value={value} />;
    },
  },
  invoiceAttachment: {
    label: 'Invoice Attachment',
    type: payableColumnTypes.custom,
    tag(value) {
      return <InvoiceAttachmentCell value={value} />;
    },
  },
});

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
