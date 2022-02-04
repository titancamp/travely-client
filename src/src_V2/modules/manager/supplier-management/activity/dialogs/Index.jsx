import { Dialog, Tab } from '@mui/material';

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
          tabs={{
            mainInfo: <MainInfo />,
            attributes: <Attributes />,
            partnership: <Partnership tabNumber='3' />,
          }}
          tabList={{
            mainInfo: <Tab label='MAIN INFO' value='1' />,
            attributes: <Tab label='ATTRIBUTES' value='2' />,
            partnership: <Tab label='PARTNERSHIP' value='3' />,
          }}
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
