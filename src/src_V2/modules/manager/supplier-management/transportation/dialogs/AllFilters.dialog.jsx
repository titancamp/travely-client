import PropTypes from 'prop-types';
import { useFormik } from 'formik';
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
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  FormHelperText,
} from '@mui/material';
import styles from './style.module.css';
import { Languages, License } from '../constants';
import { EndAdornment } from '../../components/endAdornment';
import { AirlineSeatReclineNormal, EventSeat } from '@mui/icons-material';
import {
  FilterInitialValues,
  TransportationFiltersSchema,
} from '../../../../../utils/schemas/tourManagment/transportation';

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
    validationSchema: TransportationFiltersSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues({
      model: '',
      seats: '',
      carSeats: '',
      license: [],
      languages: [],
    });
  };

  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open}>
        <BootstrapDialogTitle
          handleReset={handleReset}
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid item xs={4}>
            <Autocomplete
              className={styles.input}
              multiple
              options={License}
              value={values.license}
              onChange={autoCompleteChangeHandler('license')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='license'
                  label='License Type'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.license && touched.license}
                  helperText={touched.license && errors.license}
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
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
          <Grid className={styles.dashedBorder} />
          <Typography className={styles.roomTitle}>CARS</Typography>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name='model'
              label='Model'
              className={styles.input}
              placeholder='Plate Number'
              onBlur={handleBlur}
              value={values.model}
              onChange={handleChange}
              error={errors.model && touched.model}
              helperText={touched.model && errors.model}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel error={errors.seats && touched.seats}>
                  Number of Seats
                </InputLabel>
                <OutlinedInput
                  name='seats'
                  onBlur={handleBlur}
                  value={values.seats}
                  label='Number of Seats'
                  onChange={handleChange}
                  error={errors.seats && touched.seats}
                  endAdornment={<EndAdornment icon={<EventSeat />} />}
                />
                {errors.seats && touched.seats && (
                  <FormHelperText error>{errors.seats}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel error={errors.carSeats && touched.carSeats}>
                  Number of Car Seats
                </InputLabel>
                <OutlinedInput
                  name='carSeats'
                  onBlur={handleBlur}
                  value={values.carSeats}
                  label='Number of Car Seats'
                  onChange={handleChange}
                  error={errors.carSeats && touched.carSeats}
                  endAdornment={<EndAdornment icon={<AirlineSeatReclineNormal />} />}
                />
                {errors.carSeats && touched.carSeats && (
                  <FormHelperText error>{errors.carSeats}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
