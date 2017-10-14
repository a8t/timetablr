import React, { Component } from 'react';
import './App.css';
import Search from "./Components/Search/Search.js";
import Calendar from "./Components/Calendar/Calendar.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionIDs: [3, 4, 2346, 13000]
    }
  }
  
  render() {
    return (
      <div className="App">
        <Search/>
        <Calendar meetingSectionIDs={this.state.meetingSectionIDs}/>
      </div>
    );
  }
}

export default App;
