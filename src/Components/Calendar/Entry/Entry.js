import React from 'react';
import './Entry.css';

const Entry = props => {
  return (
    <div style={props.style} className="entry"> 
      <p className="entryText courseCode">{props.courseCode}</p>
      <p className="entryText">{props.code}</p>
    </div>
  )
}

export default Entry