import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  FormControlLabel,
  IconButton,
  Radio,
  Typography,
  styled,
} from '@mui/material';

const BootstrapCardContent = styled(CardContent)(
  () => `
  &:last-child {
      padding-bottom: 16px; 
   } `
);

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    width: 680,
    height: 1090,
    borderRadius: 6,
    borderLeft: '4px solid #2183D1',
  },
  '& .MuiDialogContent-root': {
    height: 750,
  },
  '& .MuiDialogActions-root': {
    height: 80,
    padding: '0 30px',
    borderTop: 1,
    boxShadow: '0px 0px 0px 1px #E0E0E0',
  },
  '& .MuiDialogTitle-root': {
    display: 'flex',
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(3.5),
    paddingRight: theme.spacing(1.5),
  },
}));

export const CardItem = ({ expanded, data, action }) => {
  function expandCollapse() {
    action(expanded === data.id ? 0 : data.id);
  }

  return (
    <Card sx={{ mt: 1 }}>
      <BootstrapCardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex' }}>
            <FormControlLabel control={<Radio />} label='' value={data.id} />
            <div>
              <Typography variant='h6'>{data.title}</Typography>
              <Typography
                variant='body2'
                style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400 }}
              >
                {data.subTitle}
              </Typography>
            </div>
          </div>
          <div style={{ marginTop: 4 }}>
            <IconButton component='span' onClick={expandCollapse}>
              <KeyboardArrowDown />
            </IconButton>
          </div>
        </div>
      </BootstrapCardContent>
    </Card>
  );
};

export const DetailsHeaderItem = ({ Icon, title, content }) => {
  return (
    <div style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <Icon fontSize='' sx={{ mr: 1.5, mt: 0.1 }} />
        <Typography
          variant='body2'
          style={{ color: 'rgba(0, 0, 0, 0.9)', fontWeight: 400, fontSize: 14 }}
        >
          {title}
        </Typography>
      </div>
      <Typography
        variant='body2'
        style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 400, marginTop: 6 }}
      >
        {content}
      </Typography>
    </div>
  );
};

export const DialogAction = ({ show, disabled, onClose, newEvent }) => {
  return (
    <DialogActions>
      {show && (
        <>
          <Button type='reset' onClick={onClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={newEvent}
            disabled={disabled}
          >
            Save
          </Button>
        </>
      )}
    </DialogActions>
  );
};
