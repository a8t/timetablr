import React from "react";
import styles from "./MSButton.css"

const MSButton = props => {

  const added = props.meetingSectionData.find(eachAdded => eachAdded.id === props.eachMSD.id)
  const addedClicked = props.meetingSectionData.find(eachAdded => eachAdded.id === props.eachMSD.id && eachAdded.addMethod === "clicked")

  let color, border
  if (addedClicked) {
    color = "lightgreen"
  } else if (added) {
    color = "lightcyan"
  } else {
    color = "white"
  }

  if (props.entryHovered == props.eachMSD.id) {
    border = "2px solid blue"
  }
  console.log(props.entryHovered, props.eachMSD.id );

  return (
    <button
      className="meetingSection"
      style={{ background: color, border: border}}
      onClick={(e) => {
        e.stopPropagation()
        if (addedClicked) {
          props.removeMeetingSectionData(props.eachMSD, "clicked")
          props.setEntryHovered("")
        } else {
          props.removeMeetingSectionData(props.eachMSD, "hovered")    
          props.setEntryHovered(props.eachMSD.id)
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code, }, "clicked")
        }
      }}
      onMouseEnter={(e) => { 
        if(addedClicked){
          props.setEntryHovered(props.eachMSD.id)
        } else {
          props.addMeetingSectionData({ ...props.eachMSD, term: props.term, courseCode: props.code }, "hovered" )}}
        }
      onMouseLeave={(e) => {
        if (addedClicked) {
          props.setEntryHovered("")
        } else {
          props.removeMeetingSectionData(props.eachMSD, "hovered" )}}
        }
    >
      {props.eachMSD.code}
    </button>
  )
}

export default MSButton
