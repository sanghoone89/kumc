import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import koLocale from 'date-fns/locale/ko';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles({
  grid: {
    justify: 'space-around'
    /* width: '60%', */
    /* display:'block' */
  },
  formControl: {
    minWidth: 200
  }
});

const localeMap = {
  en: enLocale,
  ko: koLocale
};
export default function CustomDatePickers(props) {
  const getLang = props.lang || 'ko';
  let pickerFormat = 'yyyy-MM-dd';
  if (getLang === 'en') pickerFormat = 'MM-dd-yyyy';

  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [formatDate] = useState(pickerFormat);
  const [locale] = useState(getLang);
  const classes = useStyles();

  /* useEffect(() => {
    props.valueProps(getLang, selectedStartDate, selectedEndDate);
  }, [selectedStartDate]);
 */
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
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
  );
}
