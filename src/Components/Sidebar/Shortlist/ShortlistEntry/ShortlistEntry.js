import React from 'react';
import './ShortlistEntry.css'

const ShortlistEntry = props => {

  return (
    <div>{props.code}: {props.name}</div>
  )

}

export default ShortlistEntry;
