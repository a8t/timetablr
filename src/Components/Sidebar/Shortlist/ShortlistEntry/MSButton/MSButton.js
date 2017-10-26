import React, { Component } from 'react';
import './MSButton.css'

class MSButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = this.props

    const added = this.props.meetingSectionData.find(eachAdded => eachAdded.code === props.eachMSD.code && eachAdded.courseCode === props.code)
    const addedClicked = this.props.meetingSectionData.find(eachAdded => eachAdded.code === props.eachMSD.code && eachAdded.courseCode === props.code && eachAdded.clicked === "clicked")

    const addedTwice = this.props.meetingSectionData.reduce((n, val) => n + (val.code === props.eachMSD.code && val.courseCode === props.code), 0) >= 2

    let color
    if (addedTwice || addedClicked) {
      color = "#9be04c"
    } else if (added) {
      color = "lightcyan"
    } else {
      color = "white"
    }


    return (
      <button
        className="meetingSection"
        style={{ background: color}}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          !addedTwice ?
          [props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code, }, "clicked")] :
          [props.removeMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "clicked")]
        }}
        onMouseOver={(e) => { 
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
        onMouseLeave={(e) => { 
          props.removeMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
      >
        {props.eachMSD.code}
      </button>
    )
  }
}

export default MSButton
