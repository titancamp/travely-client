import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../routes';
import styles from './header.module.css';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    bgColor: theme.palette.secondary.main,
    borderRadius: 0,
    marginTop: 17,
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.userAvatarSection}>
      <Button
        id='demo-customized-button'
        aria-controls='demo-customized-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        color='inherit'
        className={styles.userSection}
      >
        <Avatar className={styles.avatar}>TM</Avatar>
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate('/manager/' + ROUTES.ACCOUNT);
            handleClose();
          }}
          disableRipple
        >
          Settings & Privacy
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Help
        </MenuItem>
        <MenuItem onClick={() => navigate('/')} disableRipple>
          Log out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
