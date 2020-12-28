import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './me.css';
import timeConverter from '../../helpers/timeConveter';

const useStyles = makeStyles({
  rootRight: {
    boxShadow: '2px 5px 6px 2px rgba(63,81,181,0.3)',
    display: 'block',
    minWidth: 20,
    margin: '10px 12px 4px 0px ',
    width: 'fit-content',
    maxWidth: '65%',
    float: 'right',
    padding: '0 0.8rem ',
    height: 'auto',
    background: 'rgba(126, 87, 240,0.8)',
    color: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 3,
  },
  rootLeft: {
    boxShadow: '0px 4px 3px -2px rgba(0,0,0,0.1)',
    display: 'block',
    minWidth: 20,
    margin: '10px 0px 6px 12px ',
    width: 'fit-content',
    maxWidth: '65%',
    float: 'right',
    padding: '0 0.8rem',
    height: 'auto',
    background: '#E4E6EB',
    color: '#050505',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 24,
  },
  cardContent: {
    height: 'auto',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0.8rem 0.8rem 0.8rem !important',
  },
  textContent: {
    width: 'fit-content',
    wordBreak: 'break-word',
    fontSize: '1.3rem',
    fontWeight: 400,
    textAlign: 'left',
  },
  nameRight: {
    textAlign: 'center',
    margin: 0,
    padding: 0,
    fontSize: '0.8rem',
    color: 'white',
    fontWeight: 300,
  },
  nameLeft: {
    textAlign: 'center',
    margin: 0,
    padding: 0,
    fontSize: '0.8rem',
    color: 'gray',
    fontWeight: 300,
  },
});

const ForwardMeCard = React.forwardRef((props, ref) =>
  (function MeCard() {
    const { textContent, timestamp, uid, currentUid, name } = props;
    const classes = useStyles();

    return uid === currentUid ? (
      <div className='message-wrapper-right' ref={ref}>
        <Card className={classes.rootRight}>
          <Typography className={classes.nameRight}>
            {name && name.length > 9 ? name.substring(0, 9) + '...' : name}
          </Typography>
          <CardContent className={classes.cardContent}>
            <Typography variant='h6' className={classes.textContent}>
              {textContent}
            </Typography>
          </CardContent>
        </Card>
        <div className='time-right'> {timeConverter(timestamp)}</div>
      </div>
    ) : (
      <div className='message-wrapper-left' ref={ref}>
        <Card className={classes.rootLeft}>
          <Typography className={classes.nameLeft}>
            {name && name.length > 9 ? name.substring(0, 9) + '...' : name}
          </Typography>
          <CardContent className={classes.cardContent}>
            <Typography
              variant='h5'
              component='h4'
              className={classes.textContent}
            >
              {textContent}
            </Typography>
          </CardContent>
        </Card>
        <div className='time-left'> {timeConverter(timestamp)}</div>
      </div>
    );
  })()
);

export default ForwardMeCard;
