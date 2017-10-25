import React, { Component } from 'react';
import './App.css';
import Calendar from "./Calendar/Calendar";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Counter from "./Counter/Counter"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetingSectionData: [],
      shortlist: [],
      count: 0
    }
    this.currentCoursesAdded = {
      "2017 Fall": {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
      },
      "2018 Winter": {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
      }
    }
    this.addMeetingSectionData = this.addMeetingSectionData.bind(this)
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this)
    this.addToShortlist = this.addToShortlist.bind(this)
    this.removeFromShortlist = this.removeFromShortlist.bind(this)
    this.addToCurrentCoursesAdded = this.addToCurrentCoursesAdded.bind(this)
    this.checkAgainstCurrentCoursesAdded = this.checkAgainstCurrentCoursesAdded.bind(this)
  }





  //
  // decreaseCount() {
  //   this.setState({
  //     count: this.state.count - 1
  //   });
  // }
  //
  // increaseCount() {
  //   this.setState({
  //     count: this.state.count + 1
  //   });
  // }




  addToShortlist(newEntry) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${newEntry.id}`)
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          shortlist: [...this.state.shortlist, jsonResponse]
        })
      })

  }


  addMeetingSectionData(newMeetingData, clicked) {
    if (
      this.state.meetingSectionData.reduce(
        (n, val) => n + (val.code === newMeetingData.code && val.courseCode === newMeetingData.courseCode), 0
      ) >= 2
    ) return


    this.setState({
      meetingSectionData: [...this.state.meetingSectionData, { ...newMeetingData, clicked: clicked }]
    })
    console.log('count', this.state.count, this.state.meetingSectionData);
  }


  removeMeetingSectionData(meetingDataToRemove, clicked) {
    this.setState((prevState) => {
      const revArr = prevState.meetingSectionData.reverse()
      const clickedIndex = revArr.findIndex(i =>
        i.courseCode === meetingDataToRemove.courseCode && i.code === meetingDataToRemove.code && clicked === i.clicked
      )
      const unclickedIndex = revArr.findIndex(i =>
        i.courseCode === meetingDataToRemove.courseCode && i.code === meetingDataToRemove.code
      )

      revArr.splice(clickedIndex > -1 ? clickedIndex : unclickedIndex , 1)

      return { meetingSectionData: revArr.reverse() }
    })
  }


  meetingSectionDataToDayAndTime(newMeetingData) {
    return newMeetingData.course_times.map(eachTime => {
      return {
        day: eachTime.day.toLowerCase(),
        start: eachTime.start,
        end: eachTime.end,
        term: newMeetingData.term
      }
    })
  }

  removeFromShortlist(entryData) {
    this.setState((prevState) => {
      const entryShortlistIndex = prevState.shortlist.findIndex(i => i.code === entryData.code && i.term === entryData.term)
      prevState.shortlist.splice(entryShortlistIndex, 1)

      const msData = prevState.meetingSectionData.filter(each => each.courseCode !== entryData.code && each.term !== entryData.term)

      return { shortlist: prevState.shortlist, meetingSectionData: msData }
    })
  }



  addToCurrentCoursesAdded(meetingDayTimeTerm) {
    meetingDayTimeTerm.forEach(eachDayTimeTermObj => {
      const { day, start, end, term } = eachDayTimeTermObj
      this.currentCoursesAdded[term][day].push({
        start: start,
        end: end
      })
    })
  }

  checkAgainstCurrentCoursesAdded(meetingDayTimeTerm) {
    meetingDayTimeTerm.forEach(eachDayTimeTermObj => {
      const { day, start, end, term } = eachDayTimeTermObj

      this.currentCoursesAdded[term][day].forEach(eachAlreadyAdded => {
        if (
          (start >= eachAlreadyAdded.start && start <= eachAlreadyAdded.end) ||
          (end >= eachAlreadyAdded.start && end <= eachAlreadyAdded.end) ||
          (eachAlreadyAdded.start >= start && eachAlreadyAdded.start <= end) ||
          (eachAlreadyAdded.end >= start && eachAlreadyAdded.end <= end)
        ) { console.log("conflict") };
      })
    })
  }


  render() {

    const updatedCount = this.state.meetingSectionData.filter((data) =>
      data.clicked === 'clicked'
    ).length

    return (
      <div className="App">
        <Navbar />
        <Sidebar
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData}
          addToShortlist={this.addToShortlist}
          removeFromShortlist={this.removeFromShortlist}
          shortlist={this.state.shortlist}
          meetingSectionData = {this.state.meetingSectionData}
          updateCount={this.updateCount}
        />
        <Calendar
          meetingSectionData={this.state.meetingSectionData}
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData}
          updateCount={this.updateCount}
        />
      <Counter count={updatedCount}/>
      </div>
    );
  }
}

export default App;
