import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import {
  changePasswordInitialValues,
  changePasswordValidationSchema,
} from '../../../../utils/schemas/account/account';
import PasswordValidator from '../../../auth/components/passwordValidator/PasswordValidator';

import styles from './styles.module.css';

export default function ChangePasswordDialog({ handleClose, open }) {
  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    initialValues: changePasswordInitialValues(),
    validationSchema: changePasswordValidationSchema(),
  });

  console.log(errors);

  return (
    <Dialog
      classes={{ container: styles['dialog'], paper: styles['paper'] }}
      open={open}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      onClose={handleClose}
    >
      <DialogTitle className={styles['dialog-title']}>Change password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='normal'
          label='Current Password'
          type='password'
          name='oldPassword'
          error={!!(touched.oldPassword && errors.oldPassword)}
          helperText={touched.oldPassword && errors.oldPassword}
          fullWidth
          {...getFieldProps('oldPassword')}
        />
        <TextField
          autoFocus
          margin='normal'
          label='New Password'
          type='password'
          name='newPassword'
          error={!!(touched.newPassword && errors.newPassword)}
          helperText={touched.newPassword && errors.newPassword}
          fullWidth
          {...getFieldProps('newPassword')}
        />
        <TextField
          autoFocus
          margin='normal'
          label='Confirm Password'
          type='password'
          name='confirmNewPassword'
          error={!!(touched.confirmNewPassword && errors.confirmNewPassword)}
          helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          fullWidth
          {...getFieldProps('confirmNewPassword')}
        />
        <PasswordValidator password={getFieldProps('newPassword').value} />
      </DialogContent>
      <DialogActions className={styles['dialog-actions']}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' variant='contained' disableElevation>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
