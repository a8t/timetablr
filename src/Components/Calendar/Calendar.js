import React, {Component} from 'react';
import './Calendar.css';
import Entry from './Entry/Entry.js'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sectionsToRenderData: []
    }
  }

  componentDidMount(){
    this.fetchAllData(this.props.meetingSectionIDs)
  }

  fetchAllData(meetingSectionIDs) {
    
    meetingSectionIDs.forEach(eachID => 
      fetch(`https://tbd-scheduler-v1.herokuapp.com/meeting_sections/search?section=${eachID}`)
      .then(response => response.json())
      .then(jsonResponse => 
        {console.log(jsonResponse)
          this.setState({
        sectionsToRenderData: [...this.state.sectionsToRenderData, jsonResponse]
      })})
    )
  }

  sectionDataToEntry(entryJSON) {
    const timeToMilitaryTime = secondsTime =>  Number.isInteger(secondsTime / 3600) ? secondsTime / 3600 : Math.floor(secondsTime / 3600) + "30"

    return entryJSON.courseTimes.map(eachTime => {
      const styleObj = {
        background: "lightgreen",
        zIndex: "3",
        borderRadius: "8px",
        margin: "2px",
        padding: "5px",
        gridRowStart: 'time' + timeToMilitaryTime(eachTime.start),
        gridRowEnd: 'time' + timeToMilitaryTime(eachTime.end),
        gridColumn: eachTime.day.toLowerCase()
      }
      return <Entry style={styleObj} courseCode={entryJSON.courseCode} instructors={entryJSON.instructors ? entryJSON.instructors : ""} timeStart={eachTime.start / 3600 % 12} timeEnd={eachTime.end / 3600 % 12} key={entryJSON.courseCode + eachTime.day + eachTime.start}/> }
    )
  }
  
  render () {

    const sectionsData = this.state.sectionsToRenderData
    const fallEntries = sectionsData.filter(eachSectiondata => eachSectiondata.term.split(" ").includes("Fall")).map(eachSectionData => this.sectionDataToEntry(eachSectionData))
    const winterEntries = sectionsData.filter(eachSectiondata => eachSectiondata.term.split(" ").includes("Winter")).map(eachSectionData => this.sectionDataToEntry(eachSectionData))

    return (
      <div id="calendars">
        <div id='calendarFall'>
          {fallEntries}
          <div className="weekday"  style={{gridColumn: "start     / span 1"}}></div>
          <div className="weekday"  style={{gridColumn: "monday    / span 1"}}>monday</div>
          <div className="weekday"  style={{gridColumn: "tuesday   / span 1"}}>tuesday</div>
          <div className="weekday"  style={{gridColumn: "wednesday / span 1"}}>wednesday</div>
          <div className="weekday"  style={{gridColumn: "thursday  / span 1"}}>thursday</div>
          <div className="weekday"  style={{gridColumn: "friday    / span 1"}}>friday</div>
          <div className="timeslot" style={{gridRow: "time8 / span 2"}}>8am</div>
          <div className="timeslot" style={{gridRow: "time9 / span 2"}}>9am</div>
          <div className="timeslot" style={{gridRow: "time10 / span 2"}}>10am</div>
          <div className="timeslot" style={{gridRow: "time11 / span 2"}}>11am</div>
          <div className="timeslot" style={{gridRow: "time12 / span 2"}}>12pm</div>
          <div className="timeslot" style={{gridRow: "time13 / span 2"}}>1pm</div>
          <div className="timeslot" style={{gridRow: "time14 / span 2"}}>2pm</div>
          <div className="timeslot" style={{gridRow: "time15 / span 2"}}>3pm</div>
          <div className="timeslot" style={{gridRow: "time16 / span 2"}}>4pm</div>
          <div className="timeslot" style={{gridRow: "time17 / span 2"}}>5pm</div>
          <div className="timeslot" style={{gridRow: "time18 / span 2"}}>6pm</div>
          <div className="timeslot" style={{gridRow: "time19 / span 2"}}>7pm</div>
          <div className="timeslot" style={{gridRow: "time20 / span 2"}}>8pm</div>
          <div className="timeslot" style={{gridRow: "time21 / span 2"}}>9pm</div>
          <div className="timeslot" style={{gridRow: "time22 / span 2"}}>10pm</div>
        </div>
        <div id='calendarWinter'>
          {winterEntries}
          <div className="weekday" style={{ gridColumn: "start     / span 1" }}></div>
          <div className="weekday" style={{ gridColumn: "monday    / span 1" }}>monday</div>
          <div className="weekday" style={{ gridColumn: "tuesday   / span 1" }}>tuesday</div>
          <div className="weekday" style={{ gridColumn: "wednesday / span 1" }}>wednesday</div>
          <div className="weekday" style={{ gridColumn: "thursday  / span 1" }}>thursday</div>
          <div className="weekday" style={{ gridColumn: "friday    / span 1" }}>friday</div>
          <div className="timeslot" style={{ gridRow: "time8 / span 2" }}>8am</div>
          <div className="timeslot" style={{ gridRow: "time9 / span 2" }}>9am</div>
          <div className="timeslot" style={{ gridRow: "time10 / span 2" }}>10am</div>
          <div className="timeslot" style={{ gridRow: "time11 / span 2" }}>11am</div>
          <div className="timeslot" style={{ gridRow: "time12 / span 2" }}>12pm</div>
          <div className="timeslot" style={{ gridRow: "time13 / span 2" }}>1pm</div>
          <div className="timeslot" style={{ gridRow: "time14 / span 2" }}>2pm</div>
          <div className="timeslot" style={{ gridRow: "time15 / span 2" }}>3pm</div>
          <div className="timeslot" style={{ gridRow: "time16 / span 2" }}>4pm</div>
          <div className="timeslot" style={{ gridRow: "time17 / span 2" }}>5pm</div>
          <div className="timeslot" style={{ gridRow: "time18 / span 2" }}>6pm</div>
          <div className="timeslot" style={{ gridRow: "time19 / span 2" }}>7pm</div>
          <div className="timeslot" style={{ gridRow: "time20 / span 2" }}>8pm</div>
          <div className="timeslot" style={{ gridRow: "time21 / span 2" }}>9pm</div>
          <div className="timeslot" style={{ gridRow: "time22 / span 2" }}>10pm</div>
        </div>
      </div>
    )
  }
}

export default Calendar

