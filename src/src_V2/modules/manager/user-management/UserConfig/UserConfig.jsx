import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox, Grid, TextField, Typography } from '@mui/material';

import DeactivateDialog from '../DeactivateDialog/DeactivateDialog';
import EditUserActions from '../../../../components/editUserActions';

import {
  resources,
  actionLevels,
  mockUserManagementData,
  mockResourceDescription,
} from '../mock/data';
import styles from './styles.module.css';
import {
  userConfigInitialValues,
  userConfigValidationSchema,
} from '../../../../utils/schemas/userManagement/userManagement';
import { useToggle } from '../../../../utils/hooks';

export default function UserConfigContent({ newUser }) {
  const userId = newUser ? null : +useParams().userId;
  const userData = newUser
    ? {}
    : mockUserManagementData.find((user) => user.id === userId);
  const navigate = useNavigate();

  const submitHandler = (values) => {
    newUser
      ? navigate('/manager/user-management')
      : values.status === 'Inactive'
      ? setFieldValue('status', 'active or pending')
      : console.log(values);
  };

  const {
    dirty,
    values,
    errors,
    touched,
    resetForm,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = useFormik({
    initialValues: userConfigInitialValues(
      newUser
        ? userData
        : {
            name: userData.name,
            email: userData.email,
            position: userData.position,
            phone: userData.phone,
            status: userData.status,
            permissions: userData.permissions,
          }
    ),
    validationSchema: userConfigValidationSchema,
    onSubmit: submitHandler,
  });

  const inactive = values.status === 'Inactive';

  // Deactivate Dialog
  const [isDialogOpen, toggleDialog] = useToggle(false);

  const handleDeactivate = () => {
    resetForm();
    setFieldValue('status', 'Inactive');
  };

  const handlePermissionChange = (checked, resourceKey, currentActionLevel) => {
    let newActionLevel;

    if (checked) {
      if (currentActionLevel === actionLevels.view) {
        newActionLevel = actionLevels.view;
      } else if (currentActionLevel === actionLevels.edit) {
        newActionLevel = actionLevels.view | actionLevels.edit;
      }
    } else {
      if (currentActionLevel === actionLevels.view) {
        newActionLevel = 0;
      } else if (currentActionLevel === actionLevels.edit) {
        newActionLevel = actionLevels.view;
      }
    }

    setFieldValue('permissions', {
      ...values.permissions,
      [resourceKey]: newActionLevel,
    });
  };

  return (
    <div className={styles['content']}>
      <Typography className={styles['title']} variant='h5'>
        {newUser ? 'Add new user' : 'User details'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid className={styles['form-fields-wrapper']} container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={'name'}
              label={'Name'}
              disabled={inactive}
              error={!!(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              {...getFieldProps('name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={'email'}
              label={'Email'}
              disabled={inactive}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              {...getFieldProps('email')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={'position'}
              label={'Position'}
              disabled={inactive}
              error={!!(touched.position && errors.position)}
              helperText={touched.position && errors.position}
              {...getFieldProps('position')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name={'phone'}
              label={'Phone Number'}
              disabled={inactive}
              error={!!(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              {...getFieldProps('phone')}
            />
          </Grid>
        </Grid>
        <Typography className={styles['permission-title']} variant='h6'>
          Permissions
        </Typography>
        <Grid container className={styles['permission-wrapper']}>
          <Grid container xs={12} item className={styles['permission-row']}>
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
              xs={12}
              item
              className={styles['permission-row']}
              key={resourceKey}
            >
              {Object.values(actionLevels).map((actionLevel) => (
                <Grid item xs={1} key={actionLevel}>
                  <div className={styles['permission-action']}>
                    <Checkbox
                      name={`permissions.${resourceKey}`}
                      disabled={inactive}
                      onChange={(event) =>
                        handlePermissionChange(
                          event.target.checked,
                          resourceKey,
                          actionLevel
                        )
                      }
                      checked={!!(values.permissions[resourceKey] & actionLevel)}
                    />
                  </div>
                </Grid>
              ))}
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
        <EditUserActions
          disabled={!dirty && !newUser && !inactive}
          allowDeactivate={!inactive && !newUser}
          toggleDialog={toggleDialog}
          onCancel={() => navigate('/manager/user-management')}
          submitButtonText={
            newUser ? 'Add New User' : inactive ? 'Activate User' : 'Save Changes'
          }
        />
      </form>
      <DeactivateDialog
        open={isDialogOpen}
        userName={values.name}
        toggleDialog={toggleDialog}
        handleDeactivate={handleDeactivate}
      />
    </div>
  );
}
