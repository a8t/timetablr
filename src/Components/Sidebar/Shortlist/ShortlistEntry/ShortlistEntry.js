import React, { Component } from 'react';
import './ShortlistEntry.css';
import MSButton from './MSButton/MSButton';
import { CSSTransitionGroup } from 'react-transition-group';

const ButtonGroup = props => {
  return (
    <div>
      <p>{props.type}</p>
      {props.buttons}
    </div>
  );
};

class ShortlistEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: true,
    };
  }

  toggleCourseInformation() {
    this.setState({
      displayInfo: !this.state.displayInfo,
    });
  }

  handleCloseButtonClick(e) {
    e.stopPropagation();
    this.props.removeFromShortlist({
      code: this.props.code,
      term: this.props.term,
    });
  }

  render() {
    const msSorted = this.props.ms_data.sort((a, b) => (a.code < b.code ? -1 : 1));

    const msDataToButton = msData => (
      <MSButton
        key={msData.id + msData.code}
        eachMSD={msData}
        term={this.props.term}
        code={this.props.code}
        meetingSectionData={this.props.meetingSectionData}
        entryHovered={this.props.entryHovered}
        setEntryHovered={this.props.setEntryHovered}
        addMeetingSectionData={this.props.addMeetingSectionData}
        removeMeetingSectionData={this.props.removeMeetingSectionData}
      />
    );

    const msLectures = msSorted.filter(each => each.code[0] === 'L');
    const msLabs = msSorted.filter(each => each.code[0] === 'P');
    const msTutorials = msSorted.filter(each => each.code[0] === 'T');

    const lectureButtons = msLectures.map(e => msDataToButton(e));
    const labButtons = msLabs.map(e => msDataToButton(e));
    const tutorialButtons = msTutorials.map(e => msDataToButton(e));

    const allButtons = [
      msLectures.length ? <ButtonGroup key="lec" type="Lectures" buttons={lectureButtons} /> : '',
      msLabs.length ? <ButtonGroup key="lab" type="Labs" buttons={labButtons} /> : '',
      msTutorials.length ? (
        <ButtonGroup key="tut" type="Tutorials" buttons={tutorialButtons} />
      ) : (
        ''
      ),
    ];

    const expandedInfo = (
      <div className="showCourseInformation" key="desc">
        <p className="shortlistEntryDesc">{this.props.description}</p>
        {allButtons}
      </div>
    );

    return (
      <div
        className="shortlistEntry"
        key={this.props.code + this.props.term}
        onClick={() => this.toggleCourseInformation()}
        onKeyDown={e => {
          if (e.key === 'Escape') this.toggleCourseInformation();
        }}
      >
        <button className="remove" onClick={e => this.handleCloseButtonClick(e)}>
          <svg>
            <line x1="0" y1="0" x2="12" y2="12" stroke="red" strokeWidth="4" />
            <line x1="0" y1="12" x2="12" y2="0" stroke="red" strokeWidth="4" />
          </svg>
        </button>

        <button className="expandArrow">{this.state.displayInfo ? '🙈' : '🐵'}</button>

        <p className="shortlistEntryCode">{this.props.code}</p>
        <p className="shortlistEntryName">{this.props.name}</p>
        <CSSTransitionGroup
          transitionName="courseInfoFade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.displayInfo ? expandedInfo : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default ShortlistEntry;
