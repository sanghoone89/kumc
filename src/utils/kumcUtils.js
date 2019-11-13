import moment from 'moment';
import React from 'react';

export const gfn_isEmpty = obj => {
  let _type = typeof obj;
  if (_type === 'string') {
    if (0 < obj.trim().length) {
      return false;
    } else {
      return true;
    }
  } else if (_type === 'number') {
    return !isFinite(obj);
  } else if (_type === 'object') {
    let name;
    for (name in obj) {
      return false;
    }
    return true;
  } else {
    return true;
  }
};

export function protocolTimeToUtc(date) {
  if (date === '') return '';
  const format = 'YYYY-MM-DD HH:mm:ss';
  return moment
    .utc(date)
    .local()
    .format(format);
}

export function localTimeToUtc(date, format) {
  if (!moment(date).isValid()) {
    return '';
  }

  if (gfn_isEmpty(date)) {
    date = new Date();
  }

  if (gfn_isEmpty(format)) {
    format = 'YYYY-MM-DD HH:mm:ss';
  }
  return moment(date)
    .utc()
    .format(format);
}

export function getNowDate(locale, date) {
  //ko, en
  if (date === null) return date;
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  if (locale === 'ko') date = yyyy + '-' + mm + '-' + dd;
  else if (locale === 'en') date = mm + '-' + dd + '-' + yyyy;
  else date = yyyy + '-' + mm + '-' + dd;

  return date;
}

export function getFullYear(locale, date) {
  if (date === null) return date;
  let yyyy = date.getFullYear();

  return yyyy + '년';
}

export function getMonth(locale, date) {
  if (date === null) return date;
  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = '0' + mm;
  }
  return mm + '월';
}