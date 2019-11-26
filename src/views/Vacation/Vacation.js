import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Map } from "immutable";
import { VacationTable, VacationMenu, CustomPaginationActionsTable } from './components';
import { localTimeToUtc, calendarFormat, getNowDate, protocolTimeToFormat, getNowDateEnd, getTitle } from 'utils/kumcUtils';
import Paper from "@material-ui/core/Paper";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vacationInfoActions from 'store/modules/vacationInfo';
import { withSnackbar } from 'notistack';
import { Button, Tooltip } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
const style = theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    elevation1: {
        boxShadow: "none",
        border: "1px solid rgba(224, 224, 224, 1)",
        borderBottom: "none",
        borderRadius: "0px",
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        //width: "100%",
        flexWrap: "wrap"
        //flex: 1
    },
    topMenuButton: {
        textAlign: "center",
        //borderRadius: "52px",
        color: "#ffffff",
        boxShadow: "none",
        cursor: "pointer",
        border: "none",
        width: "auto",
        margin: "0px 10px",
        fontWeight: "400",
        lineHeight: "1.5em",
        "&:hover": {
            backgroundColor: "rgb(46, 204, 113)"
        }
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-end",
        flex: '1'
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(1),
        width: 150,
        fontSize: '0.75rem'
    },
    dense: {
        marginTop: 19,
    },
});
class Vacation extends PureComponent {
    state = {
        documents: Map({
            searchName: "",
            lvar_page: 1, //작성목록 페이지
            lvar_rows: 50, //화면표시 수
            lvar_start_date: "init",
            lvar_end_date: "init",
            tmp_page: 1
        })
    }
    componentDidMount() {
        this.ReqListInfo();
    }
    handleSearchClick = () => {
        this.ReqListInfo();
    };
    ReqListInfo = async (page, rowsPerPage) => {
        const { VacationInfoActions } = this.props;
        const { documents } = this.state;
        const searchName = documents.get("searchName");
        let lvar_start_date = documents.get("lvar_start_date");
        let lvar_end_date = documents.get("lvar_end_date");
        let lvar_page = '';
        let lvar_rows = '';

        this.setState({
            documents: documents
                .set("tmp_page", page)
        });

        if (typeof page === "undefined") {
            lvar_page = documents.get("lvar_page");
        } else {
            lvar_page = page + 1;
        }

        if (typeof rowsPerPage === "undefined") {
            lvar_rows = documents.get("lvar_rows");
        } else {
            lvar_rows = rowsPerPage;
        }

        try {
            if (lvar_start_date !== null) {
                if (lvar_start_date === "init") {
                    lvar_start_date = protocolTimeToFormat('2019-01-01 00:00:00')
                }
                else lvar_start_date = protocolTimeToFormat(lvar_start_date + " 00:00:00");
            }

            if (lvar_end_date !== null) {
                if (lvar_end_date === "init") {
                    lvar_end_date = protocolTimeToFormat("2019-12-31 23:59:59");
                }
                else lvar_end_date = protocolTimeToFormat(lvar_end_date + " 23:59:59");
            }
            await VacationInfoActions.reqGetVacationInfoCondition(
                searchName,
                lvar_start_date,
                lvar_end_date,
                lvar_page,
                lvar_rows
            );
        } catch (e) {
            console.log(e);
        }
    }

    handleSearchWfInfo = (receiver_lang, receiver_start, receiver_end, values) => {
        const { documents } = this.state;
        const searchName = values.searchName;
        this.setState({
            documents: documents
                .set("lvar_start_date", getNowDate(receiver_lang, receiver_start))
                .set("lvar_end_date", getNowDate(receiver_lang, receiver_end))
                .set("searchName", searchName)
        });
    };

    pagination = (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
        const { vacationInfo } = this.props;
        let total = vacationInfo.get("vacation_detail_list_total");
        return (
            <CustomPaginationActionsTable
                rowsCount={Number(total)}
                page={page}
                rowsPerPage={rowsPerPage}
                receiverPage={this.ReqListInfo}
            />
        );
    };
    render() {
        const { classes, vacationInfo, vacation_detail_loading, vacation_detail_error } = this.props;
        const { documents } = this.state;
        const { handleSearchWfInfo, handleSearchClick, pagination } = this;

        const vacationDetailListData = vacationInfo.get("vacation_detail_list").toJS();
        const vacationDetailListDataTotal = vacationInfo.get("vacation_detail_list_total");
        const vacationHolidayTrueDate = vacationInfo.get("vacation_total_holiday_true");
        const vacationHolidayFalseDate = vacationInfo.get("vacation_total_holiday_false");

        //console.log('vacationHolidayTrueDate :', vacationHolidayTrueDate);
        //console.log('vacationHolidayFalseDate :', vacationHolidayFalseDate);
        return (
            <>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <Paper className={classes.elevation1}>
                            <VacationMenu valueProps={handleSearchWfInfo} />
                            <Button onClick={handleSearchClick} variant="contained" style={{ backgroundColor: "#2196f3" }} className={classes.topMenuButton}>
                                검색
                                <SearchIcon className={classes.rightIcon}>send</SearchIcon>
                            </Button>

                            <div className={classes.container}>
                                <TextField
                                    id="dateAll"
                                    label={"총 휴가일수"}
                                    disabled
                                    className={classes.textField}
                                    value={vacationHolidayFalseDate}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="dateHoliday"
                                    label={"총 공가일수"}
                                    disabled
                                    className={classes.textField}
                                    value={vacationHolidayTrueDate}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </Paper>
                        {vacation_detail_error && <h1>network error!</h1>}
                        {!vacation_detail_error && (
                            <VacationTable
                                users={vacationDetailListData}
                                pagination={pagination}
                            />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default connect(
    state => ({
        vacationInfo: state.vacationInfo,
        vacation_detail_loading: state.pender.pending["vacations/VACATION_DETAIL"],
        vacation_detail_error: state.pender.failure["vacations/VACATION_DETAIL"]
    }),
    dispatch => ({
        VacationInfoActions: bindActionCreators(vacationInfoActions, dispatch)
    })
)(withStyles(style, { withTheme: true })(withSnackbar(Vacation)));