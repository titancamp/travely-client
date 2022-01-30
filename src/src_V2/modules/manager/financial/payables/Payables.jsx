import { useCallback, useEffect, useState } from 'react';

import { Layout } from '../../../../components';
import { payableColumns, rowsPerPageOptions } from '../constants';
import payablesData from '../mock/payable';
import { differenceCost, remainingCost } from '../utils/cost';
import ControlPanel from './control-panel/ControlPanel';
import PayableTable from './table/PayableTable';

export default function Payables() {
  const [payables, setPayables] = useState([]);
  const [payablesLoading, setPayablesLoading] = useState(false);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  const payablesTableData = payablesData();

  // getting Payables from backend
  function getPayables() {
    setPayablesLoading(true);

    const timeout = setTimeout(() => {
      processPayables(payablesTableData.payablesList);
      setPayablesLoading(false);
    }, 500);

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

  const filterPayables = useCallback(() => {
    // filtering payables by Tour Name/ID/Supplier
    const filteredPayables = payables.filter(
      (item) =>
        item.tourName.toLowerCase().includes(searchTxt) ||
        item.paymentId.toString().includes(searchTxt) ||
        item.supplier.toLowerCase().includes(searchTxt)
    );
    setFilteredPayables(filteredPayables);
  });

  useEffect(getPayables, []);

  useEffect(filterPayables, [searchTxt, payables]);

  return (
    <Layout title='Payables'>
      <ControlPanel searchValue={searchTxt} handleSearchChange={setSearchTxt} />
      <PayableTable
        payables={filteredPayables}
        total={payablesTableData.total}
        columns={payableColumns()}
        payablesLoading={payablesLoading}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Layout>
  );
}
