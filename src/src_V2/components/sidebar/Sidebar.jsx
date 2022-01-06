import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

import { CONTAINER_SIZES } from '../../utils';
import styles from './Sidebar.module.css';

const listStyles = (open) => ({
  marginTop: '28px',
  ...(!open && { display: 'none' }),
});

const openedMixin = (theme) => ({
  position: 'relative',
  width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  position: 'relative',
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

function MenuItem({ page, selected }) {
  const color = selected && blue[700];

  return (
    <ListItem button to={page.path} component={NavLink} selected={selected}>
      <ListItemIcon sx={{ color }}>{page.icon}</ListItemIcon>
      <ListItemText sx={{ color }} primary={page.title} />
    </ListItem>
  );
}

function ExpandableMenuItem({ open, page, expanded, setExpandedState }) {
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
        <List component="div" disablePadding>
          {page.subPages.map(({ title, path }) => {
            const selected = path === location.pathname;
            const color = selected && blue[700];

            return (
              <ListItem
                button
                className={styles.subListItem}
                to={path}
                key={title}
                component={NavLink}
                selected={selected}
              >
                <ListItemText primary={title} sx={{ color }} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export default function Sidebar({ pageConfigs, open, setOpen }) {
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
    <Box className={styles.mainBox}>
      <Tooltip placement={'right'} TransitionComponent={Zoom} title={!open ? 'Expand' : 'Collapse'}>
        <Fab onClick={openCloseHandler} className={styles.fabToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      </Tooltip>
      <Drawer variant="permanent" anchor="left" open={open} className={styles.drawer}>
        <List style={listStyles(open)}>
          {pageConfigs.map((page) => {
            const selected = page.path === location.pathname;

            return page.path ? (
              <MenuItem page={page} key={page.title} selected={selected} />
            ) : (
              <ExpandableMenuItem
                open={open}
                page={page}
                key={page.title}
                expanded={expanded}
                setExpandedState={setExpandedState}
              />
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
