import { useEffect, useState } from 'react';

import { managerSidebarConfig } from '../../../config';
import { rowsPerPageOptions, payableColumns } from '../../constants';
import payablesList from '../../mock/payable';
import { Container, Layout } from '../../../../../components';
import ControlPanel from './control-panel/ControlPanel';
import PayableTable from './table/PayableTable';

const columns = payableColumns();

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
