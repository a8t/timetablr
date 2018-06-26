import React, { Component } from 'react';
import './App.css';
import Calendars from './Calendar/Calendars';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import Counter from './Counter/Counter';
import { loadState } from './LocalState';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingSectionData: [],
      shortlist: [],
      entryHovered: '',
    };

    this.addMeetingSectionData = this.addMeetingSectionData.bind(this);
    this.removeMeetingSectionData = this.removeMeetingSectionData.bind(this);
    this.addToShortlist = this.addToShortlist.bind(this);
    this.removeFromShortlist = this.removeFromShortlist.bind(this);
    this.setEntryHovered = this.setEntryHovered.bind(this);
  }

  async componentDidMount() {
    const saveState = e => {
      e.preventDefault();
      try {
        const serializedState = JSON.stringify({ ...this.state, entryHovered: '' });
        localStorage.setItem('state', serializedState);
        e.returnValue = 'Make sure you save!';
        return 'Make sure you save!';
      } catch (err) {
        return undefined;
      }
    };

    if (this.props.match.url.slice(1)) {
      try {
        const url = `https://timetablrca.firebaseio.com/URLs/${this.props.match.url.slice(1)}.json`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        this.setState(JSON.parse(jsonResponse));
      } catch (error) {
        console.log(error);
      }
    } else if (loadState()) this.setState(loadState());

    window.addEventListener('beforeunload', saveState);

    this.addToShortlist({ id: 311 });
    this.addMeetingSectionData(
      {
        code: 'L0101',
        courseCode: 'APS110H1F',
        course_times: [
          {
            created_at: '2017-10-15T16:05:44.868Z',
            day: 'FRIDAY',
            duration: 3600,
            end: 43200,
            id: 737,
            location: 'SF 1105',
            meeting_section_id: 667,
            start: 39600,
            updated_at: '2017-10-15T16:05:44.868Z',
          },
          {
            created_at: '2017-10-15T16:05:44.877Z',
            day: 'WEDNESDAY',
            duration: 3600,
            end: 36000,
            id: 738,
            location: 'SF 1105',
            meeting_section_id: 667,
            start: 32400,
            updated_at: '2017-10-15T16:05:44.877Z',
          },
          {
            created_at: '2017-10-15T16:05:44.882Z',
            day: 'MONDAY',
            duration: 3600,
            end: 36000,
            id: 739,
            location: 'SF 1105',
            meeting_section_id: 667,
            start: 32400,
            updated_at: '2017-10-15T16:05:44.882Z',
          },
        ],
        id: 667,
        term: '2017 Fall',
      },
      'clicked'
    );
  }

  async addToShortlist(newEntry) {
    try {
      const url = `https://tbd-scheduler-v1.herokuapp.com/courses/get_data?course_id=${
        newEntry.id
      }`;
      const response = await fetch(url);
      const jsonResponse = await response.json();

      this.setState({
        shortlist: [jsonResponse, ...this.state.shortlist],
      });
    } catch (error) {
      console.log(error);
    }
  }

  removeFromShortlist(entryData) {
    this.setState(prevState => {
      const entryIndex = prevState.shortlist.findIndex(
        i => i.code === entryData.code && i.term === entryData.term
      );
      const msData = prevState.meetingSectionData.filter(
        each => each.courseCode !== entryData.code
      );
      return {
        shortlist: [
          ...prevState.shortlist.slice(0, entryIndex),
          ...prevState.shortlist.slice(entryIndex + 1),
        ],
        meetingSectionData: msData,
      };
    });
  }

  addMeetingSectionData(newMSD, addMethod) {
    this.setState(prevState => {
      const prevMSD = prevState.meetingSectionData;

      const alreadyAddedCount = prevMSD.reduce(
        (n, val) => n + (val.id === newMSD.id && val.addMethod === addMethod),
        0
      );

      if (alreadyAddedCount >= 1) return;

      return {
        meetingSectionData: [{ ...newMSD, addMethod: addMethod }, ...prevMSD],
      };
    });
  }

  removeMeetingSectionData(removeData, addMethod) {
    this.setState(prevState => {
      const prevMSD = prevState.meetingSectionData;

      const index = prevMSD.findIndex(i => i.id === removeData.id && i.addMethod === addMethod);

      return (
        index >= 0 && {
          meetingSectionData: [...prevMSD.slice(0, index), ...prevMSD.slice(index + 1)],
        }
      );
    });
  }

  setEntryHovered(id) {
    this.setState({
      entryHovered: id,
    });
  }

  render() {
    const addedCoursesCount = this.state.meetingSectionData.filter(
      data => data.addMethod === 'clicked'
    ).length;

    return (
      <div id="App">
        <Navbar data={JSON.stringify({ ...this.state, entryHovered: '' })} />
        <Sidebar
          addMeetingSectionData={this.addMeetingSectionData}
          removeMeetingSectionData={this.removeMeetingSectionData}
          addToShortlist={this.addToShortlist}
          removeFromShortlist={this.removeFromShortlist}
          shortlist={this.state.shortlist}
          meetingSectionData={this.state.meetingSectionData}
          entryHovered={this.state.entryHovered}
          setEntryHovered={this.setEntryHovered}
        />
        <Calendars
          entryHovered={this.state.entryHovered}
          setEntryHovered={this.setEntryHovered}
          removeMeetingSectionData={this.removeMeetingSectionData}
          meetingSectionData={this.state.meetingSectionData}
        />
        <Counter count={addedCoursesCount} />
      </div>
    );
  }
}

export default App;
