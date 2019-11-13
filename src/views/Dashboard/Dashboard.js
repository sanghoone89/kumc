import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { localTimeToUtc, getFullYear, getMonth, getNowDate } from 'utils/kumcUtils';
import moment from 'moment';
import './main.scss';
import FormDialog from './components/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vacationInfoActions from 'store/modules/vacationInfo';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";
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
    argDate: new Date(),
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      {
        title: 'Event Nowzz',
        start: new Date(Date.parse(new Date()) - 7 * 1000 * 60 * 60 * 24),
        end: new Date(),
        //end: moment(new Date()).format('YYYY/MM/DD hh:mm:ss'),
        allDay: false
      },
      {
        // not visible
        id: 1,
        title: 'event 1',
        start: '2019-10-08T20:00:00+09:00', //-9 빼면 로컬
        end: '2019-10-09T11:00:00+09:00',
        allDay: false
      },
      {
        // not visible
        id: 2,
        title: 'asdf',
        start: '2019-10-07',
        end: '2019-10-08T00:00:00.000Z',
        timeZone: 'local',
        allDay: false
      }
    ]
  };
  componentDidMount = () => { };
  handleDateClick = arg => {
    console.log(arg);
    this.setState(prevState => ({
      open: true,
      argDate: arg.date
    }));
    /* if (
      window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')
    ) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      });
    } */
  };

  handleDateClickCallback = async (name, type, body, isCheck, startDate, endDate, getLang) => {
    const { VacationInfoActions, classes } = this.props;
    const values =
    {
      username: name,
      vacationtype: type,
      officialholiday: (isCheck === true) ? "Y" : "N",
      startdate: getNowDate(getLang, startDate),
      enddate: getNowDate(getLang, endDate),
      title: getFullYear(getLang, startDate) + getMonth(getLang, startDate) + '-' + name + '휴가',
      body: body
      //body: getNowDate(getLang, startDate) + "~" + getNowDate(getLang, endDate)
    };
    try {
      const successMsg = name + '님의 휴가가 등록되었습니다';
      const failMsg = '휴가 등록이 실패하였습니다(' + name + ')';
      VacationInfoActions.reqInsertVacation({ values })
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
    } catch (e) {
      console.log(e);
    }
  };
  handleClose = () => {
    this.setState(prevState => ({
      open: false
    }));
  };
  render() {
    const { calendarEvents, open, argDate } = this.state;
    const { handleClose, handleDateClickCallback } = this;
    //console.log('calendarEvents :', calendarEvents);
    return (
      <div className="demo-app">
        <div className="demo-app-top"></div>
        <div className="demo-app-calendar">
          <FormDialog
            open={open}
            argDate={argDate}
            handleClose={handleClose}
            callback={handleDateClickCallback}
          />
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            locale={'ko'}
            timeZone={'local'}
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
