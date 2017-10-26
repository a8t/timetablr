import React, { Component } from 'react';
import './App.css';
import Calendar from "./Calendar/Calendar";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Counter from "./Counter/Counter"
import Entry from './Calendar/Entry/Entry'
import { loadState} from "./localState"

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

  componentWillMount(){
    const loadState = () => {
      try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
          return undefined
        }
        return JSON.parse(serializedState)
      } catch (err) {
        return undefined
      }
    }

    if (loadState()) this.setState(loadState())

    const saveState = (e) => {
      try {
        const serializedState = JSON.stringify(this.state)
        localStorage.setItem('state', serializedState)
      } catch (err) {
        return undefined
      }
    }
    

    window.addEventListener("beforeunload", saveState)
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
        (n, val) => n + (val.id === newMeetingData.id), 0
      ) >= 2
    ) return

    // const meetingSectionDataToDayAndTime = (newMeetingData) => {
    //   return newMeetingData.course_times.map(eachTime => {
    //     return {
    //       day: eachTime.day.toLowerCase(),
    //       start: eachTime.start,
    //       end: eachTime.end,
    //       term: newMeetingData.term
    //     }
    //   })
    // }

    // if (clicked == "clicked") {
    //   this.addToCurrentCoursesAdded(meetingSectionDataToDayAndTime(newMeetingData))
    // }
    
    this.setState({
      meetingSectionData: [{ ...newMeetingData, clicked: clicked }, ...this.state.meetingSectionData, ]
    })
  }

  removeMeetingSectionData(meetingDataToRemove, clicked) {
    
    this.setState((prevState) => {
      
      const index = prevState.meetingSectionData.findIndex(i =>
        i.id === meetingDataToRemove.id &&  i.clicked === clicked
      )
      
      return { meetingSectionData: [
        ...prevState.meetingSectionData.slice(0, index),
        ...prevState.meetingSectionData.slice(index+1)
      ]}
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
          background:   entryJSON.clicked === "hovered" ? "lightgreen" : "#0ba7b7",
          gridRowStart: 'time' + timeToMilitaryTime(eachTime.start),
          gridRowEnd:   'time' + timeToMilitaryTime(eachTime.end),
          gridColumn:   eachTime.day.toLowerCase() + "/ span 2"
        }       
        
        return (
          <Entry
            code={entryJSON.code}
            id={entryJSON.id}
            style={styleObj}
            courseCode={entryJSON.courseCode}
            timeStart={eachTime.start / 3600 % 12}
            timeEnd={eachTime.end / 3600 % 12}
            key={entryJSON.courseCode + eachTime.day + eachTime.start} 
            removeMeetingSectionData={this.removeMeetingSectionData}
          />
        )
      }
    )
  }
  
    const fallCourses   = this.state.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2017 Fall")
    const fallEntries   = fallCourses.reverse().map(eachSectionData => sectionDataToEntry(eachSectionData))
    
    const winterCourses = this.state.meetingSectionData.filter(eachSectionData => eachSectionData.term === "2018 Winter")
    const winterEntries = winterCourses.reverse().map(eachSectionData => sectionDataToEntry(eachSectionData))
    
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
