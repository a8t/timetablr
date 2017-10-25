import React from 'react';
import './Shortlist.css'
import ShortlistEntry from './ShortlistEntry/ShortlistEntry.js'

const Shortlist = props => {

  const shortlistResults = props.shortlist.map(eachResult =>
    <ShortlistEntry
      key={eachResult.code}
      code={eachResult.code}
      name={eachResult.name}
      description={eachResult.description}
      ms_data={eachResult.ms_data}
      term={eachResult.term}
      addMeetingSectionData={props.addMeetingSectionData}
      removeMeetingSectionData={props.removeMeetingSectionData}
      removeFromShortlist={props.removeFromShortlist}
      meetingSectionData={props.meetingSectionData}
    />
  )

  return (
    <div id="shortlist">
      <p>SHORTLIST</p>
      <div className='shortlistResults'>
        {shortlistResults}
      </div>
    </div>
  )

}

export default Shortlist;
