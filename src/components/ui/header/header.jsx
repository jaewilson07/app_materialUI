import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { HEADER } from '../../../constants';
import logo from '../../../assets/Netflix_logo.svg';

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    height: '7rem',
    [theme.breakpoints.down('md')]: { height: '6rem' },
    [theme.breakpoints.down('xs')]: { height: '5.5rem' },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': { opacity: 1 },
  },

  drawer: {
    backgroundColor: theme.palette.common.blue,
  },

  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    color: 'white',
  },

  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },

  drawerItemButton: {
    backgroundColor: theme.palette.common.orange,
  },

  drawerIconContainer: {
    marginLeft: 'auto',
    marginRight: '20px',

    '&:hover': { backgroundColor: 'transparent' },
  },
  drawerIcon: {
    fontSize: '3rem',
    [theme.breakpoints.down('xs')]: { height: '2rem' },
  },

  logo: {
    height: '7rem',
    [theme.breakpoints.down('md')]: { height: '6rem' },
    [theme.breakpoints.down('xs')]: { height: '5.5rem' },
  },
  logoContainer: {
    marginLeft: '20px',
    padding: 0,
    '&:hover': { backgroundColor: 'transparent' },
  },

  tabContainer: {
    marginLeft: 'auto',
  },

  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },

  tab_button: {
    ...theme.typography.estimate,
    color: theme.palette.common.orange,
    minWidth: 10,
    marginRight: '50px',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

//  --------   Header Function ------- //
const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  // for responsiveDesign
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [tabValue, setTabValue] = useState(0);
  const [menuValue, setMenuValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // find index of HEADER object that matches browser URL.
    const currentUrl = HEADER.filter(
      (header) => header.headerTab || header.headerButton
    ).findIndex(
      (header) =>
        header.path === window.location.pathname ||
        header.path === `/${window.location.pathname.split('/')[1]}`
    );
    if (tabValue !== currentUrl && currentUrl !== -1) {
      setTabValue(currentUrl);
    }

    if (tabValue !== currentUrl && currentUrl === -1) {
      setTabValue(false);
    }

    // set menu selection based on browser url
    const currentMenu = HEADER.filter(
      (header) => header.menuItem === 'services-menu'
    ).findIndex((header) => header.path === window.location.pathname);

    if (menuValue !== currentMenu && currentMenu !== -1) {
      setMenuValue(currentMenu);
    }

    if (menuValue !== currentMenu && currentMenu === -1) {
      setMenuValue(null);
    }
  }, [tabValue, menuValue]);

  // tell anchor element where to render the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const tabs = (
    <React.Fragment>
      {/* scrollable list of tabs */}
      <Tabs
        className={classes.tabContainer}
        variant="scrollable"
        aria-label="scrollable"
        value={tabValue}
        onChange={(event, value) => setTabValue(value)}
        indicatorColor="primary"
      >
        {/* define the tabs and assign services-menu to the services tab */}
        {HEADER.filter(
          (heading) => heading.headerTab || heading.headerButton
        ).map((heading, index) => (
          <Tab
            key={index}
            aria-owns={
              heading.title === 'Services' && anchorEl
                ? 'services-menu'
                : undefined
            }
            aria-haspopup={
              heading.title === 'Services' && anchorEl ? 'true' : undefined
            }
            onMouseOver={(event) => {
              if (heading.title === 'Services') {
                handleMenuOpen(event);
              }
            }}
            className={heading.headerButton ? classes.tab_button : classes.tab}
            label={heading.title}
            component={Link}
            to={heading.path}
          />
        ))}
      </Tabs>

      {/* define the free estimate button
      {HEADER.filter((heading) => heading.headerButton).map(
        (heading, index) => (
          <Button
            key={index}
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={heading.path}
            onClick={() => {
              setTabValue(false);
              setMenuValue(null);
            }}
          >
            {heading.title}
          </Button>
        )
      )} */}

      {/* define the dropdown menu */}
      <Menu
        id="services-menu"
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ onMouseLeave: handleMenuClose }}
        elevation={0}
        style={{ zIndex: theme.zIndex.modal + 2 }}
        // for search engine optimization
        keepMounted
      >
        {HEADER.filter((header) => header.menuItem === 'services-menu').map(
          (option, index) => (
            <MenuItem
              key={index}
              selected={index === menuValue}
              classes={{ root: classes.menuItem }}
              onClick={(event) => {
                handleMenuClose();
                setMenuValue(index);
              }}
              component={Link}
              to={option.path}
            >
              {option.title}
            </MenuItem>
          )
        )}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={!iOS}
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          {HEADER.filter(
            (heading) => heading.headerTab || heading.headerButton
          ).map((heading, index) => (
            <ListItem
              className={`${
                heading.headerButton ? classes.drawerItemButton : ''
              } `}
              classes={{ selected: classes.drawerItemSelected }}
              selected={index === tabValue}
              key={index}
              component={Link}
              to={heading.path}
              divider
              button
              onClick={() => {
                setDrawerOpen(false);
                setTabValue(index);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {heading.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setDrawerOpen(!drawerOpen)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            {/* Logo */}
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setTabValue(0)}
              disableRipple
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
