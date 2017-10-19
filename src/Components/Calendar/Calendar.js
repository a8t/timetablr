import React, {Component} from 'react';
import './Calendar.css';
import Entry from './Entry/Entry.js'

const timeToMilitaryTime = secondsTime => Number.isInteger(secondsTime / 3600) ? secondsTime / 3600 : Math.floor(secondsTime / 3600) + "30"

const colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"]

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionData: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      meetingSectionData: nextProps.meetingSectionData
    })
  }

  sectionDataToEntry(entryJSON) {

    // const color = colors[Math.floor(Math.random() * colors.length)]

    return entryJSON.course_times.map(eachTime => {
      const styleObj = {
        background: "lightblue",
        boxShadow: "0px 4px 10px 1px rgba(118,122,128,.5 )",
        zIndex: "3",
        borderRadius: "2px",
        margin: "2px",
        padding: "5px",
        gridRowStart: 'time' + timeToMilitaryTime(eachTime.start),
        gridRowEnd: 'time' + timeToMilitaryTime(eachTime.end),
        gridColumn: eachTime.day.toLowerCase()
      }

      return (
        <Entry
          style={styleObj}
          courseCode={entryJSON.courseCode}
          instructors={entryJSON.instructors ? entryJSON.instructors : ""}
          timeStart={eachTime.start / 3600 % 12}
          timeEnd={eachTime.end / 3600 % 12}
          key={entryJSON.courseCode + eachTime.day + eachTime.start}/>) }
    )
  }

  render () {

    const sectionsDataArray = this.state.meetingSectionData
    const fallEntries = sectionsDataArray.filter(eachSectionData => eachSectionData.term === "2017 Fall").map(eachSectionData => this.sectionDataToEntry(eachSectionData))
    const winterEntries = sectionsDataArray.filter(eachSectionData => eachSectionData.term === "2018 Winter").map(eachSectionData => this.sectionDataToEntry(eachSectionData))

    return (
      <div id="calendars">
        <div id='calendarFall'>
          {fallEntries}
          <div className="weekday line"           style={{gridColumn: "start     / span 1"}}></div>
          <div className="weekday line"           style={{gridColumn: "monday    / span 1"}}>MO</div>
          <div className="weekday line"           style={{gridColumn: "tuesday   / span 1"}}>TU</div>
          <div className="weekday line"           style={{gridColumn: "wednesday / span 1"}}>WE</div>
          <div className="weekday line"           style={{gridColumn: "thursday  / span 1"}}>TH</div>
          <div className="weekday"           style={{gridColumn: "friday    / span 1"}}>FR</div>
          <div className="time"              style={{gridRow: "time     / span 2"}}></div>
          <div className="timeslot"          style={{gridRow: "time8    / span 2"}}>8am</div>
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
          {winterEntries}
          <div className="weekday line"           style={{gridColumn: "start     / span 1"}}></div>
          <div className="weekday line"           style={{gridColumn: "monday    / span 1"}}>MO</div>
          <div className="weekday line"           style={{gridColumn: "tuesday   / span 1"}}>TU</div>
          <div className="weekday line"           style={{gridColumn: "wednesday / span 1"}}>WE</div>
          <div className="weekday line"           style={{gridColumn: "thursday  / span 1"}}>TH</div>
          <div className="weekday"           style={{gridColumn: "friday    / span 1"}}>FR</div>
          <div className="timeslot"          style={{gridRow: "time8    / span 2"}}>8am</div>
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
}

export default Calendar
