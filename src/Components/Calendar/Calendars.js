import React from "react";
import "./Calendar.css";
import TermCalendar from './TermCalendar'
import Entry from "./Entry/Entry"

import Transition from 'react-motion-ui-pack'

import { timeToMilitaryTime } from "../LocalState";


const Calendars = props => {

  const sectionDataToEntry = entryJSON => {
    return entryJSON.course_times.map(eachTime => {

      const styleObj = {
        background: "#0ba7b7",
        gridRowStart: "time" + timeToMilitaryTime(eachTime.start),
        gridRowEnd: "time" + timeToMilitaryTime(eachTime.end),
        gridColumn: eachTime.day.toLowerCase() + "/ span 2",
        zIndex: 3
      }

      if (props.entryHovered === entryJSON.id) {
        styleObj.WebkitBoxShadow = "0px 0px 10px  5px rgba(0,188,212,1)"
        styleObj.MozBoxShadow = "0px 0px 10px 5px rgba(0,188,212,1)"
        styleObj.boxShadow = "0px 0px 10px 5px rgba(0,188,212,1)"
        styleObj.zIndex = 4
      } else if (entryJSON.addMethod === "hovered") {
        styleObj.background = "lightgreen"
        styleObj.opacity = 0.5
        styleObj.zIndex = 4
      }

      return (
        <Transition
          component={false} // don't use a wrapping component
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          <Entry
            setEntryHovered={props.setEntryHovered}
            code={entryJSON.code}
            id={entryJSON.id}
            keyEl={entryJSON.id + entryJSON.courseCode + entryJSON.addMethod}
            style={styleObj}
            courseCode={entryJSON.courseCode}
            timeStart={eachTime.start / 3600 % 12}
            timeEnd={eachTime.end / 3600 % 12}
            removeMeetingSectionData={props.removeMeetingSectionData}
          />
        </Transition>
      )
    })
  }

  const fallCourses = props.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2017 Fall")
  const fallEntries = fallCourses.reverse().map(eachSectionData => sectionDataToEntry(eachSectionData))

  const winterCourses = props.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2018 Winter")
  const winterEntries = winterCourses.reverse().map(eachSectionData => sectionDataToEntry(eachSectionData))

  return (
    <div id="calendars">
      <TermCalendar term="F '17">
        {fallEntries}
      </TermCalendar>

      <TermCalendar term="W '18">
        {winterEntries}
      </TermCalendar>
    </div>
  )
}
    
export default Calendars
