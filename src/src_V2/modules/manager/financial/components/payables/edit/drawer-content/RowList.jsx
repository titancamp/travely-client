import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import GeneralInfo from './general-info/GeneralInfo';
import EditableInfo from './editable-info/EditableInfo';
import TourDetails from './tour-details/TourDetails';
import PaymentHistory from './payment-history/PaymentHistory';
import Notes from './notes/Notes';
import styles from './RowList.module.css';

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
          <GeneralInfo values={values} row={row} />
        </Box>

        <Box className={styles.layoutDistance}>
          <EditableInfo
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            currency={row.currency}
          />
        </Box>

        <Box className={styles.layoutDistance}>
          <TourDetails row={row} />
        </Box>

        <Box className={styles.layoutDistance}>
          <PaymentHistory history={row.paymentHistory} />
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
