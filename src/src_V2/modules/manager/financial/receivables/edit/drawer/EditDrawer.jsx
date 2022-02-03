import { Box, Drawer } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { ConfirmDialog } from '../../../../../../components';
import { rowListInitialValues, rowListSchema } from '../../../../../../utils/schemas';
import RowList from '../drawer-content/RowList';
import styles from './EditDrawer.module.css';

const DrawerList = ({ row, rowEditForm, closeHandler, saveHandler }) => (
  <Box className={styles.contentDiv} role='presentation'>
    <RowList
      row={row}
      rowEditForm={rowEditForm}
      onClose={closeHandler}
      onSave={saveHandler}
    />
  </Box>
);

export default function EditDrawer({ drawerState, clickedRow, isOpenedChangeHandler }) {
  const { isOpened, drawerEvent } = drawerState;
  const drawerSlideDuration = 500;
  const anchor = 'right';
  const [unsavedPopupOpened, setUnsavedPopupOpened] = useState(false);
  const [applyPopupOpened, setApplyPopupOpened] = useState(false);

  const rowEditForm = useFormik({
    validationSchema: rowListSchema,
    initialValues: rowListInitialValues(clickedRow),
  });

  const toggleDrawer = (isOpened) => {
    if (
      drawerEvent?.type === 'keydown' &&
      (drawerEvent?.key === 'Tab' || drawerEvent?.key === 'Shift')
    ) {
      return;
    }

    isOpenedChangeHandler(isOpened);
  };

  // Popup functions
  const openUnsavedChangesPopup = () => {
    setUnsavedPopupOpened(true);
  };

  const closeUnsavedChangesPopup = () => {
    setUnsavedPopupOpened(false);
  };

  const openApplyPopup = () => {
    setApplyPopupOpened(true);
  };

  const closeApplyPopup = () => {
    setApplyPopupOpened(false);
  };

  const closeDrawer = () => {
    toggleDrawer(false);
    isOpenedChangeHandler(false);
  };

  const closePopupsAndDrawer = () => {
    closeUnsavedChangesPopup();
    closeApplyPopup();
    closeDrawer();
  };

  const handleCloseDrawer = () => {
    if (rowEditForm.dirty) {
      openUnsavedChangesPopup();
    } else {
      closeDrawer();
    }
  };

  const handleDiscardUnsavedChanges = () => {
    closePopupsAndDrawer();
  };

  const handleSaveApplyClick = () => {
    if (rowEditForm.dirty) {
      openApplyPopup();
    }
  };

  const handleSaveChanges = () => {
    // first - backend save request, then...
    console.log('saved');
    closePopupsAndDrawer();
  };

  useEffect(() => toggleDrawer(isOpened), [isOpened]);

  return (
    <>
      <Drawer
        anchor={anchor}
        transitionDuration={drawerSlideDuration}
        open={isOpened}
        onClose={handleCloseDrawer}
      >
        <DrawerList
          row={clickedRow}
          rowEditForm={rowEditForm}
          closeHandler={handleCloseDrawer}
          saveHandler={handleSaveApplyClick}
        />
      </Drawer>

      {/*Popups*/}

      {/*Unsaved data popup*/}
      <ConfirmDialog
        open={unsavedPopupOpened}
        message='Please note that you have unsaved changes. Do you want to save the changes?'
        confirmButton={{ focus: true, txt: 'Save' }}
        cancelButton={{ txt: 'Discard' }}
        onCancel={handleDiscardUnsavedChanges}
        onClose={closeUnsavedChangesPopup}
        onConfirm={handleSaveChanges}
      />
      {/*Apply data popup*/}
      <ConfirmDialog
        open={applyPopupOpened}
        title='Apply'
        message='Please note that if there are completed fields in the selected rows, the data will be replaced.'
        confirmButton={{ focus: true, txt: 'Apply' }}
        onClose={closeApplyPopup}
        onConfirm={handleSaveChanges}
      />
    </>
  );
}
