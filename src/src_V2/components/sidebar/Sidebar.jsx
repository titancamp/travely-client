import { useCallback, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  styled,
  Fab,
  Box,
  List,
  Zoom,
  Tooltip,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
} from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';

import styles from './style.module.css';

import { CONTAINER_SIZES } from '../../utils';

//TODO move styles css module.
const boxStyles = {
  position: 'relative',
  display: 'flex',
};

const fabStyles = {
  width: '40px',
  height: '40px',
  left: '12px',
  zIndex: '9999',
  top: '98px',
  position: 'fixed',
  backgroundColor: common['white'],
  transition: 'left 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
};

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
  top: '85px',
  width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
  ' ~ .MuiFab-root': {
    left: '300px',
  },
});

const closedMixin = (theme) => ({
  top: '85px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
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
      /*svg: {
        transform: 'rotate(180deg)',
      },*/
    },
  },
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
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
          {page.subPages.map(({ title, path }) => (
            <ListItem
              button
              to={path}
              key={title}
              sx={listItemStyles}
              pathname={pathname}
              component={NavLink}
              className={path === pathname ? styles.menuItem : ''}
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default function Sidebar({ pageConfigs, open, setOpen }) {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState({});
  const openCloseHandler = useCallback(() => setOpen(!open), [open, setOpen]);

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
    <Box style={boxStyles}>
      <Drawer variant='permanent' anchor='left' open={open}>
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
        <Fab onClick={openCloseHandler} color={'inherit'} sx={fabStyles}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      </Tooltip>
    </Box>
  );
}
