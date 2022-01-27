import { Close, Delete, Edit, Hotel, Search } from '@mui/icons-material';
import {
  DialogContent,
  IconButton,
  DialogTitle as MUIDialogTitle,
  TextField,
  Typography,
} from '@mui/material';

const DialogTitle = ({ onClose }) => {
  return (
    <MUIDialogTitle
      sx={{
        pt: 3.5,
        pr: 1.5,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ marginTop: 2 }}>
          <Hotel />
        </div>
        <Typography variant={'h5'} style={{ marginLeft: 13, display: 'inline' }}>
          Accommodation
        </Typography>
      </div>
      <IconButton component='span' onClick={onClose}>
        <Close />
      </IconButton>
    </MUIDialogTitle>
  );
};

export default function AccommodationDetailsDialog({ onClose, data: { open, actions } }) {
  return (
    <>
      <DialogTitle onClose={onClose} />
      <DialogContent sx={{}}>
        <TextField
          fullWidth
          size='small'
          name='search'
          variant='outlined'
          placeholder='Search'
          InputProps={{
            startAdornment: <Search position='start' color={'action'} sx={{ mr: 1 }} />,
          }}
        />
      </DialogContent>
    </>
  );
}
