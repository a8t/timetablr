import React from 'react';
import './Calendar.css';

const Calendar = props => {
  return (
      <div id="calendars">
        <div id='calendarFall'>
          {props.fallEntries}
          <div className="weekday term"      style={{gridColumn: "start     / span 1"}}>F '17</div>
          <div className="weekday line"      style={{gridColumn: "monday    / span 2"}}>MO</div>
          <div className="weekday line"      style={{gridColumn: "tuesday   / span 2"}}>TU</div>
          <div className="weekday line"      style={{gridColumn: "wednesday / span 2"}}>WE</div>
          <div className="weekday line"      style={{gridColumn: "thursday  / span 2"}}>TH</div>
          <div className="weekday line"      style={{gridColumn: "friday    / span 2"}}>FR</div>
          <div className="time"              style={{gridRow: "time     / span 2"}}></div>
          <div className="time"              style={{gridRow: "time     / span 2"}}></div>
          <div className="timeslot first"    style={{gridRow: "time8    / span 2" }}>8am</div>
          <div className="timeslot halfHour" style={{gridRow: "time830  / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time9    / span 2"}}>9am</div>
          <div className="timeslot halfHour" style={{gridRow: "time930  / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time10   / span 2"}}>10am</div>
          <div className="timeslot halfHour" style={{gridRow: "time1030 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time11   / span 2"}}>11am</div>
          <div className="timeslot halfHour" style={{gridRow: "time1130 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time12   / span 2"}}>12pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1230 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time13   / span 2"}}>1pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1330 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time14   / span 2"}}>2pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1430 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time15   / span 2"}}>3pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1530 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time16   / span 2"}}>4pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1630 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time17   / span 2"}}>5pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1730 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time18   / span 2"}}>6pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1830 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time19   / span 2"}}>7pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1930 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time20   / span 2"}}>8pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2030 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time21   / span 2"}}>9pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2130 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time22   / span 2"}}>10pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2230 / span 1"}}></div>
        </div>
        <div id='calendarWinter'>
          {props.winterEntries}
          <div className="weekday line term" style={{gridColumn: "start     / span 1"}}>W '18</div>
          <div className="weekday line"      style={{gridColumn: "monday    / span 2"}}>MO</div>
          <div className="weekday line"      style={{gridColumn: "tuesday   / span 2"}}>TU</div>
          <div className="weekday line"      style={{gridColumn: "wednesday / span 2"}}>WE</div>
          <div className="weekday line"      style={{gridColumn: "thursday  / span 2"}}>TH</div>
          <div className="weekday"           style={{gridColumn: "friday    / span 2"}}>FR</div>
          <div className="timeslot first"    style={{gridRow: "time8    / span 2"}}>8am</div>
          <div className="timeslot halfHour" style={{gridRow: "time830  / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time9    / span 2"}}>9am</div>
          <div className="timeslot halfHour" style={{gridRow: "time930  / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time10   / span 2"}}>10am</div>
          <div className="timeslot halfHour" style={{gridRow: "time1030 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time11   / span 2"}}>11am</div>
          <div className="timeslot halfHour" style={{gridRow: "time1130 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time12   / span 2"}}>12pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1230 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time13   / span 2"}}>1pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1330 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time14   / span 2"}}>2pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1430 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time15   / span 2"}}>3pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1530 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time16   / span 2"}}>4pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1630 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time17   / span 2"}}>5pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1730 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time18   / span 2"}}>6pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1830 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time19   / span 2"}}>7pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time1930 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time20   / span 2"}}>8pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2030 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time21   / span 2"}}>9pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2130 / span 1"}}></div>
          <div className="timeslot"          style={{gridRow: "time22   / span 2"}}>10pm</div>
          <div className="timeslot halfHour" style={{gridRow: "time2230 / span 1"}}></div>
        </div>
      </div>
    )
}
    
export default Calendar
