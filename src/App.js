import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {meetingSectionData: []}
    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
  }

  addMeetingSectionData(newMeetingData) {
    console.log(this.state.meetingSectionData, newMeetingData);
    
    if (this.state.meetingSectionData.reduce((n, val) => n + (val === newMeetingData), 0) < 1) {
      this.setState({
        meetingSectionData: [...this.state.meetingSectionData, newMeetingData]
      })
    }
  }
  
  removeMeetingSectionData(meetingIDToRemove) {
    this.setState((prevState) => {
      const index = prevState.meetingSectionData.indexOf(meetingIDToRemove)
      prevState.meetingSectionData.splice(index,1)

      return {meetingSectionData: prevState.meetingSectionData}
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar addMeetingSectionData={this.addMeetingSectionData} removeMeetingSectionData={this.removeMeetingSectionData} />
        <Calendar meetingSectionData={this.state.meetingSectionData}/>
      </div>
      );
    }
  }
  
  export default App;
  