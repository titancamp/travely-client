import { TableCellWrapper } from '../../components';
import {
  DifferenceCell,
  EmptyCell,
  InvoiceAttachmentCell,
  PaymentTypeCell,
  StatusCell,
} from '../../payables/table/custom-cells/CustomCells';
import { columnTypes, stickyFooterColumnTypes } from '../table-settings';

export const payableColumns = () => ({
  paymentId: {
    label: 'Payment ID',
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
  supplier: {
    label: 'Supplier',
    type: columnTypes.usualRow,
  },
  currency: {
    label: 'Currency',
    type: columnTypes.usualRow,
  },
  plannedCost: {
    label: 'Planed cost',
    type: columnTypes.moneyMask,
  },
  actualCost: {
    label: 'Actual cost',
    type: columnTypes.moneyMask,
  },
  difference: {
    label: 'Difference',
    type: columnTypes.custom,
    tag(value) {
      return <DifferenceCell value={value} />;
    },
  },
  paidCost: {
    label: 'Paid',
    type: columnTypes.moneyMask,
  },
  remaining: {
    label: 'Remaining',
    type: columnTypes.moneyMask,
  },
  status: {
    label: 'Status',
    type: columnTypes.custom,
    tag(value) {
      return <StatusCell value={value} />;
    },
  },
  createdDate: {
    label: 'Created date',
    type: columnTypes.date,
  },
  invoiceId: {
    label: 'Invoice ID',
    type: columnTypes.usualRow,
  },
  dueDate: {
    label: 'Due Date',
    type: columnTypes.date,
  },
  paymentDate: {
    label: 'Payment date',
    type: columnTypes.date,
  },
  paymentType: {
    label: 'Payment type',
    type: columnTypes.custom,
    tag(value) {
      return <PaymentTypeCell value={value} />;
    },
  },
  invoiceAttachment: {
    label: 'Invoice Attachment',
    type: columnTypes.custom,
    tag(value) {
      return <InvoiceAttachmentCell value={value} />;
    },
  },
});

export const stickyFooterColumns = () => ({
  paymentId: {
    type: stickyFooterColumnTypes.custom,
    tag() {
      return <TableCellWrapper>Total AMD</TableCellWrapper>;
    },
  },
  emptyCells1: {
    type: stickyFooterColumnTypes.custom,
    tag() {
      return <EmptyCell count={4} />;
    },
  },
  plannedCost: {
    type: columnTypes.moneyMask,
  },
  actualCost: {
    type: columnTypes.moneyMask,
  },
  difference: {
    type: columnTypes.custom,
    tag(value) {
      return <DifferenceCell value={value} styleName='boldCell' />;
    },
  },
  paid: {
    type: columnTypes.moneyMask,
  },
  remaining: {
    type: columnTypes.moneyMask,
  },
  emptyCells2: {
    type: stickyFooterColumnTypes.custom,
    tag() {
      return <EmptyCell count={7} />;
    },
  },
});