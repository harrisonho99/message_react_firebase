import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { auth } from '../../services/firebase';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import PeopleIcon from '@material-ui/icons/People';
import Drawer from '../Drawer';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    width: '300px',
  },
  app: {
    zIndex: 10,
    height: 60,
    overflow: 'hidden',
    backgroundColor: '#303f9f',
  },
  Toolbar: {
    height: 60,
  },
}));
const APPNAME = 'Messenger';
function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = React.useState(auth()?.currentUser);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let timeOut;
  const handleClose = (path) => {
    setAnchorEl(null);
    timeOut = new Promise((res, rej) => {
      let clearer = setTimeout(() => {
        props.history.push(path);
        res(clearer);
      }, 400);
    });
    timeOut.then((clear) => {
      window.clearTimeout(clear);
    });
  };
  React.useEffect(() => {
    auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AppBar position='fixed' className={classes.app}>
      <Toolbar className={classes.Toolbar}>
        {user ? (
          <>
            <div className={classes.title}>
              <IconButton color='inherit'>
                <Drawer />
              </IconButton>
            </div>
            <Typography variant='h6' className={classes.title}>
              {user.displayName?.substring(0, 30) ||
                user.email?.substring(0, 30) ||
                APPNAME}
            </Typography>
            <div>
              <IconButton
                color='inherit'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
              >
                <MenuIcon fontSize='large' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                className={classes.menu}
              >
                <MenuItem
                  onClick={() => {
                    handleClose('/');
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose('/chat');
                  }}
                >
                  <ListItemIcon>
                    <ChatIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  Chat
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    if (user) {
                      await auth().signOut();
                      handleClose('/signin');
                    }
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon fontSize='large' color='secondary' />
                  </ListItemIcon>
                  Sign out
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <Typography variant='h6' className={classes.title}>
              {user?.displayName || user?.email || APPNAME}
            </Typography>
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <MenuIcon fontSize='large' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                className={classes.menu}
              >
                <MenuItem
                  onClick={() => {
                    handleClose('/');
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose('/signin');
                  }}
                >
                  <ListItemIcon>
                    <LabelImportantIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  Log In
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose('/signup');
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon fontSize='large' color='primary' />
                  </ListItemIcon>
                  Register
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default withRouter(Header);
