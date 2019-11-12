import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as memberInfoActions from 'store/modules/memberInfo';
import CustomUserFormDialog from '../../components/custom/CustomUserFormDialog';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = (props) => {
  const { MemberInfoActions, memberInfo } = props;
  const [open, setOpen] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [rowData, setRowData] = useState({
    memberid: '',
    username: '',
    nickname: '',
    phonenumber: '',
    position: ''
  });

  const classes = useStyles();
  function handleClickOpen() {
    setRowData({});
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickOpenModify() {
    setOpenModify(true);
  }
  function handleCloseModify() {
    setOpenModify(false);
  }

  function handleMemberList() {
    MemberInfoActions.reqGetMemberListInfo();
  }

  function handleRowClickOpen(data) {
    setRowData({ ...data });
    handleClickOpenModify();
  }
  useEffect(() => {
    handleMemberList();
  }, []);

  let memberListData = memberInfo.get("member_list").toJS();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {open && (
          <CustomUserFormDialog
            dialogProps={{
              open: open,
              onClose: handleClose,
              "aria-labelledby": "form-dialog-title"
            }}
            titleProps={{ msg: "사용자 추가", msgBtn: "사용자 추가하기" }}
            memberProps={{
              handleMemberList: handleMemberList,
              rowData: rowData,
              type: "insert"
            }}
          />
        )}
        {openModify && (
          <CustomUserFormDialog
            dialogProps={{
              open: openModify,
              onClose: handleCloseModify,
              "aria-labelledby": "form-dialog-title"
            }}
            titleProps={{
              msg: "사용자 정보 수정",
              msgBtn: "사용자 정보 수정하기",
              msgBtnDelete: "사용자 삭제하기"
            }}
            memberProps={{
              handleMemberList: handleMemberList,
              rowData: rowData,
              type: "patch"
            }}
          />
        )}
        <UsersTable users={memberListData} handleClickOpen={handleClickOpen} handleRowClickOpen={handleRowClickOpen} />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    memberInfo: state.memberInfo
  }),
  dispatch => ({
    MemberInfoActions: bindActionCreators(memberInfoActions, dispatch)
  })
)(UserList);
