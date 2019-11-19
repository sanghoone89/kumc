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

export function getNowDateStart(locale, date, type) {
  //ko, en
  if (date === null) return date;

  const format = 'YYYY-MM-DD';
  date = moment.utc(date).local().format(format);
  let startTime = '';
  switch (type) {
    case 'all':
    case 'am':
      startTime = '09';
      break;
    case 'pm':
      startTime = '13';
      break;
    default:
      break;
  }
  date = date + ' ' + startTime + ':00:00';
  return date;
}

export function getNowDateEnd(locale, date, type) {
  //ko, en
  if (date === null) return date;
  const format = 'YYYY-MM-DD';
  date = moment.utc(date).local().format(format);
  let endTime = '';
  switch (type) {
    case 'all':
    case 'pm':
      endTime = '18';
      break;
    case 'am':
      endTime = '13';
      break;
    default:
      break;
  }

  date = date + ' ' + endTime + ':00:00';
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

export function calendarFormat(date, type) {
  return moment(date).format();
}

export function getTitle(type, name) {
  let result = '';
  switch (type) {
    case 'all':
      result = '(휴가-종일)';
      break;
    case 'am':
      result = '(오전)';
      break;
    case 'pm':
      result = '(오후)';
      break;
    default:
      break;
  }
  return name + result;
}

export function getHoliday(date) {
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = week[new Date(date).getDay()];
  return dayOfWeek;
}

export function calculatorDate(startdate, enddate) {
  let date1 = new Date(startdate);
  let date2 = new Date(enddate);

  console.log(((date2.getTime() - date1.getTime()) / 1000 / 24 / 60 / 60) + 1);
}