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
        <Search 
          addToShortList={this.addToShortList}
          shortlistCodes={this.state.shortlist.map(each => each.code+each.term)}
        />
        <Shortlist 
          addMeetingSectionData={this.props.addMeetingSectionData}
          removeMeetingSectionData={this.props.removeMeetingSectionData}
          shortlist={this.state.shortlist}
        />
      </div>
    );
  }
}

export default Sidebar;
