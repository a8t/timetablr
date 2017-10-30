import React from "react";
import "./Calendar.css";
import TermCalendar from './TermCalendar'

import { CSSTransitionGroup } from "react-transition-group"

const Calendars = props => {
  return (
      <div id="calendars">
        <TermCalendar term="F '17">
          {props.fallEntries}
        </TermCalendar>

        <TermCalendar term="W '18">
          {props.winterEntries}
        </TermCalendar>
      </div>
    )
}
    
export default Calendars
