import { Alert, Box } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { ConfirmDialog } from '../../../../../components';
import {
  payableRowListInitialValues as rowListInitialValues,
  rowListSchema,
} from '../../../../../utils/schemas';
import { StickyDrawer } from '../../components';
import styles from './EditDrawer.module.css';
import EditableInfo from './editable-info/EditableInfo';
import GeneralInfo from './general-info/GeneralInfo';
import Notes from './notes/Notes';
import PaymentHistory from './payment-history/PaymentHistory';
import TourDetails from './tour-details/TourDetails';

const FileError = ({ errorMessage, setError }) => {
  setTimeout(() => {
    setError(null);
    return null;
  }, 5000);

  return (
    <Alert severity='error' className={styles.uploadError}>
      {errorMessage}
    </Alert>
  );
};

const DrawerHeader = ({ row }) => (
  <div className={styles.textDiv}>
    <div className={`${styles.payableId} ${styles.mainText}`}>
      Payable ID: {row.payableId}
    </div>
    <div className={styles.supplierName}>Supplier Name: {row.supplier}</div>
  </div>
);

const DrawerLayout = ({ rowEditForm, row }) => {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    rowEditForm;
  const [fileError, setFileError] = useState('');

  return (
    <>
      <Box className={styles.layoutDistance}>
        <GeneralInfo actualCost={values.actualCost} row={row} />
      </Box>

      <Box className={styles.layoutDistance}>
        <EditableInfo
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          currency={row.currency}
          setFieldValue={setFieldValue}
        />
      </Box>

      <Box className={styles.layoutDistance}>
        <TourDetails row={row} />
      </Box>

      <Box className={styles.layoutDistance}>
        <PaymentHistory
          paymentHistory={values.paymentHistory}
          currency={row.currency}
          errors={errors.paymentHistory}
          touched={touched}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          setFileError={setFileError}
        />
      </Box>

      <Box className={styles.layoutDistance}>
        <Notes
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
      </Box>
      {/*File Error*/}
      {fileError && <FileError errorMessage={fileError} setError={setFileError} />}
    </>
  );
};

export default function EditDrawer({ drawerState, clickedRow, isOpenedChangeHandler }) {
  const { isOpened, drawerEvent } = drawerState;
  const [unsavedPopupOpened, setUnsavedPopupOpened] = useState(false);

  const rowEditForm = useFormik({
    validationSchema: rowListSchema,
    initialValues: rowListInitialValues(clickedRow),
  });

  const toggleDrawer = () => {
    if (
      drawerEvent?.type === 'keydown' &&
      (drawerEvent?.key === 'Tab' || drawerEvent?.key === 'Shift')
    ) {
      return;
    }

    isOpenedChangeHandler(isOpened);
  };

  // Popup functions
  const openUnsavedChangesPopup = () => setUnsavedPopupOpened(true);

  const closeUnsavedChangesPopup = () => setUnsavedPopupOpened(false);

  const closeDrawer = () => {
    toggleDrawer(false);
    isOpenedChangeHandler(false);
  };

  const closePopupsAndDrawer = () => {
    closeUnsavedChangesPopup();
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
      handleSaveChanges();
    }
  };

  const handleSaveChanges = () => {
    // first - backend save request, then...
    console.log('saved');
    closePopupsAndDrawer();
  };

  useEffect(() => toggleDrawer(), [isOpened]);

  return (
    <>
      <StickyDrawer
        isOpened={isOpened}
        handleSave={handleSaveApplyClick}
        handleSubmit={rowEditForm.handleSubmit}
        handleCloseDrawer={handleCloseDrawer}
        saveButton={{ disabled: !rowEditForm.dirty }}
        header={<DrawerHeader row={clickedRow} />}
        layout={<DrawerLayout rowEditForm={rowEditForm} row={clickedRow} />}
      />

      {/*Unsaved data popup*/}
      <ConfirmDialog
        open={unsavedPopupOpened}
        message='Please note that you have unsaved changes. Do you want to save the changes?'
        confirmButton={{ focus: false, txt: 'Save' }}
        cancelButton={{ focus: true, txt: 'Discard' }}
        onCancel={handleDiscardUnsavedChanges}
        onClose={closeUnsavedChangesPopup}
        onConfirm={handleSaveChanges}
      />
    </>
  );
}