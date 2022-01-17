import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { Container } from '../../../components';
import EditActions from './editActions';
import CompanyInfo from './companyInfo';
import ImgPlaceholder from './imgPlaceholder';
import ResetPasswordDialog from './resetPasswordDialog';

import { managerSidebarConfig } from '../config';
import styles from './styles.module.css';
import { getBase64 } from '../../../utils';
import {
  accountIntialValues,
  accountValidationSchema,
} from '../../../utils/schemas/account/account';
import { ROUTES } from '../routes';
import { accountMockData } from './mock/data';
import PageWrapper from './pageWrapper';

function AccountContent() {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState({});

  const submitHandler = () => {
    navigate('/' + ROUTES.DASHBOARD);
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

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik(formikData);

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
        <div className={clsx(styles['content'])}>
          <Typography className={styles['title']} variant='h6'>
            My Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid className={styles['form-wrapper']} container spacing={5}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  error={!!(touched.name && errors.name)}
                  name={'name'}
                  label={'Name'}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  value={values.position}
                  onChange={handleChange}
                  error={!!(touched.position && errors.position)}
                  name={'position'}
                  label={'Position'}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={!!(touched.email && errors.email)}
                  name={'email'}
                  label={'Email'}
                  disabled
                  inputProps={{
                    type: 'email',
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  value={values.phone}
                  onChange={handleChange}
                  error={!!(touched.phone && errors.phone)}
                  name={'phone'}
                  label={'Phone number'}
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
                          onChange={(event) => {
                            getBase64(event.currentTarget.files[0]).then((res) => {
                              setFieldValue('companyLogo', res);
                            });
                          }}
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
                          value={values.companyName}
                          onChange={handleChange}
                          error={!!(touched.companyName && errors.companyName)}
                          name={'companyName'}
                          label={'Name'}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          value={values.companyEmail}
                          onChange={handleChange}
                          error={!!(touched.companyEmail && errors.companyEmail)}
                          name={'companyEmail'}
                          label={'Email'}
                          inputProps={{
                            type: 'email',
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          value={values.companyPhone}
                          onChange={handleChange}
                          error={!!(touched.companyPhone && errors.companyPhone)}
                          name={'companyPhone'}
                          label={'Phone number'}
                          // InputProps={{ startAdornment: '+374' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          value={values.companyAddress}
                          onChange={handleChange}
                          error={!!(touched.companyAddress && errors.companyAddress)}
                          name={'companyAddress'}
                          label={'Address'}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <EditActions />
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
      <ResetPasswordDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default function Account() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <AccountContent />
    </Container>
  );
}
