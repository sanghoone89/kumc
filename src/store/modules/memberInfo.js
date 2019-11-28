import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';
import { makeMember } from "utils/makeMemberComm";

const MEMBER_LIST = 'members/MEMBER_LIST';
const MEMBER_INFO = 'members/MEMBER_INFO';
const MEMBER_INSERT = 'members/MEMBER_INSERT';
const MEMBER_UPDATE = 'members/MEMBER_UPDATE';
const MEMBER_DELETE = 'members/MEMBER_DELETE';

function insertMember(values) {
    const body = makeMember(values.username, values.nickname, values.phonenumber, values.position);
    return axios.post(process.env.REACT_APP_URL + '/api/members', body);
}

function updateMember(values) {
    const body = makeMember(values.username, values.nickname, values.phonenumber, values.position);
    return axios.patch(process.env.REACT_APP_URL + `/api/members/${values.memberid}`, body);
}

function deleteMember(values) {
    return axios.delete(process.env.REACT_APP_URL + `/api/members/${values.memberid}`);
}

function getMemberListInfo() {
    const url = process.env.REACT_APP_URL;
    return axios.get(process.env.REACT_APP_URL + '/api/members');
}

export const reqInsertMember = createAction(MEMBER_INSERT, insertMember);
export const reqUpdateMember = createAction(MEMBER_UPDATE, updateMember);
export const reqDeleteMember = createAction(MEMBER_DELETE, deleteMember);
export const reqGetMemberListInfo = createAction(MEMBER_LIST, getMemberListInfo);

const initialState = Map({
    member_list: List()
});

export default handleActions(
    {
        ...pender({
            type: MEMBER_INSERT,
            onSuccess: (state, action) => {
                const { data } = action.payload;
                return state;
                //return state.set('member_list', fromJS(data));
            }
        }),
        ...pender({
            type: MEMBER_UPDATE,
            onSuccess: (state, action) => {
                const { data } = action.payload;
                return state;
                //return state.set('member_list', fromJS(data));
            }
        }),
        ...pender({
            type: MEMBER_DELETE,
            onSuccess: (state, action) => {
                const { data } = action.payload;
                return state;
                //return state.set('member_list', fromJS(data));
            }
        }),
        ...pender({
            type: MEMBER_LIST,
            onSuccess: (state, action) => {
                const { data } = action.payload;
                return state.set('member_list', fromJS(data));
            }
        }),
    }, initialState
);