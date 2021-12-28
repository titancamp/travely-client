import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './style.module.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 10,
    right: 10,
    margin: 'inherit',
    maxWidth: 900,
    width: 900,
    height: 1180,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
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
        <div>
          <EditIcon className={styles.headerActions} />
          <DeleteIcon className={`${styles.headerDeleteBtn} ${styles.headerActions}`} />
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
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

export default function AccomodationDetailsDialog({ open, handleClose }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <BootstrapDialogTitle
        id='customized-dialog-title'
        onClose={handleClose}
        className={`${styles.container} ${styles.header}`}
      >
        Agency / Agency Name Example
      </BootstrapDialogTitle>
      <DialogContent dividers className={styles.container}>
        <Box className={styles.dialogMenu}>
          <TabContext value={value}>
            <Box className={styles.test} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='MAIN INFO' value='1' />
                <Tab label='ROOMS' value='2' />
                <Tab label='PARTNERSHIP' value='3' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <LocationOnIcon className={styles.detailsIcon} />
                  <Typography>Address</Typography>
                </Grid>
                <Typography>
                  4/1, Tandzaghpyur Street 2, Tsaghkadzor 2310 / Tsaghkadzor / Kotayq{' '}
                </Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <LocalPhoneIcon className={styles.detailsIcon} />
                  <Typography>Phone</Typography>
                </Grid>
                <Typography> +374 11 11 11 11 </Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <PersonIcon className={styles.detailsIcon} />
                  <Typography>Contact Person</Typography>
                </Grid>
                <Typography>John Doe</Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <EmailIcon className={styles.detailsIcon} />
                  <Typography>Email</Typography>
                </Grid>
                <Typography>customer.care@marriott.com</Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <AccessTimeIcon className={styles.detailsIcon} />
                  <Typography>Check In / Check Out</Typography>
                </Grid>
                <Typography>12:00 / 2:00</Typography>
              </Grid>
              <Grid className={styles.dashedBorder} />
              <Typography className={styles.roomTitle}>SERVICES</Typography>
              <Typography>
                Breakfast / Free Wifi / Room service / Hearing accessible / Accessible
                room
              </Typography>
              <Grid className={styles.dashedBorder} />
              <Typography className={styles.roomTitle}>NOTES</Typography>
              <Typography>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt nostrud amet.
              </Typography>
            </TabPanel>
            <TabPanel className={styles.roomsTabPanel} value='2'>
              <Grid className={styles.roomsSection}>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography className={styles.cardQuantity}>Qty: 24</Typography>
                    <Typography className={styles.cardTitle}>Standard Single</Typography>
                    <Typography className={styles.cardBeds}>Beds: 2 (+1)</Typography>
                    <Typography className={styles.cardPrice}>30 000 AMD</Typography>
                  </CardContent>
                  <Box className={styles.cardActions}>
                    <Button className={styles.cardDetailsBtn}>SEE DETAILS</Button>
                  </Box>
                </Card>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography className={styles.cardQuantity}>Qty: 24</Typography>
                    <Typography className={styles.cardTitle}>Standard Single</Typography>
                    <Typography className={styles.cardBeds}>Beds: 2 (+1)</Typography>
                    <Typography className={styles.cardPrice}>30 000 AMD</Typography>
                  </CardContent>
                  <Box className={styles.cardActions}>
                    <Button className={styles.cardDetailsBtn}>SEE DETAILS</Button>
                  </Box>
                </Card>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography className={styles.cardQuantity}>Qty: 24</Typography>
                    <Typography className={styles.cardTitle}>Standard Single</Typography>
                    <Typography className={styles.cardBeds}>Beds: 2 (+1)</Typography>
                    <Typography className={styles.cardPrice}>30 000 AMD</Typography>
                  </CardContent>
                  <Box className={styles.cardActions}>
                    <Button className={styles.cardDetailsBtn}>SEE DETAILS</Button>
                  </Box>
                </Card>
                <Card className={styles.card}>
                  <CardContent>
                    <Typography className={styles.cardQuantity}>Qty: 24</Typography>
                    <Typography className={styles.cardTitle}>Standard Single</Typography>
                    <Typography className={styles.cardBeds}>Beds: 2 (+1)</Typography>
                    <Typography className={styles.cardPrice}>30 000 AMD</Typography>
                  </CardContent>
                  <Box className={styles.cardActions}>
                    <Button className={styles.cardDetailsBtn}>SEE DETAILS</Button>
                  </Box>
                </Card>
              </Grid>
            </TabPanel>
            <TabPanel value='3'>Item Three</TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
