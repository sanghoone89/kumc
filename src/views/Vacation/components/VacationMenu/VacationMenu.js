import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from "date-fns/locale/en-US";
import koLocale from "date-fns/locale/ko";
import jaLocale from "date-fns/locale/ja";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(1),
        width: 130,
        fontSize: '0.75rem'
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 130,
    },
    formControl: {
        minWidth: 130
    }
}));

const localeMap = {
    en: enLocale,
    ko: koLocale,
    ja: jaLocale
};

export default function DocumentMenu(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        searchName: ''
    });

    const getLang = 'ko';
    let pickerFormat = 'yyyy-MM-dd';
    if (getLang === 'en')
        pickerFormat = 'MM-dd-yyyy';

    let initStartDate = new Date();
    const [selectedStartDate, handleStartDateChange] = useState(new Date(2019, 2, 1)); //이렇게 해야 2019-03-01로 나옴
    const [selectedEndDate, handleEndDateChange] = useState(new Date(2020, 1, 29)); //이렇게 해야 2019-02-29로 나옴
    const [formatDate] = useState(pickerFormat);
    const [locale] = useState(getLang);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    useEffect(() => {
        props.valueProps(getLang, selectedStartDate, selectedEndDate, values);
    }, [values, selectedStartDate, selectedEndDate])

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="searchName"
                label={"이름"}
                className={classes.textField}
                value={values.name}
                onChange={handleChange('searchName')}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                <KeyboardDatePicker
                    label={"검색 시작날짜"}
                    clearable
                    style={{ width: 150, minWidth: 150, marginLeft: 8, marginRight: 8, marginTop: 8 }}
                    value={selectedStartDate}
                    onChange={date => handleStartDateChange(date)}
                    format={formatDate}
                />

                <KeyboardDatePicker
                    label={"검색 종료날짜"}
                    clearable
                    style={{ width: 150, minWidth: 150, marginLeft: 8, marginRight: 8, marginTop: 8 }}
                    value={selectedEndDate}
                    minDate={selectedStartDate}
                    onChange={date => handleEndDateChange(date)}
                    format={formatDate}
                />
            </MuiPickersUtilsProvider>
        </form>
    );
}