import React, { useState, useCallback, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'date-fns';
//import CustomDatePickers from '../DatePickers';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import koLocale from 'date-fns/locale/ko';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '85%'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formMarginTopSpacingZero: {
    marginTop: theme.spacing(0),
    minWidth: 120
  },
  grid: {
    justify: 'space-around'
    /* width: '60%', */
    /* display:'block' */
  }
}));
const localeMap = {
  en: enLocale,
  ko: koLocale
};

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function FormDialog(props) {
  debugger;
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [values, setValues] = React.useState({
    name: '',
    type: 'all'
  });
  const [check, setCheck] = React.useState({
    checkedB: false
  });

  const getLang = props.lang || 'ko';
  let pickerFormat = 'yyyy-MM-dd';
  if (getLang === 'en') pickerFormat = 'MM-dd-yyyy';

  const [selectedStartDate, handleStartDateChange] = useState(props.argDate);
  console.log('selectedStartDate :', selectedStartDate, props.argDate);
  const [selectedEndDate, handleEndDateChange] = useState(props.argDate);
  const [formatDate] = useState(pickerFormat);
  const [locale] = useState(getLang);

  const handleClose = () => {
    props.handleClose();
  };

  const handleChange = name => event => {
    console.log('event.target.name :', event.target.name, name);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleCheckChange = name => event => {
    setCheck({ ...check, [name]: event.target.checked });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('values :', values);
    console.log('check :', check.checkedB);
    console.log('selectedStartDate :', selectedStartDate);
    console.log('selectedEndDate :', selectedEndDate);
    props.callback(
      values.name,
      values.type,
      check.checkedB,
      selectedStartDate,
      selectedEndDate
    );
  };

  useEffect(() => {
    handleStartDateChange(props.argDate);
  }, [props.argDate, selectedStartDate]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={maxWidth}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText></DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <TextField
                id="standard-name"
                label="이름"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type">휴가 종류</InputLabel>
              <Select
                value={values.type}
                onChange={handleChange('type')}
                inputProps={{
                  name: 'type',
                  id: 'type'
                }}>
                <MenuItem value="all">종일</MenuItem>
                <MenuItem value="am">오전</MenuItem>
                <MenuItem value="pm">오후</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControlLabel}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check.checkedB}
                    onChange={handleCheckChange('checkedB')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="공가(결혼,예비군, 회갑 등)"
              />
            </FormControl>
            <FormControl className={classes.formMarginTopSpacingZero}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap[locale]}>
                <Grid container justify="space-between">
                  <KeyboardDatePicker
                    clearable
                    style={{
                      width: 150,
                      minWidth: 150,
                      marginLeft: 0,
                      marginRight: 8,
                      marginTop: 8
                    }}
                    label={'휴가 시작날짜'}
                    value={selectedStartDate}
                    onChange={date => handleStartDateChange(date)}
                    format={formatDate}
                  />

                  <KeyboardDatePicker
                    clearable
                    style={{
                      width: 150,
                      minWidth: 150,
                      marginLeft: 8,
                      marginRight: 0,
                      marginTop: 8
                    }}
                    label={'휴가 종료날짜'}
                    value={selectedEndDate}
                    minDate={selectedStartDate}
                    onChange={date => handleEndDateChange(date)}
                    format={formatDate}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleSubmit} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
