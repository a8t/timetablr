import React from "react";
import "./Entry.css";

const Entry = props => {
  return (
    <div 
      key={props.keyEl}
      style={props.style}
      className="entry"
      onMouseEnter={() => props.setEntryHovered(props.id)}
      onMouseLeave={() => props.setEntryHovered("")}
    >
      <button
        className="removeEntry"
        onClick={e => {
          props.removeMeetingSectionData({ id: props.id }, "clicked")
          props.setEntryHovered("")
        }}
      >x</button>
      <p className="entryText courseCode">{props.courseCode}</p>
      <p className="entryText">{props.code}</p>
    </div>
  )
}

export default Entry
