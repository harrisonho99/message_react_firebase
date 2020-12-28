import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Icon from '@material-ui/core/Icon';
import './messageField.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
const useStyles = makeStyles(() => ({
  TextField: {
    width: '100%',
    margin: '0px 10px',
    minWidth: 250,
    height: 80,
  },
  button: {
    margin: '0px 5px',
    height: 54,
    backgroundColor: '#3f51b5',
    width: 140,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  icon: {
    color: '#3949ab',
    fontSize: 36,
  },
  iconWrapper: {
    cursor: 'pointer',
  },
}));

export default function InputWithIcon({ onFormSubmit }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit(value, { setSubmitting, setValues }) {
      onFormSubmit(value, setSubmitting, setValues);
    },
    validationSchema: Yup.object({
      content: Yup.string().min(1).required(),
    }),
  });
  return (
    <div id='meesage-wrapper'>
      <form onSubmit={formik.handleSubmit} className='form-message'>
        <TextField
          size='medium'
          disabled={formik.isSubmitting}
          name='content'
          type='text'
          variant='outlined'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
          className={classes.TextField}
          id='input-with-icon-textfield'
          // label="Enter Text"
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className={classes.iconWrapper}>
                <SentimentVerySatisfiedIcon className={classes.icon} />
              </InputAdornment>
            ),
          }}
          autoComplete='off'
        />
        <Button
          color='primary'
          endIcon={<Icon>send</Icon>}
          size='large'
          variant='contained'
          type='submit'
          className={classes.button}
          disabled={formik.isSubmitting}
        >
          Send
          {formik.isSubmitting && (
            <CircularProgress size={28} className={classes.buttonProgress} />
          )}
        </Button>
      </form>
    </div>
  );
}
