import { Dialog } from '@mui/material';

import DetailsDialog from '../../components/dialogs/Details.dialog';
import MainInfo from '../../components/dialogs/MainInfo';
import Partnership from '../../components/dialogs/Partnership';
import Attributes from './ActivityDetails/Attributes';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'activityDetails':
      return (
        <DetailsDialog
          data={data}
          onClose={onClose}
          tabs={[
            <MainInfo key={1} />,
            <Attributes key={2} />,
            <Partnership key={3} tabNumber='3' />,
          ]}
          tabList={[
            { label: 'MAIN INFO', value: '1' },
            { label: 'ATTRIBUTES', value: '2' },
            { label: 'PARTNERSHIP', value: '3' },
          ]}
        />
      );
    default:
      return null;
  }
}

export default function DialogManager({ data, onShowHideDialog }) {
  function onClose() {
    onShowHideDialog({
      mode: '',
      open: false,
    });
  }

  return (
    <Dialog open={data.open} onClose={onClose}>
      <CurrentDialog data={data} onClose={onClose} />
    </Dialog>
  );
}
