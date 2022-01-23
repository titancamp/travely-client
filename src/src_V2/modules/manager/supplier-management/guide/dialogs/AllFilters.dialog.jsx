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
  const { children, onClose, ...other } = props;

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
};

const handleReset = () => {
  //TODO reset form values
};

export default function AllFiltersDialog({ onClose, data: { open } }) {
  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open}>
        <BootstrapDialogTitle
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid container rowSpacing={3} className={styles.langSkillsBlock}>
            <Grid item xs={10}>
              <Autocomplete
                className={styles.input}
                multiple
                options={Languages}
                name='languages'
                renderInput={(params) => (
                  <TextField {...params} name='languages' label='Languages' />
                )}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField fullWidth name='skills' label='Skills' />
            </Grid>
          </Grid>
          <Grid container rowSpacing={3}>
            <Grid item xs={2.5} className={styles.costInput}>
              <TextField fullWidth name='cost' label='Cost' />
            </Grid>
            <Grid item xs={2.5}>
              <TextField fullWidth name='experience' label='Experience' />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
