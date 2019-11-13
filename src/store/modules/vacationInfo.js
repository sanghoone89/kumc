import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import { makeVacation } from "utils/makeVacationComm";
//import * as api from 'lib/api';
import axios from "axios";
//action types
const INITIALIZE = 'vacations/INITIALIZE';
const VACATION_INSERT = 'vacations/VACATION_INSERT';

function insertVacation(vacation) {
    const body = makeVacation(vacation);
    return axios.post('/api/vacations', body);
}

export const initialize = createAction(INITIALIZE);
export const reqInsertVacation = createAction(VACATION_INSERT, insertVacation);
const initialState = Map({
    vacation_list: List()
});

export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: VACATION_INSERT,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            return state;
        }
    })
}, initialState);
