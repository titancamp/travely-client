import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button } from '@mui/material';
import { useState } from 'react';

import styles from './RowList.module.css';
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

export default function RowList({ row, rowEditForm, onClose, onSave }) {
  // not using context due to future replacement of redux
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = rowEditForm;
  const [fileError, setFileError] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      {/*Header*/}
      <Box className={styles.mainBox}>
        <div className={styles.textDiv}>
          <div className={`${styles.payableId} ${styles.mainText}`}>
            Payable ID: {row.payableId}
          </div>
          <div className={styles.supplierName}>Supplier Name: {row.supplier}</div>
        </div>
        <div className={styles.closeBtnDiv}>
          <CloseIcon onClick={onClose} className={styles.closeBtn} />
        </div>
      </Box>

      {/*Layout*/}
      <Box className={styles.layout}>
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
      </Box>

      {/*File Error*/}
      {fileError && <FileError errorMessage={fileError} setError={setFileError} />}

      {/*Footer*/}
      <Box className={`${styles.mainBox} ${styles.footerBox}`}>
        <div className={styles.btnDiv}>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.saveBtn} onClick={onSave} variant='contained'>
            Save
          </Button>
        </div>
      </Box>
    </form>
  );
}
