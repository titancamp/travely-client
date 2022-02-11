import {
  InvoiceAttachmentCell,
  StatusCell,
} from '../../components/table-cells/TableCells';
import { InvoiceSentFlag } from '../../receivables/table/custom-cells/CustomCells';
import { columnTypes } from '../table-settings';

export const receivableColumns = () => ({
  receivableId: {
    label: 'Receivable ID',
    type: columnTypes.usualRow,
  },
  tourId: {
    label: 'Tour ID',
    type: columnTypes.usualRow,
  },
  tourName: {
    label: 'Tour name',
    type: columnTypes.usualRow,
  },
  invoiceId: {
    label: 'Invoice ID',
    type: columnTypes.usualRow,
  },
  partner: {
    label: 'Partner name',
    type: columnTypes.usualRow,
  },
  currency: {
    label: 'Currency',
    type: columnTypes.usualRow,
  },
  totalAmount: {
    label: 'Total amount',
    type: columnTypes.moneyMask,
  },
  invoiceSentFlag: {
    label: 'Invoice sent',
    type: columnTypes.custom,
    tag(value) {
      return <InvoiceSentFlag value={value} />;
    },
  },
  paidAmount: {
    label: 'Paid amount',
    type: columnTypes.moneyMask,
  },
  remaining: {
    label: 'Remaining amount',
    type: columnTypes.moneyMask,
  },
  status: {
    label: 'Status',
    type: columnTypes.custom,
    tag(value) {
      return <StatusCell value={value} />;
    },
    ifEmpty: '--',
  },
  createdDate: {
    label: 'Created date',
    type: columnTypes.date,
  },
  dueDate: {
    label: 'Due date',
    type: columnTypes.date,
  },
  invoiceAttachment: {
    label: 'Invoice attachment',
    type: columnTypes.custom,
    tag() {
      return <InvoiceAttachmentCell />;
    },
    ifEmpty: '--',
  },
});
