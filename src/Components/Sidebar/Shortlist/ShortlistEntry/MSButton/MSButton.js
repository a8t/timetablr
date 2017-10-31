import React from "react";
import "./MSButton.css"

const MSButton = props => {

  const {eachMSD, term, code, meetingSectionData, addMeetingSectionData, removeMeetingSectionData, entryHovered, setEntryHovered} = props

  const clicked = meetingSectionData.find(each => each.id === eachMSD.id && each.addMethod === "clicked")

  const styleObj = {
    backgroundColor: clicked ? "lightgreen" : null,
    border: entryHovered === eachMSD.id ? "2px solid blue" : null
  }

  const handleEnter = () => {
    if (clicked) {
      setEntryHovered(eachMSD.id)
    } else {
      addMeetingSectionData({ ...eachMSD, term: term, courseCode: code }, "hovered")
    }
  }

  const handleLeave = () => {
    if (clicked) {
      setEntryHovered("")
    } else {
      removeMeetingSectionData(eachMSD, "hovered")
    }
  }

  const handleClick = e => {
    e.stopPropagation()
    if (clicked) {
      removeMeetingSectionData(eachMSD, "clicked")
      setEntryHovered("")
    } else {
      removeMeetingSectionData(eachMSD, "hovered")
      setEntryHovered(eachMSD.id)
      addMeetingSectionData({ ...eachMSD, term: term, courseCode: code }, "clicked")
    }
  }

  return (
    <button
      className="meetingSection"
      style={styleObj}
      onClick={ e => handleClick(e)}
      onMouseEnter={ () => handleEnter() }
      onMouseLeave={ () => handleLeave() }
      onFocus={ () => handleEnter() }
      onBlur={ () => handleLeave() }
    >
      {props.eachMSD.code}
    </button>
  )
}

export default MSButton
