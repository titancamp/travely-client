import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
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

import { COLORS, CONTAINER_SIZES } from '../../utils/constants';

const boxStyles = {
  position: 'relative',
  display: 'inline-block',
};

const fabStyles = {
  width: '40px',
  height: '40px',
  zIndex: '9999',
  right: '-20px',
  position: 'absolute',
  backgroundColor: COLORS.whiteColor,
};

const listStyles = (open) => ({
  marginTop: '36px',
  ...(!open && { display: 'none' }),
});

const listItemStyles = {
  paddingLeft: '32px',
  backgroundColor: COLORS.lightGrayColor,
};

const openedMixin = (theme) => ({
  top: '85px',
  width: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
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

function MenuItem({ page }) {
  return (
    <ListItem button to={page.path} component={NavLink} key={page.title}>
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText primary={page.title} />
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
          {page.subPages.map(({ title }) => (
            <ListItem button sx={listItemStyles} key={title}>
              <ListItemText primary={title} />
            </ListItem>
          ))}
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
    <Box style={boxStyles}>
      <Tooltip placement={'right'} TransitionComponent={Zoom} title={!open ? 'Expand' : 'Collapse'}>
        <Fab onClick={openCloseHandler} color={'inherit'} sx={fabStyles}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Fab>
      </Tooltip>
      <Drawer variant="permanent" anchor="left" open={open}>
        <List style={listStyles(open)}>
          {pageConfigs.map((page) =>
            page.path ? (
              <MenuItem page={page} key={page.title} />
            ) : (
              <ExpandableMenuItem
                open={open}
                page={page}
                key={page.title}
                expanded={expanded}
                setExpandedState={setExpandedState}
              />
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}
