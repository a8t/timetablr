import React from 'react';
import './Entry.css';

const Entry = props => {
  return (
    <div style={props.style}> 
      <p>{props.courseCode}</p>

    </div>
  )
}

export default Entry