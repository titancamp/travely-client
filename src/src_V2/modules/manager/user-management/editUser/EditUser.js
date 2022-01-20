import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Checkbox } from '@mui/material';
import {
  editAccountInitialValues,
  editAccountValidationSchema,
} from '../../../../utils/schemas/userManagement/userManagement';
import { actionLevels, mockData, resources, mockResourceDescription } from '../mock/data';
import { Grid, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function UserEditContent() {
  const userId = +useParams().userId;

  const userData = mockData['active'].find((user) => user.id === userId); // 'active' will probably be removed

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: editAccountInitialValues({
      name: userData.name,
      email: userData.email,
      position: userData.position,
      phone: userData.phone,
    }),
    validationSchema: editAccountValidationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <div className={clsx(styles['content'])}>
      <Typography className={styles['title']} variant='h5'>
        Edit User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid className={styles['form-fields-wrapper']} container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={'name'}
              label={'Name'}
              error={!!(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              {...getFieldProps('name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              name={'email'}
              label={'Email'}
              {...getFieldProps('email')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={!!(touched.position && errors.position)}
              helperText={touched.position && errors.position}
              name={'position'}
              label={'Position'}
              {...getFieldProps('position')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={!!(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              name={'phone'}
              label={'Phone Number'}
              {...getFieldProps('phone')}
            />
          </Grid>
        </Grid>
        <Typography className={styles['permission-title']} variant='h6'>
          Permissions
        </Typography>
        <Grid container className={styles['permission-wrapper']}>
          <Grid container sx={12} item className={styles['permission-row']}>
            {Object.keys(actionLevels).map((action) => (
              <Grid item xs={1} key={action}>
                <div className={styles['permission-action']}>
                  <Typography variant='body1'>{action}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          {Object.keys(resources).map((resourceKey) => (
            <Grid
              container
              sx={12}
              item
              className={styles['permission-row']}
              key={resourceKey}
            >
              <Grid item xs={1}>
                <div className={styles['permission-action']}>
                  <Checkbox />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div className={styles['permission-action']}>
                  <Checkbox />
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className={styles['resource']}>
                  <Typography className={styles['resource-title']}>
                    {resources[resourceKey]}
                  </Typography>
                  <Typography className={styles['resource-description']} variant='body1'>
                    {mockResourceDescription[resourceKey]}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
}
