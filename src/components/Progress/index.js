import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={50} color='secondary' variant='indeterminate' />
    </div>
  );
}
