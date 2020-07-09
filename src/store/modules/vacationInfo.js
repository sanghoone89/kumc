import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import { makeVacation } from "utils/makeVacationComm";
import { calendarFormat } from "utils/kumcUtils";
import axios from "axios";
import moment from 'moment';

const INITIALIZE = 'vacations/INITIALIZE';
const SET_STARTINIT = 'vacations/VACATION_STARTINIT';
//const VACATION_ARG_DATE = 'vacation/VACATION_ARG_DATE';
const VACATION_INSERT = 'vacations/VACATION_INSERT';
const VACATION_LIST = 'vacations/VACATION_LIST';
const VACATION_INFO = 'vacations/VACATION_INFO';
const VACATION_UPDATE = 'vacations/VACATION_UPDATE';
const VACATION_DELETE = 'vacations/VACATION_DELETE';
const VACATION_DETAIL = 'vacations/VACATION_DETAIL';

function insertVacation(vacation) {
    const body = makeVacation(vacation);
    return axios.post(process.env.REACT_APP_URL + '/api/vacations', body);
}

function getVacationListInfo() {
    return axios.get(process.env.REACT_APP_URL + '/api/vacations');
}

function getVacationInfo(vacationid) {
    return axios.get(process.env.REACT_APP_URL + `/api/vacations/${vacationid}`);
}

function updateVacation(vacation) {
    const body = makeVacation(vacation);
    return axios.patch(process.env.REACT_APP_URL + `/api/vacations/${vacation.values.vacationid}`, body);
}

function deleteVacation(vacationid) {
    return axios.delete(process.env.REACT_APP_URL + `/api/vacations/${vacationid}`);
}

function getVacationInfoCondition(username, startdate, enddate, page, rows) {
    const params = {
        username: username,
        startdate: startdate,
        enddate: enddate,
        page: page,
        rows: rows,
    };
    const headers = {
        "Content-Type": "application/json"
    }
    return axios.post(process.env.REACT_APP_URL + '/api/vacations/detail', params);
}

export const initialize = createAction(INITIALIZE);
export const setStartInit = createAction(SET_STARTINIT);
//export const reqArgDate = createAction(VACATION_ARG_DATE);
export const reqInsertVacation = createAction(VACATION_INSERT, insertVacation);
export const reqGetVacationListInfo = createAction(VACATION_LIST, getVacationListInfo);
export const reqGetVacationInfo = createAction(VACATION_INFO, getVacationInfo);
export const reqUpdateVacation = createAction(VACATION_UPDATE, updateVacation);
export const reqDeleteVacation = createAction(VACATION_DELETE, deleteVacation);
export const reqGetVacationInfoCondition = createAction(VACATION_DETAIL, getVacationInfoCondition);

const initialState = Map({
    vacation_list: List(),
    calendar_list: List(),
    vacation_info: Map({
        vacationid: "",
        username: "",
        vacationtype: "all",
        officialholiday: false,
        startdate: "",
        enddate: "",
        title: "",
        body: "",
        nickname: "",
        phonenumber: "",
        position: ""
    }),
    vacation_detail_list: List(),
    vacation_detail_list_total: 0,
    vacation_total_holiday_false: 0,
    vacation_total_holiday_true: 0
});

export default handleActions({
    [SET_STARTINIT]: (state, action) => {
        const { payload } = action;
        return state.set('vacation_info', fromJS(payload));
    },
    [INITIALIZE]: (state, action) => {
        let temp = {
            vacationid: "",
            username: "",
            vacationtype: "all",
            officialholiday: false,
            startdate: "",
            enddate: "",
            title: "",
            body: "",
            nickname: "",
            phonenumber: "",
            position: ""
        }
        return state.set('vacation_info', fromJS(temp));
    },
    ...pender({
        type: VACATION_DETAIL,
        onSuccess: (state, action) => {
            const { body } = action.payload.data;
            let sumHolidayFalse = 0;
            let sumHolidayTrue = 0;

            let temp = body.detail_list.map(obj => ({
                ...obj,
                startdate: moment(obj.startdate).format("YYYY-MM-DD"),
                enddate: moment(obj.enddate).format("YYYY-MM-DD"),
                vacationtype: (obj.vacationtype === 'all')
                    ? "종일"
                    : (obj.vacationtype === 'am')
                        ? "오전"
                        : "오후"
            }));

            let calcHolidayTrue = body.detail_list.filter(obj => obj.officialholiday === 'Y');
            calcHolidayTrue.forEach(obj => sumHolidayTrue += Number(obj.calc));

            let calcHolidayFalse = body.detail_list.filter(obj => obj.officialholiday === 'N');
            calcHolidayFalse.forEach(obj => sumHolidayFalse += Number(obj.calc));

            return state.set('vacation_detail_list', fromJS(temp))
                .set('vacation_detail_list_total', fromJS(body.total))
                .set('vacation_total_holiday_false', sumHolidayFalse)
                .set('vacation_total_holiday_true', sumHolidayTrue);
        }
    }),
    ...pender({
        type: VACATION_UPDATE,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state;
        }
    }),
    ...pender({
        type: VACATION_DELETE,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state;
        }
    }),
    ...pender({
        type: VACATION_INFO,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            let temp = state.set('vacation_info', fromJS(data));
            return temp;
        }
    }),
    ...pender({
        type: VACATION_INSERT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state;
        }
    }),
    ...pender({
        type: VACATION_LIST,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            let temp = data.map(obj => ({
                id: obj.vacationid,
                title: obj.title,
                start: calendarFormat(obj.startdate, obj.vacationtype),
                end: calendarFormat(obj.enddate, obj.vacationtype),
                //allDay: (obj.vacationtype === 'all') ? true : false
                allDay: false,
                backgroundColor: (obj.position === 'Anesthesiologists') ? '#3788d8' : (obj.position === 'Resident') ? 'green' : 'purple',
                borderColor: (obj.position === 'Anesthesiologists') ? '#3788d8' : (obj.position === 'Resident') ? 'green' : 'purple',
            }));
            return state.set('vacation_list', fromJS(data))
                .set('calendar_list', fromJS(temp));
        }
    })
}, initialState);
