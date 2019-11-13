import React, { useRef, createRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Close from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import CustomInput from 'components/custom/CustomInput';
import { useSnackbar } from 'notistack';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as memberInfoActions from 'store/modules/memberInfo';
import Button from "components/custom/CustomButton";

const useStyles = makeStyles(theme => ({
    DialogDevider: {
        width: "100%",
        height: "1px",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto"
    },
    formControl: {
        width: "100%"
    },
    progress: {
        margin: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    centerCircleDiv: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    snackbar: {
        fontFamily: "'Noto Sans KR', sans-serif!important"
    }
}))
const CustomUserFormDialog = props => {
    const classes = useStyles();
    const { dialogProps, titleProps, memberProps, MemberInfoActions } = props;
    const [open, setOpen] = React.useState(props.open);
    const [values, setValues] = React.useState({
        memberid: memberProps.rowData[0],
        username: memberProps.rowData[1],
        nickname: memberProps.rowData[2],
        phonenumber: memberProps.rowData[3],
        position: memberProps.rowData[4]
    });
    const [inputNameEl, setInputNameEl] = useState(() => createRef());
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.username.length === 0) {
            enqueueSnackbar('사용자 이름을 입력해주세요', {
                variant: 'info',
                classes: {
                    root: classes.snackbar
                }
            });
            inputNameEl.current.focus();
            return false;
        }

        MemberInfoActions.reqInsertMember(values)
            .then(result => {
                if (result.data === 1) {
                    enqueueSnackbar('사용자 추가가 완료되었습니다', {
                        variant: 'success',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                    memberProps.handleMemberList();
                    dialogProps.onClose();

                } else {
                    enqueueSnackbar('사용자 추가에 실패하였습니다', {
                        variant: 'warning',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                }
            });
    }

    const handlePatch = (event) => {
        event.preventDefault();

        MemberInfoActions.reqUpdateMember(values)
            .then(result => {
                if (result.data === true) {
                    enqueueSnackbar('사용자 정보 수정이 완료되었습니다', {
                        variant: 'success',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                    memberProps.handleMemberList();
                    dialogProps.onClose();

                } else {
                    enqueueSnackbar('사용자 정보 수정에 실패하였습니다', {
                        variant: 'warning',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                }
            });
    }

    const handleDelete = (event) => {
        event.preventDefault();
        MemberInfoActions.reqDeleteMember(values)
            .then(result => {
                if (result.data === true) {
                    enqueueSnackbar(values.username + ' 사용자가 삭제되었습니다', {
                        variant: 'success',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                    memberProps.handleMemberList();
                    dialogProps.onClose();
                } else {
                    enqueueSnackbar('사용자 삭제에 실패하였습니다', {
                        variant: 'warning',
                        classes: {
                            root: classes.snackbar
                        }
                    });
                }
            });
    }

    return (
        <div>
            <Dialog {...dialogProps}>
                <DialogTitle id="form-dialog-title">
                    {titleProps.msg}
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={dialogProps.onClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
                    <Divider className={classes.DialogDevider} />
                    <TextField
                        required
                        autoFocus={true}
                        margin="dense"
                        id="username"
                        label={"이름"}
                        fullWidth
                        inputRef={inputNameEl}
                        placeholder={"이름을 입력해주세요"}
                        onChange={handleChange('username')}
                        defaultValue={values.username}
                        disabled={memberProps.type === "patch"}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="nickname"
                        label={"닉네임"}
                        fullWidth
                        placeholder={"닉네임을 입력해주세요"}
                        onChange={handleChange('nickname')}
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={values.nickname}
                    />
                    <TextField
                        margin="dense"
                        id="phonenumber"
                        label={"휴대폰 번호"}
                        fullWidth
                        onChange={handleChange('phonenumber')}
                        placeholder={"휴대폰 번호를 입력해주세요"}
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={values.phonenumber}
                    />
                    <TextField
                        margin="dense"
                        id="position"
                        label={"직책"}
                        fullWidth
                        onChange={handleChange('position')}
                        placeholder={"직책을 입력해주세요"}
                        InputLabelProps={{
                            shrink: true
                        }}
                        defaultValue={values.position}
                    />
                </DialogContent>

                {memberProps.type === "insert" && (
                    <DialogActions style={{ justifyContent: "center" }}>
                        <Button variant="contained" onClick={handleSubmit} style={{ width: "50%" }} color="primary">
                            {titleProps.msgBtn}
                        </Button>
                    </DialogActions>
                )}
                {memberProps.type === "patch" && (
                    <DialogActions style={{ justifyContent: "space-evenly", margin: "15px 4px" }}>
                        <Button variant="contained" onClick={handleDelete} style={{ flex: "0.3" }} color="danger">
                            {titleProps.msgBtnDelete}
                        </Button>
                        <Button variant="contained" onClick={handlePatch} style={{ flex: "0.3" }} color="primary">
                            {titleProps.msgBtn}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}

export default connect(
    state => ({
        memberInfo: state.memberInfo
    }),
    dispatch => ({
        MemberInfoActions: bindActionCreators(memberInfoActions, dispatch)
    })
)(CustomUserFormDialog);