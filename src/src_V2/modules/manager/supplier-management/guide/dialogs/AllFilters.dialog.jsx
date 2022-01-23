import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  Autocomplete,
  DialogContent,
} from '@mui/material';
import styles from './style.module.css';
import { Languages } from '../constants';
import {
  FilterGuideSchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/guide';
import { useFormik } from 'formik';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: 830,
    width: 830,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: 30,
    paddingBottom: 50,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, handleReset, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <div className={styles.filterHeader}>
          <div>
            <Button className={styles.resetBtn} onClick={handleReset}>
              RESET
            </Button>
          </div>
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  handleReset: PropTypes.func,
};

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: FilterGuideSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues({
      skills: '',
      languages: [],
      cost: '',
      experience: '',
    });
  };

  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open}>
        <BootstrapDialogTitle
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
          handleReset={handleReset}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid container rowSpacing={3} className={styles.langSkillsBlock}>
            <Grid item xs={10}>
              <Autocomplete
                multiple
                options={Languages}
                value={values.languages}
                onChange={autoCompleteChangeHandler('languages')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='languages'
                    label='Languages'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.languages}
                    error={errors.languages && touched.languages}
                    helperText={touched.languages && errors.languages}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                name='skills'
                label='Skills'
                value={values.skills}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.skills && touched.skills}
                helperText={touched.skills && errors.skills}
              />
            </Grid>
          </Grid>
          <Grid container rowSpacing={3}>
            <Grid item xs={2.5} className={styles.costInput}>
              <TextField
                fullWidth
                name='cost'
                label='Cost'
                value={values.cost}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.cost && touched.cost}
                helperText={touched.cost && errors.cost}
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                fullWidth
                name='experience'
                label='Experience'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                error={errors.experience && touched.experience}
                helperText={touched.experience && errors.experience}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
