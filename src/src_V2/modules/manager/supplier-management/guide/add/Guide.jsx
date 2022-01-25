import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { AddCard, InfoCard } from '../../components';

import styles from './style.module.css';
import DialogManager from '../dialogs/Index';

export default function Guide({ parentRef }) {
  const [guides, setGuides] = useState(parentRef.guides);
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const addGuidesToTransportationData = () => (parentRef.guides = guides);

  function addGuide(guide) {
    guide.id = guides.length ? guides[guides.length - 1].id + 1 : 1;
    setGuides([...guides, guide]);
    onShowHideDialog({ open: false });
  }

  function deleteGuide(id) {
    setGuides(guides.filter((guide) => guide.id !== id));
    onShowHideDialog({ open: false });
  }

  function editGuide(newGuide) {
    setGuides(guides.map((guide) => (newGuide.id === guide.id ? newGuide : guide)));
    onShowHideDialog({ open: false });
  }

  function openAddCardDialog() {
    onShowHideDialog({
      open: true,
      mode: 'add',
      actions: addGuide,
    });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view',
      state: guides.find((guide) => guide.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  function openDeleteCardDialog(id) {
    onShowHideDialog({
      open: true,
      state: { id },
      mode: 'delete',
      actions: deleteGuide,
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit',
      actions: editGuide,
      state: guides.find((guide) => guide.id === id),
    });
  }

  useEffect(addGuidesToTransportationData, [guides]);

  return (
    <Box className={styles.content}>
      <Grid container spacing={1}>
        <AddCard
          title='Attributes'
          buttonText='ADD GUIDE'
          onOpenDialog={openAddCardDialog}
          disabled={guides.length === 50}
          subTitle='Add Button bellow to add guides to your accommodation'
          tooltipKeyWord={'guide'}
        />
        {guides.map((guide) => {
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
              areaAction={openViewCardDialog}
              firstCardAction={openEditCardDialog}
              secondCardAction={openDeleteCardDialog}
            />
          );
        })}
      </Grid>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Box>
  );
}
