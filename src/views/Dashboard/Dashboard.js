import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { localTimeToUtc, getFullYear, getMonth, getNowDate, getNowDateStart, getNowDateEnd, getTitle } from 'utils/kumcUtils';
import moment from 'moment';
import './main.scss';
import FormDialog from './components/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vacationInfoActions from 'store/modules/vacationInfo';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";
import googleCalendarPlugin from '@fullcalendar/google-calendar';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  snackbar: {
    fontFamily: "'Noto Sans KR', sans-serif!important"
  }
}));

const style = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  snackbar: {
    fontFamily: "'Noto Sans KR', sans-serif!important"
  }
});
class Dashboard extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    open: false,
    openInfo: false,
    calendarWeekends: true,
  };
  componentDidMount = () => {
    this.handleVacationList();
  };

  handleVacationList = () => {
    const { VacationInfoActions } = this.props;
    VacationInfoActions.reqGetVacationListInfo();
  }
  handleDateClick = async (arg) => {
    const { VacationInfoActions } = this.props;
    console.log(arg);
    await VacationInfoActions.setStartInit({
      'username': '',
      'vacationtype': 'all',
      'officialholiday': false,
      'startdate': arg.date,
      'enddate': arg.date,
      'title': '',
      'body': ''
    });
    this.setState(prevState => ({
      open: true
    }));
    /*VacationInfoActions.reqArgDate({ argDate: arg.date });
    this.setState(prevState => ({
      open: true
    }))*/
  };

  handleDateClickCallback = async (id, name, type, body, isCheck, startDate, endDate, getLang) => {
    const { VacationInfoActions, classes } = this.props;
    const values =
    {
      username: name,
      vacationtype: type,
      officialholiday: (isCheck === true) ? "Y" : "N",
      startdate: getNowDateStart(getLang, startDate, type),
      enddate: getNowDateEnd(getLang, endDate, type),
      title: getTitle(type, name),
      body: body
    };
    try {
      const successMsg = name + '님의 휴가가 등록되었습니다';
      const failMsg = '휴가 등록이 실패하였습니다(' + name + ')';
      await VacationInfoActions.reqInsertVacation({ values })
        .then((result) => {
          if (result.data === 1) {
            this.props.enqueueSnackbar(successMsg, {
              variant: 'success',
              classes: {
                root: classes.snackbar
              }
            });
          } else {
            this.props.enqueueSnackbar(failMsg, {
              variant: 'warning',
              classes: {
                root: classes.snackbar
              }
            });
          }
        });
      this.handleVacationList();
    } catch (e) {
      console.log(e);
    }
  };

  handleDateUpdateCallback = async (id, name, type, body, isCheck, startDate, endDate, getLang) => {
    const { VacationInfoActions, classes } = this.props;
    const values =
    {
      vacationid: id,
      username: name,
      vacationtype: type,
      officialholiday: (isCheck === true) ? "Y" : "N",
      startdate: getNowDateStart(getLang, startDate, type),
      enddate: getNowDateEnd(getLang, endDate, type),
      title: getTitle(type, name),
      body: body
    };
    try {
      const successMsg = name + '님의 휴가가 수정되었습니다';
      const failMsg = '휴가 수정이 실패하였습니다(' + name + ')';
      await VacationInfoActions.reqUpdateVacation({ values })
        .then((result) => {
          if (result.data === true) {
            this.props.enqueueSnackbar(successMsg, {
              variant: 'success',
              classes: {
                root: classes.snackbar
              }
            });
          } else {
            this.props.enqueueSnackbar(failMsg, {
              variant: 'warning',
              classes: {
                root: classes.snackbar
              }
            });
          }
        });
      this.handleVacationList();
    } catch (e) {
      console.log(e);
    }
  };
  handleClose = () => {
    this.setState(prevState => ({
      open: false
    }));
  };

  handleCloseInfo = () => {
    const { VacationInfoActions } = this.props;
    //VacationInfoActions.reqArgDate({ argDate: '' });
    VacationInfoActions.initialize();
    this.setState(prevState => ({
      openInfo: false
    }));
  };
  eventClick = async (info) => {
    info.jsEvent.preventDefault();
    if (info.event.url) {
      return false;
    }
    const { VacationInfoActions } = this.props;

    await VacationInfoActions.reqGetVacationInfo(info.event.id)
      .then(() => {
        this.setState(prevState => ({
          openInfo: true
        }))
      });
  }

  render() {
    const { open, openInfo } = this.state;
    const { vacationInfo } = this.props;
    const { handleClose, handleCloseInfo, handleDateClickCallback, handleDateUpdateCallback } = this;
    let reduxVacationList = vacationInfo.get("vacation_list");
    let reduxCalendarList = vacationInfo.get("calendar_list");
    let reduxVacationInfo = vacationInfo.get("vacation_info");
    return (
      <div className="demo-app">
        <div className="demo-app-top"></div>
        <div className="demo-app-calendar">
          {open && (
            <FormDialog
              dialogProps={{
                open: open,
                onClose: handleClose,
                "aria-labelledby": "form-dialog-title"
              }}
              titleProps={{ msg: "휴가 등록", msgBtn: "휴가 등록하기" }}
              vacationProps={{
                info: reduxVacationInfo.toJS(),
                callback: handleDateClickCallback,
                type: "insert"
              }}
            />
          )}
          {openInfo && (
            <FormDialog
              dialogProps={{
                open: openInfo,
                onClose: handleCloseInfo,
                info: reduxVacationInfo.toJS(),
                callback: handleDateUpdateCallback,
                "aria-labelledby": "form-dialog-title"
              }}
            />
          )}
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              right: 'dayGridMonth'
            }}
            plugins={[googleCalendarPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
            googleCalendarApiKey={'AIzaSyDUS_7n4Ot3ln7LI13h44ygoIx1u5rxODo'}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            allDayText="종일"
            //events={reduxCalendarList.toJS()}
            eventSources={[
              {
                //googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                googleCalendarId: 'qansohiecib58ga9k1bmppvt5oi65b1q@import.calendar.google.com',
                className: "koHolidays",
                color: "#FF0000",
                textColor: "#FFFFFF",
                id: "google"
              },
              { events: reduxCalendarList.toJS() }
            ]}
            //googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'
            dateClick={this.handleDateClick}
            locale={'ko'}
            timeZone={'local'}
            eventClick={this.eventClick}
          /* views={{
            dayGridMonth: {
              // name of view
              titleFormat: {
                year: 'numeric',
                month: '1-digit',
                day: '2-digit'
              }
              // other view-specific options here
            }
          }} */
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    vacationInfo: state.vacationInfo
  }),
  dispatch => ({
    VacationInfoActions: bindActionCreators(vacationInfoActions, dispatch)
  })
)(withStyles(style, { withTheme: true })(withSnackbar(Dashboard)));
