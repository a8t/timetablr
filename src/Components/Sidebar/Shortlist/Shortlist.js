import React from 'react';
import './Shortlist.css'
import ShortlistEntry from './ShortlistEntry/ShortlistEntry.js'

const Shortlist = props => {

  const shortlistResults = props.shortlist.map(eachResult => <ShortlistEntry code={eachResult.code} name={eachResult.name}/>)

  return (
    <div id="shortlist">
      <p>shortlist</p>
      {shortlistResults}
    </div>
  )

}

export default Shortlist;
