import React, { Component } from 'react';
import './App.css';
import Calendar from "./Components/Calendar/Calendar.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionIDs: [3, 4, 2346, 13000],
      shortlist: []
    }
    this.addToShortList = this.addToShortList.bind(this)
  }

  addToShortList(newEntry) {
    this.setState({
      shortlist: [...this.state.shortlist, newEntry]
    })
  }


  render() {
    console.log(this.state.shortlist);
    return (
      <div className="App">
        <Sidebar addToShortList={this.addToShortList} shortlist={this.state.shortlist}/>
        <Calendar meetingSectionIDs={this.state.meetingSectionIDs}/>
      </div>
    );
  }
}

export default App;
