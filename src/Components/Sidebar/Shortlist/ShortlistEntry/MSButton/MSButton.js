import React, { Component } from 'react';
import './MSButton.css'

class MSButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props

    const added = this.props.meetingSectionData.find(eachAdded => eachAdded.code === props.eachMSD.code && eachAdded.courseCode === props.code)
    
    return (
      <button
        className="meetingSection"
        style={{ background: added ? "lightgreen" : "white"}}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code, }, true)
        }}
        onMouseOver={(e) => { props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }) }}
        onMouseLeave={(e) => {props.removeMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }) }}
      >
        {props.eachMSD.code}
      </button>
    )
  }
}

export default MSButton
