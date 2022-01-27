import { useCallback, useEffect, useState } from 'react';

import { Layout } from '../../../../../components';
import { receivableColumns, rowsPerPageOptions } from '../../constants';
import receivablesList from '../../mock/receivable';
import { remainingCost } from '../../utils/cost';
import ControlPanel from './control-panel/ControlPanel';
import ReceivableTable from './table/ReceivableTable';

export default function Receivables() {
  const [receivables, setReceivables] = useState([]);
  const [receivablesLoading, setReceivablesLoading] = useState(false);
  const [filteredReceivables, setFilteredReceivables] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');

  // getting Receivables from backend
  function getReceivables() {
    setReceivablesLoading(true);

    const timeout = setTimeout(() => {
      processReceivables(receivablesList());
      setReceivablesLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }

  function processReceivables(receivables) {
    const processedReceivables = receivables.map((receivable) => {
      receivable.remaining = remainingCost(receivable.totalAmount, receivable.paidAmount);
      return receivable;
    });
    setReceivables(processedReceivables);
  }

  const filterReceivables = useCallback(() => {
    // filtering receivables by Tour Name/ID/Partner
    const filteredReceivables = receivables.filter(
      (item) =>
        item.tourName.toLowerCase().includes(searchTxt) ||
        item.receivableId.toString().includes(searchTxt) ||
        item.partner.toLowerCase().includes(searchTxt)
    );
    setFilteredReceivables(filteredReceivables);
  });

  useEffect(getReceivables, []);

  useEffect(filterReceivables, [searchTxt, receivables]);

  return (
    <>
      <Layout title='Receivables'>
        <ControlPanel
          searchValue={searchTxt}
          handleSearchChange={(e) => setSearchTxt(e.target.value)}
        />
        <ReceivableTable
          receivables={filteredReceivables}
          columns={receivableColumns()}
          receivablesLoading={receivablesLoading}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Layout>
    </>
  );
}
