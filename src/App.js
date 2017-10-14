import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import Search from "./Components/Search/Search.js";
import Calendar from "./Components/Calendar/Calendar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Calendar/>
      </div>
    );
  }
}

export default App;
