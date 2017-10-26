import React from 'react';
import './MSButton.css'

const MSButton = props => {

  const added = props.meetingSectionData.find(eachAdded => eachAdded.code === props.eachMSD.code && eachAdded.courseCode === props.code)
  const addedClicked = props.meetingSectionData.find(eachAdded => eachAdded.code === props.eachMSD.code && eachAdded.courseCode === props.code && eachAdded.clicked === "clicked")

  const addedTwice = props.meetingSectionData.reduce((n, val) => n + (val.code === props.eachMSD.code && val.courseCode === props.code), 0) >= 2

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
        if (addedTwice) {
          props.removeMeetingSectionData(props.eachMSD, "clicked")
        } else {
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code, }, "clicked")
        }
      }}
      onMouseOver={(e) => { 
        props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
      onMouseLeave={(e) => { 
        props.removeMeetingSectionData(props.eachMSD, "hovered" )}}
    >
      {props.eachMSD.code}
    </button>
  )
}

export default MSButton
