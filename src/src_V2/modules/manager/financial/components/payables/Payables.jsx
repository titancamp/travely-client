import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { managerSidebarConfig } from '../../../config';
import { rowsPerPageOptions, payableColumns } from '../../constants';
import payablesList from '../../mock/payable';
import { differenceCost, remainingCost } from '../../utils/cost';
import { Container, Layout } from '../../../../../components';
import ControlPanel from './control-panel/ControlPanel';
import PayableTable from './table/PayableTable';

export default function Payables() {
  const [payables, setPayables] = useState([]);
  const [payablesLoading, setPayablesLoading] = useState(false);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const searchForm = useFormik({
    initialValues: {
      search: '',
    },
  });
  const searchTxt = searchForm.values.search;

  useEffect(() => {
    getPayables();
  }, []);

  useEffect(() => {
    filterPayables();
  }, [searchTxt, payables]);

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
    const processedPayables = payables.map((payable) => {
      payable.difference = differenceCost(payable.plannedCost, payable.actualCost);
      payable.remaining = remainingCost(payable.actualCost, payable.paidCost);
      return payable;
    });
    setPayables(processedPayables);
  }

  function filterPayables() {
    // filtering payables by Tour Name/ID/Supplier
    const filteredPayables = payables.filter(
      (item) =>
        item.tourName.toLowerCase().includes(searchTxt) ||
        item.paymentId.toString().includes(searchTxt) ||
        item.supplier.toLowerCase().includes(searchTxt)
    );
    setFilteredPayables(filteredPayables);
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Layout title='Payables'>
        <ControlPanel searchForm={searchForm} />
        <PayableTable
          payables={filteredPayables}
          columns={payableColumns()}
          payablesLoading={payablesLoading}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Layout>
    </Container>
  );
}
