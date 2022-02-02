import { useCallback, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Collapse,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Tooltip,
  Zoom,
  styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useCallback, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';

import styles from './Sidebar.module.css';
import { CONTAINER_SIZES } from '../../../../../utils';

const listStyles = (open) => ({
  marginTop: '24px',
  width: '100%',
  ...(!open && { display: 'none' }),
});

const listItemStyles = {
  paddingLeft: '32px',
  backgroundColor: grey[50],
};

const openedMixin = (theme) => ({
  top: '78px',
  width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  ' ~ .MuiFab-root': {
    left: '300px',
  },
});

const closedMixin = (theme) => ({
  top: '78px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(4)} + 1px)`,
  },
  '&: hover': {
    width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
    ul: {
      display: 'initial !important',
    },
    ' ~ .MuiFab-root': {
      left: '300px',
      pointerEvents: 'none',
    },
  },
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  zIndex: 10,
  boxSizing: 'border-box',
  width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function MenuItem({ page, pathname }) {
  const classMenuItem = page.path === pathname ? styles.menuItem : '';
  const classMenuIcon = page.path === pathname ? styles.icon : '';

  return (
    <ListItem button to={page.path} component={NavLink} className={classMenuItem}>
      <ListItemIcon className={classMenuIcon}>{page.icon}</ListItemIcon>
      <ListItemText primary={page.title} />
    </ListItem>
  );
}

function ExpandableMenuItem({ open, page, expanded, setExpandedState, pathname }) {
  function mouseEnterHandler() {
    if (!open && !expanded[page.collapsibleId]) {
      setExpandedState(page.collapsibleId);
    }
  }

  function itemExpandingHandler() {
    setExpandedState(page.collapsibleId);
  }

  return (
    <>
      <ListItem button onClick={itemExpandingHandler} onMouseEnter={mouseEnterHandler}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.title} />
        {expanded[page.collapsibleId] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expanded[page.collapsibleId]}>
        <List component='div' disablePadding>
          {page.subPages.map(({ title, path }) => {
            const className = pathname.includes(path.split('/')[2])
              ? styles.menuItem
              : '';
            return (
              <ListItem
                button
                to={path}
                key={title}
                sx={listItemStyles}
                pathname={pathname}
                component={NavLink}
                className={className}
              >
                <ListItemText primary={title} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default function Sidebar({ pageConfigs, open, setOpen }) {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState({});
  const openCloseHandler = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open, setOpen]
  );

  const setExpandedState = useCallback(
    (id) => {
      setExpanded({
        ...expanded,
        [id]: !expanded[id],
      });
    },
    [expanded]
  );

  return (
    <Box className={styles.mainBox}>
      <Drawer variant='permanent' anchor='left' open={open} className={styles.drawer}>
        <List style={listStyles(open)}>
          {pageConfigs.map((page) => {
            return page.path ? (
              <MenuItem page={page} key={page.title} pathname={pathname} />
            ) : (
              <ExpandableMenuItem
                open={open}
                page={page}
                key={page.title}
                pathname={pathname}
                expanded={expanded}
                setExpandedState={setExpandedState}
              />
            );
          })}
        </List>
      </Drawer>
      <Tooltip
        placement={'right'}
        TransitionComponent={Zoom}
        title={!open ? 'Expand' : 'Collapse'}
      >
        <Fab onClick={openCloseHandler} color={'inherit'} className={styles.fab}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      </Tooltip>
    </Box>
  );
}
