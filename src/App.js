import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionIDs: [4, 69, 96],
    }
    this.addMeetingSectionID = this.addMeetingSectionID.bind(this)
    this.removeMeetingSectionID = this.removeMeetingSectionID.bind(this)
  }

  addMeetingSectionID(newMeetingID) {
    this.setState({
      meetingSectionIDs: [...this.state.meetingSectionIDs, newMeetingID]
    })

  }

  removeMeetingSectionID(meetingIDToRemove) {
    this.setState((prevState) => {
      const index = prevState.meetingSectionIDs.indexOf(meetingIDToRemove)
      prevState.meetingSectionIDs.splice(index,1)

      return {meetingSectionIDs: prevState.meetingSectionIDs}
    })
  }

  render() {
    console.log(this.state.meetingSectionIDs)
    return (
      <div className="App">
        <Sidebar addMeetingSectionID={this.addMeetingSectionID} removeMeetingSectionID={this.removeMeetingSectionID} />
        <Calendar meetingSectionIDs={this.state.meetingSectionIDs}/>
      </div>
    );
  }
}

export default App;
