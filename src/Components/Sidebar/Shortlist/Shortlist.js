import React from 'react';

const Shortlist = props => {

  const shortlistResults = props.shortlist.map(eachResult => <div>{eachResult.code}: {eachResult.name}</div>)

  return (
    <div>
      {shortlistResults}
    </div>
  )

}

export default Shortlist;
