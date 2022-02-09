import { useState } from 'react';
import { Grid } from '@mui/material';
import { TabPanel } from '@mui/lab';
import DialogManager from '../Index';
import { InfoCard } from '../../../components';
import { GuidesConstants } from '../../constants';

import styles from '../style.module.css';

export default function Guides() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view',
      state: GuidesConstants.find((guide) => guide.id === id),
    });
  }

  return (
    <>
      <TabPanel className={styles.roomsTabPanel} value='2'>
        <Grid className={styles.roomsSection}>
          {GuidesConstants.map((guide) => {
            let languages = guide.languages?.reduce(
              (prev, { label }, index) => prev + (index ? ' / ' : '') + label,
              ''
            );
            return (
              <InfoCard
                id={guide.id}
                key={guide.id}
                image={guide.image?.previewImage}
                sectionData={{
                  1: {
                    value: guide.experience,
                    label: '',
                  },
                  2: {
                    value: guide.person,
                    label: null,
                  },
                  3: {
                    value: languages,
                    label: '',
                  },
                  4: {
                    value: guide.phone,
                    label: '',
                  },
                }}
                seeDetailsAction={openViewCardDialog}
              />
            );
          })}
        </Grid>
      </TabPanel>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </>
  );
}
