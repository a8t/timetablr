import React, { Component } from 'react';

class Shortlist extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const props = this.props
    const shortlistResults = this.props.shortlist.map(eachResult => <div>{eachResult.code}: {eachResult.name}</div>)


    return (
      <div>
        {shortlistResults}
      </div>
    )
  }
}

export default Shortlist;
