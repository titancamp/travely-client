import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CompanyInfo from './companyInfo';
import ImgPlaceholder from './imgPlaceholder';
import ChangePasswordDialog from './changePasswordDialog';
import PageWrapper from '../../../components/userPageWrapper';
import EditUserActions from '../../../components/editUserActions';

import { ROUTES } from '../routes';
import styles from './styles.module.css';
import { getBase64 } from '../../../utils';
import { accountMockData } from './mock/data';
import {
  accountIntialValues,
  accountValidationSchema,
} from '../../../utils/schemas/account/account';

function AccountContent() {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({});

  const submitHandler = () => {
    navigate('/manager/' + ROUTES.DASHBOARD);
  };

  const formikData = {
    initialValues: accountIntialValues(initialData),
    validationSchema: accountValidationSchema(),
    onSubmit: submitHandler,
    enableReinitialize: true,
  };

  useEffect(() => {
    // TODO: Change later with async request
    setInitialData(accountMockData);
  }, []);

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } =
    useFormik(formikData);

  const handleFileUpload = (e) => {
    if (e.currentTarget.files[0]) {
      getBase64(e.currentTarget.files[0]).then((res) => {
        setFieldValue('companyLogo', res);
      });
    }
  };

  const [searchParams] = useSearchParams();

  const isUser = Boolean(searchParams.get('isUser'));

  // Change password dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PageWrapper actionsVisible={!isUser}>
        <div className={styles['content']}>
          <Typography className={styles['title']} variant='h6'>
            My Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid className={styles['form-wrapper']} container spacing={5}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name={'name'}
                  label={'Name'}
                  error={!!(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  {...getFieldProps('name')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name={'position'}
                  label={'Position'}
                  error={!!(touched.position && errors.position)}
                  helperText={touched.position && errors.position}
                  {...getFieldProps('position')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name={'email'}
                  label={'Email'}
                  error={!!(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  disabled
                  inputProps={{
                    type: 'email',
                  }}
                  {...getFieldProps('email')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name={'phone'}
                  label={'Phone number'}
                  error={!!(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  {...getFieldProps('phone')}
                  // InputProps={{ startAdornment: '+374' }}
                />
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={4}>
                <Button onClick={() => handleOpen()} fullWidth variant='outlined'>
                  Change Password
                </Button>
              </Grid>
            </Grid>
            {!isUser && (
              <>
                <Divider className={styles['divider']} />
                <Typography className={styles['title']} variant='h6'>
                  Agency information
                </Typography>
                <Grid className={styles['form-wrapper']} container spacing={5}>
                  <Grid item xs={4}>
                    <Box position='relative'>
                      <ImgPlaceholder
                        width='100%'
                        height={152}
                        img={values.companyLogo}
                      />
                      <label
                        className={styles['uploadBtn-wrapper']}
                        htmlFor='agency-logo'
                      >
                        <input
                          style={{ display: 'none' }}
                          accept='image/*'
                          id='agency-logo'
                          name='agencyLogo'
                          type='file'
                          onChange={handleFileUpload}
                        />
                        <IconButton
                          className={styles['uploadBtn']}
                          aria-label='upload picture'
                          component='span'
                        >
                          <FileUploadIcon />
                        </IconButton>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={5}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name={'companyName'}
                          label={'Name'}
                          error={!!(touched.companyName && errors.companyName)}
                          helperText={touched.companyName && errors.companyName}
                          {...getFieldProps('companyName')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name={'companyEmail'}
                          label={'Email'}
                          error={!!(touched.companyEmail && errors.companyEmail)}
                          helperText={touched.companyEmail && errors.companyEmail}
                          inputProps={{
                            type: 'email',
                          }}
                          {...getFieldProps('companyEmail')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name={'companyPhone'}
                          label={'Phone number'}
                          error={!!(touched.companyPhone && errors.companyPhone)}
                          helperText={touched.companyPhone && errors.companyPhone}
                          {...getFieldProps('companyPhone')}
                          // InputProps={{ startAdornment: '+374' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name={'companyAddress'}
                          label={'Address'}
                          error={!!(touched.companyAddress && errors.companyAddress)}
                          helperText={touched.companyAddress && errors.companyAddress}
                          {...getFieldProps('companyAddress')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <EditUserActions />
              </>
            )}
          </form>
          {isUser && (
            <CompanyInfo
              name={values.companyName}
              address={values.companyAddress}
              email={values.companyEmail}
              phone={values.companyPhone}
              logo={values.companyLogo}
            />
          )}
        </div>
      </PageWrapper>
      <ChangePasswordDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default function Account() {
  return <AccountContent />;
}
