import { Dialog, styled } from '@mui/material';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    width: 680,
    height: 190,
    borderRadius: 6,
    borderLeft: '4px solid #2183D1',
  },
  // mt: 2, pl: 3.5, pr: 3.5
  '& .MuiDialogContent-root': {
    // marginTop: theme.spacing(2),
    // paddingLeft: theme.spacing(3.5),
    // paddingRight: theme.spacing(3.5),
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(1),
  },
}));
