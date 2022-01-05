import { useEffect, useState } from 'react';

import { managerSidebarConfig } from '../../../config';
import payablesList from '../../mock/payable';
import { Container, Layout } from '../../../../../components';
import ControlPanel from './control-panel/ControlPanel';
import PayableTable from './table/PayableTable';

const rowsPerPageOptions = [20, 50, 100];

const columns = [
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

export default function Payables() {
  const [payables, setPayables] = useState([]);
  const [payablesLoading, setPayablesLoading] = useState(false);

  useEffect(() => {
    getPayables();
  }, []);

  // getting Payables from backend
  function getPayables() {
    setPayablesLoading(true);

    const timeout = setTimeout(() => {
      processPayables(payablesList());
      setPayablesLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }

  function processPayables(payables) {
    const processedPayables = [...payables].map((payable) => {
      payable.difference = payable.plannedCost - payable.actualCost;
      payable.remaining = payable.actualCost - payable.paidCost;
      payable.currency = 'AMD';
      return payable;
    });
    setPayables(processedPayables);
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Layout title="Payables">
        <ControlPanel />
        <PayableTable
          payables={payables}
          columns={columns}
          payablesLoading={payablesLoading}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Layout>
    </Container>
  );
}
