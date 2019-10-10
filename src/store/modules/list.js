import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import React from 'react';
import { pender } from 'redux-pender';

const initialState = Map({});

export default handleActions({}, initialState);
