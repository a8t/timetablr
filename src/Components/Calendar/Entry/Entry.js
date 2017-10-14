import React from 'react';
import './Entry.css';

const Entry = props => {
  return (
    <div style={props.style}> 
      <p>{props.courseCode}</p>
      <p>{props.instructor}</p>
      <p>{props.timeStart}—{props.timeEnd}</p> 
    </div>
  )
}

export default Entry