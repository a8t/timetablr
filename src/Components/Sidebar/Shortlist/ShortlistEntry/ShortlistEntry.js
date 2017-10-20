import React, {Component} from 'react';
import './ShortlistEntry.css'
import MSButton from './MSButton/MSButton'

class ShortlistEntry extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayInfo: false
    }
  }

  toggleCourseInformation() {
    this.setState({
      displayInfo: !this.state.displayInfo
    })
  }

  render (){

    const msData = this.props.ms_data.map(eachMSD =>
      <MSButton
        key={eachMSD.id + eachMSD.code}
        eachMSD={eachMSD}
        addMeetingSectionData={ this.props.addMeetingSectionData}
        removeMeetingSectionData={this.props.removeMeetingSectionData}
        term={this.props.term}
        code={this.props.code}
        meetingSectionData={this.props.meetingSectionData}
      />)

    return (
      <div onClick={() => this.toggleCourseInformation()} className="shortlistEntry" key={this.props.code + this.props.term}>
        <button 
          className="remove"
          onClick={(e) => {
            e.stopPropagation()
            this.props.removeFromShortlist({
              code: this.props.code,
              term: this.props.term
            })
          }}
        >x</button>
        <button className="expandArrow">
          {this.state.displayInfo ? "^" : "v"}
        </button>
        <p className="shortlistEntryCode">
          {this.props.code}
        </p>
        <p className="shortlistEntryName">
          {this.props.name}
        </p>
        <div className='showCourseInformation' style={{ display: this.state.displayInfo ? 'block' : 'none', overflow: 'auto'}}>
          <p className="shortlistEntryDesc">
            {this.props.description}
          </p>
            {msData}
        </div>

      </div>
    )
  }
}

export default ShortlistEntry
