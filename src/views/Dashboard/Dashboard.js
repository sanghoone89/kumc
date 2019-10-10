import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { localTimeToUtc } from 'utils/kumcUtils';
import moment from 'moment';
import './main.scss';
import FormDialog from './components/Dialog';
import { connect } from 'react-redux';
import {bindActionCreators} from  'redux';
import * as editorInfoActions from 'store/modules/editor';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class Dashboard extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    open: false,
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
  componentDidMount = () => {};
  handleDateClick = arg => {
    this.setState(prevState => ({
      open: true
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

  handleDateClickCallback = async(name, type, isCheck, startDate, endDate) => {
    console.log(name, type, isCheck, startDate, endDate);
    const {EditorInfoActions} = this.props;
    const temp = {
      'name': name,
      'vacationType': type,
      'officialHoliday': isCheck,
      'startDate': startDate,
      'endDate': endDate,
      'title' : name+'휴가',
      'body': 'test1'
    }
    try{
      EditorInfoActions.reqWritePost({vacation: temp});
    }catch(e){
      console.log(e);
    }
  }
  handleClose = () => {
    this.setState(prevState => ({
      open: false
    }));
  };
  render() {
    const { calendarEvents, open } = this.state;
    const { handleClose, handleDateClickCallback } = this;
    console.log('calendarEvents :', calendarEvents);
    return (
      <div className="demo-app">
        <div className="demo-app-top"></div>
        <div className="demo-app-calendar">
          <FormDialog open={open} handleClose={handleClose} callback={handleDateClickCallback}/>
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
  (state) => ({
    editorInfo: state.editor
  }),
  (dispatch) => ({
    EditorInfoActions: bindActionCreators(editorInfoActions, dispatch)
  })
)(Dashboard);
