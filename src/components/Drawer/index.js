import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Typography, IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles({
  listWrapper: {
    width: 270,
    padding: '0 0 20px 0',
    height: '100%',
  },
  list: {
    height: '50%',
  },
  fullList: {
    width: 'auto',
  },
  listItems: {
    height: 70,
  },
  textWrapper: {
    width: 'inherit',
    height: '50%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  textInfo: {
    wordBreak: 'break-word',
    width: '100%',
    fontWeight: 300,
    textAlign: 'left',
    fontSize: '0.9rem',
    padding: '0 0 0 10px',
  },
  twitter: {
    color: 'rgb(29,161,242)',
  },
  facebook: {
    color: 'rgb(2,106,227)',
  },
  github: {
    color: 'rgb(36,41,46)',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(state);
  };

  const list = () => (
    <div
      className={classes.listWrapper}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.list}>
        <ListItem button className={classes.listItems}>
          <ListItemIcon>
            <PersonAddIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary={'ADD EMAIL'} />
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItems}>
          <ListItemIcon>
            <PersonPinIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary={'MY PROFILE'} />
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItems}>
          <ListItemIcon>
            <InfoIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary={'ABOUT THIS APP'} />
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItems}>
          <ListItemIcon>
            <SettingsIcon fontSize='large' />
          </ListItemIcon>
          <ListItemText primary={'SETTING'} />
        </ListItem>
        <Divider />
      </List>
      <div className={classes.textWrapper}>
        <Typography variant='h6' className={classes.textInfo}>
          This app created for test purpose.
          <div>
            My info:
            <IconButton
              aria-label='delete'
              className={classes.margin}
              size='medium'
              href='https://twitter.com/Harisson_ho'
            >
              <TwitterIcon
                fontSize='large'
                color='primary'
                className={classes.twitter}
              />
            </IconButton>
            <IconButton
              aria-label='delete'
              className={classes.margin}
              size='medium'
              href='https://www.facebook.com/hotsnow199/'
            >
              <FacebookIcon
                fontSize='large'
                color='primary'
                className={classes.facebook}
              />
            </IconButton>
            <IconButton
              aria-label='delete'
              className={classes.margin}
              size='medium'
              href='https://github.com/hotsnow199'
            >
              <GitHubIcon
                fontSize='large'
                color='primary'
                className={classes.github}
              />
            </IconButton>
          </div>
        </Typography>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <LibraryAddIcon fontSize='large' onClick={toggleDrawer(true)} />
        <Drawer open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
