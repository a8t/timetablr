import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionIDs: [],
    }
    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
  }

  

  addMeetingSectionData(newMeetingID) {
    this.setState({
      meetingSectionIDs: [...this.state.meetingSectionIDs, newMeetingID]
    })

  }

  removeMeetingSectionData(meetingIDToRemove) {
    this.setState((prevState) => {
      const index = prevState.meetingSectionIDs.indexOf(meetingIDToRemove)
      prevState.meetingSectionIDs.splice(index,1)

      return {meetingSectionIDs: prevState.meetingSectionIDs}
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar addMeetingSectionData={this.addMeetingSectionData} removeMeetingSectionData={this.removeMeetingSectionData} />
        <Calendar meetingSectionIDs={this.state.meetingSectionIDs}/>
      </div>
    );
  }
}

export default App;
