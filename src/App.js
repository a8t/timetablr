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
  }


  addToShortlist(newEntry) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${newEntry.id}`)
      .then(response => response.json())
      .then(jsonResponse => this.setState({
        shortlist: [...this.state.shortlist, jsonResponse]
      }))
  }

  removeFromShortlist(entryData){

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
          shortlist={this.state.shortlist}/>
        <Calendar meetingSectionData={this.state.meetingSectionData}/>
      </div>
      );
    }
  }
  
  export default App;
  