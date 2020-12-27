import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  title: {
    color: '#3F51B5',
    fontWeight: 600,
    position: 'absolute',
    top: '20%',
    left: '50%',
    zIndex: 40,
    width: '90%',
    maxWidth: 900,
    minWidth: 300,
    transform: 'translate(-50%, -50%)',
    fontSize: '3.2rem',
    userSelect: 'none',
  },
}));
const TexGenerator = ({ title }) => {
  const classes = useStyle();
  let counterLength = 0;
  const [generateTitle, setGenerateTitle] = React.useState('');
  const [appear, setAppear] = React.useState('block');
  const timer = 100;

  React.useEffect(() => {
    setTimeout(() => {
      setAppear('none');
    }, timer * title.length + 2200);
  }, [appear, title.length]);

  React.useEffect(() => {
    if (typeof title === 'string') {
      let interval = 100;
      interval = setInterval(() => {
        if (generateTitle.length < title.length) {
          setGenerateTitle(title.substring(0, ++counterLength));
          console.log('intervals');
        } else {
          clearInterval(interval);
        }
      }, timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Typography
      variant='h1'
      className={classes.title}
      style={{ display: appear }}
    >
      {generateTitle}
    </Typography>
  );
};
export default TexGenerator;
