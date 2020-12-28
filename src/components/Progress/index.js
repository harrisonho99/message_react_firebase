import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  large: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  small: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mallIcon: {
    animationDuration: '1s',
  },
}));

export default function LargeProgress() {
  const classes = useStyles();

  return (
    <div className={classes.large}>
      <CircularProgress size={50} color='secondary' variant='indeterminate' />
    </div>
  );
}
export function SmallProgress() {
  const classes = useStyles();

  return (
    <div className={classes.small}>
      <CircularProgress
        className={classes.mallIcon}
        size={30}
        color='secondary'
        variant='indeterminate'
        thickness={4}
      />
    </div>
  );
}
