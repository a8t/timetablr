import React, { Component } from 'react';
import './App.css';
import Calendar from "./Calendar/Calendar";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Counter from "./Counter/Counter"
import Entry from './Calendar/Entry/Entry.js'

const timeToMilitaryTime = secondsTime => Number.isInteger(secondsTime / 3600) ? secondsTime / 3600 : Math.floor(secondsTime / 3600) + "30"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionData: [],
      shortlist: [],
    }
    this.currentCoursesAdded = {
      "2017 Fall": {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
      },
      "2018 Winter": {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
      }
    }
    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
    this.addToShortlist = this.addToShortlist.bind(this)
    this.removeFromShortlist = this.removeFromShortlist.bind(this)
    this.addToCurrentCoursesAdded = this.addToCurrentCoursesAdded.bind(this)
    this.isConflicting = this.isConflicting.bind(this)
  }

  addToShortlist(newEntry) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${newEntry.id}`)
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          shortlist: [jsonResponse, ...this.state.shortlist]
        })
      })

  }

  removeFromShortlist(entryData) {
    this.setState((prevState) => {

      const entryShortlistIndex = prevState.shortlist.findIndex(i => i.code === entryData.code && i.term === entryData.term)

      const msData = prevState.meetingSectionData.filter(each => each.courseCode !== entryData.code)

      return {
        shortlist: [
          ...prevState.shortlist.slice(0, entryShortlistIndex),
          ...prevState.shortlist.slice(entryShortlistIndex + 1)
        ],
        meetingSectionData: msData
      }
    })
  }


  addMeetingSectionData(newMeetingData, clicked) {
    if (
      this.state.meetingSectionData.reduce(
        (n, val) => n + (val.code === newMeetingData.code && val.courseCode === newMeetingData.courseCode), 0
      ) >= 2
    ) return

    const meetingSectionDataToDayAndTime = (newMeetingData) => {
      return newMeetingData.course_times.map(eachTime => {
        return {
          day: eachTime.day.toLowerCase(),
          start: eachTime.start,
          end: eachTime.end,
          term: newMeetingData.term
        }
      })
    }

    if (clicked == "clicked") {
      this.addToCurrentCoursesAdded(meetingSectionDataToDayAndTime(newMeetingData))
    }

    this.setState({
      meetingSectionData: [...this.state.meetingSectionData, { ...newMeetingData, clicked: clicked }]
    })
  }

  removeMeetingSectionData(meetingDataToRemove, clicked) {
    this.setState((prevState) => {
      const revArr = prevState.meetingSectionData.reverse()
      const clickedIndex = revArr.findIndex(i =>
        i.courseCode === meetingDataToRemove.courseCode && i.code === meetingDataToRemove.code && clicked === i.clicked
      )
      const unclickedIndex = revArr.findIndex(i =>
        i.courseCode === meetingDataToRemove.courseCode && i.code === meetingDataToRemove.code
      )

      revArr.splice(clickedIndex > -1 ? clickedIndex : unclickedIndex , 1)

      return { meetingSectionData: revArr.reverse() }
    })
  }

  addToCurrentCoursesAdded(meetingDayTimeTerm) {
    meetingDayTimeTerm.forEach(eachDayTimeTermObj => {
      const { day, start, end, term } = eachDayTimeTermObj
      this.currentCoursesAdded[term][day].push({
        start: start,
        end: end
      })
    })
  }

  isConflicting(meetingDayTimeTerm) {
    meetingDayTimeTerm.forEach(eachDayTimeTermObj => {
      const { day, start, end, term } = eachDayTimeTermObj

      this.currentCoursesAdded[term][day].forEach(eachAlreadyAdded => {
        if (
          (start >= eachAlreadyAdded.start && start <= eachAlreadyAdded.end) ||
          (end >= eachAlreadyAdded.start && end <= eachAlreadyAdded.end) ||
          (eachAlreadyAdded.start >= start && eachAlreadyAdded.start <= end) ||
          (eachAlreadyAdded.end >= start && eachAlreadyAdded.end <= end)
        ) { return true };
      })

      return false
    })
  }


  render() {

    const addedCoursesCount = this.state.meetingSectionData.filter(data => data.clicked === 'clicked').length

    const sectionDataToEntry = entryJSON => {
      return entryJSON.course_times.map(eachTime => {
        const styleObj = {
          opacity:      entryJSON.clicked === "clicked" ? 1 : 0.5,
          gridRowStart: 'time' + timeToMilitaryTime(eachTime.start),
          gridRowEnd:   'time' + timeToMilitaryTime(eachTime.end),
          gridColumn:   eachTime.day.toLowerCase() + "/ span 2"
        }        

        return (
          <Entry
            code={entryJSON.code}
            style={styleObj}
            courseCode={entryJSON.courseCode}
            instructors={entryJSON.instructors ? entryJSON.instructors : ""}
            timeStart={eachTime.start / 3600 % 12}
            timeEnd={eachTime.end / 3600 % 12}
            removeMeetingSectionData={this.removeMeetingSectionData}
            key={entryJSON.courseCode + eachTime.day + eachTime.start} 
          />
        )
      }
    )
  }
  
    const fallCourses   = this.state.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2017 Fall")
    const fallEntries   = fallCourses.map(eachSectionData => sectionDataToEntry(eachSectionData))
    
    const winterCourses = this.state.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2018 Winter")
    const winterEntries = winterCourses.map(eachSectionData => sectionDataToEntry(eachSectionData))

    return (
      <div className="App">
        <Navbar />
        <Sidebar
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData}
          addToShortlist={this.addToShortlist}
          removeFromShortlist={this.removeFromShortlist}
          shortlist={this.state.shortlist}
          meetingSectionData = {this.state.meetingSectionData}
        />
        <Calendar
          fallEntries={fallEntries}
          winterEntries={winterEntries}
        />
      <Counter count={addedCoursesCount}/>
      </div>
    );
  }
}

export default App;
