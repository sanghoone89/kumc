import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
//import * as api from 'lib/api';
import axios from "axios";
//action types
const INITIALIZE = 'vacation/INITIALIZE';
const WRITE_POST = 'vacation/WRITE_POST';

function writePost(vacation){
    debugger;
    return axios.post('/api/posts', vacation).then(()=>console.log('ss')).catch((e)=>console.log('asdf:'+e));
}

export const initialize = createAction(INITIALIZE);
export const reqWritePost = createAction(WRITE_POST, writePost);
const initialState = Map({
    vacation: Map({
        name: '',
        vacationType: '',
        officialHoliday: false,
        startDate: '',
        endDate: '',
        title:'',
        body:''
    }),
    postId: null
});

export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) => {
            debugger;
            const {_id} = action.payload.data;
            return state.set('postId', _id);
        }
    })
}, initialState);
