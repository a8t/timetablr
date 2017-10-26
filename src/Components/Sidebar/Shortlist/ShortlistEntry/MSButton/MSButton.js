import React from 'react';
import './MSButton.css'

const MSButton = props => {

  const added = props.meetingSectionData.find(eachAdded => eachAdded.id === props.eachMSD.id)
  const addedClicked = props.meetingSectionData.find(eachAdded => eachAdded.id === props.eachMSD.id && eachAdded.addMethod === "clicked")

  let color
  if (addedClicked) {
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
        if (addedClicked) {
          props.removeMeetingSectionData(props.eachMSD, "clicked")
        } else {
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code, }, "clicked")
        }
      }}
      onMouseOver={(e) => { 
        props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
      onMouseLeave={(e) => { 
        props.removeMeetingSectionData(props.eachMSD, "hovered" )}}
      onFocus={(e) => { 
        props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
      onBlur={(e) => { 
        props.removeMeetingSectionData(props.eachMSD, "hovered" )}}
    >
      {props.eachMSD.code}
    </button>
  )
}

export default MSButton
