import React, { Component } from 'react';
import Search from "./Search/Search.js";
import Shortlist from "./Shortlist/Shortlist.js";
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shortlist: []
    }
    this.addToShortList = this.addToShortList.bind(this)
  }

  addToShortList(newEntry) {
    this.fetchCourseData(newEntry.id)
    console.log("inside add to shortlist");
  }

  fetchCourseData(courseID) {
      fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${courseID}`)
      .then(response => response.json())
      .then(jsonResponse => this.setState({
        shortlist: [...this.state.shortlist, jsonResponse]
      }))
  }

  render () {
    return (
      <div id='sidebar'>
        <Search addToShortList={this.addToShortList}/>
        <Shortlist addMeetingSectionID={this.props.addMeetingSectionID}
          removeMeetingSectionID={this.props.removeMeetingSectionID}
          shortlist={this.state.shortlist}/>
      </div>
    );
  }
}

export default Sidebar;
