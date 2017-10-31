import React, { Component } from "react";
import "./App.css";
import Calendars from "./Calendar/Calendars";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Counter from "./Counter/Counter"
import { loadState } from "./LocalState";


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
    
    this.setState(prevState => {
      return {
        meetingSectionData: [
          { ...newMeetingData, addMethod: addMethod }, 
          ...prevState.meetingSectionData, 
        ]
      }}
    )
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
          entryHovered={this.state.entryHovered}
          setEntryHovered={this.setEntryHovered}
        />
        <Calendars
          entryHovered={this.state.entryHovered}
          setEntryHovered={this.setEntryHovered}
          removeMeetingSectionData={this.removeMeetingSectionData}
          meetingSectionData={this.state.meetingSectionData}
        />
        <Counter count={addedCoursesCount}/>
      </div>
    );
  }
}

export default App;