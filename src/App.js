import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionIDs: [3, 4, 2346, 13000],
    }
  }



  render() {
    return (
      <div className="App">
        <Sidebar />
        <Calendar meetingSectionIDs={this.state.meetingSectionIDs}/>
      </div>
    );
  }
}

export default App;
