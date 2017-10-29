import React, { Component } from "react";
import "./App.css";
import Calendar from "./Calendar/Calendar";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Counter from "./Counter/Counter"
import Entry from "./Calendar/Entry/Entry"
import { loadState } from "./LocalState";
const timeToMilitaryTime = secondsTime => Number.isInteger(secondsTime / 3600) ? secondsTime / 3600 : Math.floor(secondsTime / 3600) + "30"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionData: [],
      shortlist: [],
      entryHovered: ""
    }

    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
    this.addToShortlist = this.addToShortlist.bind(this)
    this.removeFromShortlist = this.removeFromShortlist.bind(this)
    this.setEntryHovered = this.setEntryHovered.bind(this)
  }

  componentDidMount(){
    const saveState = e => {
      e.preventDefault()
      try {
        const serializedState = JSON.stringify({ ...this.state, entryHovered: "" })
        localStorage.setItem("state", serializedState)
        e.returnValue = "Make sure you save!";
        return "Make sure you save!"
      } catch (err) {
        return undefined
      }
    }

    if (this.props.match.url.slice(1)) {
      fetch(`https://timetablrca.firebaseio.com/URLs/${this.props.match.url.slice(1)}.json`)
        .then(response => response.json())
        .then(jsonResponse => this.setState(JSON.parse(jsonResponse)))
      
    } else if (loadState()) this.setState(loadState())

    window.addEventListener("beforeunload", saveState)
  }


  async addToShortlist(newEntry) {
    const response = await fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${newEntry.id}`)
    const jsonResponse = await response.json()
    this.setState({
      shortlist: [jsonResponse, ...this.state.shortlist]
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


  addMeetingSectionData(newMeetingData, addMethod) {
    if (
      this.state.meetingSectionData.reduce((n, val) => n + (val.id === newMeetingData.id && val.addMethod === addMethod), 0) >= 1
    ) return
    
    this.setState({
      meetingSectionData: [
        { ...newMeetingData, addMethod: addMethod }, 
        ...this.state.meetingSectionData, 
      ]
    })
  }

  removeMeetingSectionData(meetingDataToRemove, addMethod) {
    this.setState((prevState) => {
      
      const index = prevState.meetingSectionData.findIndex(i =>
        i.id === meetingDataToRemove.id && i.addMethod === addMethod
      )
      
      return index >= 0 && { meetingSectionData: [
        ...prevState.meetingSectionData.slice(0, index),
        ...prevState.meetingSectionData.slice(index+1)
      ]}
    })
  }

  setEntryHovered(id) {
    this.setState({
      entryHovered: id
    })
  }

  render() {
    
    const addedCoursesCount = this.state.meetingSectionData.filter(data => data.addMethod === "clicked").length

    const sectionDataToEntry = entryJSON => {
      return entryJSON.course_times.map(eachTime => {

        let background, zIndex

        if (this.state.entryHovered === entryJSON.id) {
          background = "#53CBA4"
          zIndex = 4
        } else if (entryJSON.addMethod === "hovered") {
          background = "lightgreen"
          zIndex = 4          
        } else {
          background = "#0ba7b7"
          zIndex = 3
        }

        const styleObj = {
          zIndex:       zIndex,
          background:   background,
          gridRowStart: "time" + timeToMilitaryTime(eachTime.start),
          gridRowEnd:   "time" + timeToMilitaryTime(eachTime.end),
          gridColumn:   eachTime.day.toLowerCase() + "/ span 2"
        }       
        
        return (
          <Entry
            setEntryHovered={this.setEntryHovered}
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
        <Navbar 
          data={JSON.stringify({ ...this.state, entryHovered: "" })}
        />
        <Sidebar
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData}
          addToShortlist={this.addToShortlist}
          removeFromShortlist={this.removeFromShortlist}
          shortlist={this.state.shortlist}
          meetingSectionData = {this.state.meetingSectionData}
          setEntryHovered={this.setEntryHovered}
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