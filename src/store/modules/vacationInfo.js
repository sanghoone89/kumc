import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import { makeVacation } from "utils/makeVacationComm";
import { calendarFormat } from "utils/kumcUtils";
import axios from "axios";
const INITIALIZE = 'vacations/INITIALIZE';
const SET_STARTINIT = 'vacations/VACATION_STARTINIT';
//const VACATION_ARG_DATE = 'vacation/VACATION_ARG_DATE';
const VACATION_INSERT = 'vacations/VACATION_INSERT';
const VACATION_LIST = 'vacations/VACATION_LIST';
const VACATION_INFO = 'vacations/VACATION_INFO';
const VACATION_UPDATE = 'vacations/VACATION_UPDATE';
const VACATION_DELETE = 'vacations/VACATION_DELETE';

function insertVacation(vacation) {
    const body = makeVacation(vacation);
    return axios.post('/api/vacations', body);
}

function getVacationListInfo() {
    return axios.get('/api/vacations');
}

function getVacationInfo(vacationid) {
    return axios.get(`/api/vacations/${vacationid}`);
}

function updateVacation(vacation) {
    const body = makeVacation(vacation);
    return axios.patch(`/api/vacations/${vacation.values.vacationid}`, body);
}

function deleteVacation(vacationid) {
    return axios.delete(`/api/vacations/${vacationid}`);
}

export const initialize = createAction(INITIALIZE);
export const setStartInit = createAction(SET_STARTINIT);
//export const reqArgDate = createAction(VACATION_ARG_DATE);
export const reqInsertVacation = createAction(VACATION_INSERT, insertVacation);
export const reqGetVacationListInfo = createAction(VACATION_LIST, getVacationListInfo);
export const reqGetVacationInfo = createAction(VACATION_INFO, getVacationInfo);
export const reqUpdateVacation = createAction(VACATION_UPDATE, updateVacation);
export const reqDeleteVacation = createAction(VACATION_DELETE, deleteVacation);

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
    })
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
                backgroundColor: (obj.position === 'Anesthesiologists') ? '#3788d8' : 'green',
                borderColor: (obj.position === 'Anesthesiologists') ? '#3788d8' : 'green',
            }));
            return state.set('vacation_list', fromJS(data))
                .set('calendar_list', fromJS(temp));
        }
    })
}, initialState);
