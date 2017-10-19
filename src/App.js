import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { meetingSectionData: [], shortlist: [] }
    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
    this.addToShortlist = this.addToShortlist.bind(this)
    this.removeFromShortlist = this.removeFromShortlist.bind(this)
  }


  addToShortlist(newEntry) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${newEntry.id}`)
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          shortlist: [...this.state.shortlist, jsonResponse]
        })
      })
      
  }

  removeFromShortlist(entryData){
    this.setState((prevState) => {
      const entryShortlistIndex = prevState.shortlist.findIndex(i => i.code === entryData.code && i.term === entryData.term)
      prevState.shortlist.splice(entryShortlistIndex, 1)

      const msData = prevState.meetingSectionData.filter(each => each.courseCode != entryData.code && each.term != entryData.term)

      return { shortlist: prevState.shortlist, meetingSectionData: msData }
    })
  }

  addMeetingSectionData(newMeetingData) {
    if (this.state.meetingSectionData.reduce((n, val) => n + (val.code === newMeetingData.code && val.courseCode === newMeetingData.courseCode), 0) >= 2) return

    this.setState({
      meetingSectionData: [...this.state.meetingSectionData, newMeetingData]
    })
  }
  
  removeMeetingSectionData(meetingDataToRemove) {
    this.setState((prevState) => {
      const index = prevState.meetingSectionData.findIndex(i => i.courseCode === meetingDataToRemove.courseCode && i.code === meetingDataToRemove.code)
      prevState.meetingSectionData.splice(index,1)

      return {meetingSectionData: prevState.meetingSectionData}
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar 
          addMeetingSectionData={this.addMeetingSectionData} 
          removeMeetingSectionData={this.removeMeetingSectionData} 
          addToShortlist={this.addToShortlist}
          removeFromShortlist={this.removeFromShortlist}
          shortlist={this.state.shortlist}/>
        <Calendar 
          meetingSectionData={this.state.meetingSectionData}
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData} 
        />
      </div>
      );
    }
  }
  
  export default App;
  