import React, {Component} from 'react';
import './ShortlistEntry.css'

class ShortlistEntry extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayInfo: false
    }
    this.toggleCourseInformation = this.toggleCourseInformation.bind(this)
  }

  toggleCourseInformation() {
    this.setState({
      displayInfo: !this.state.displayInfo
    })
  }

  render (){

    const msData = this.props.ms_data.map(eachMSD =>
      <button
        key={eachMSD.id}
        className="meetingSection"
        style={{margin: "2px"}}
        onClick={(e) => { e.target.className="meetingSection clicked";
          console.log("clicked course", e.target.style);
          e.preventDefault(); e.stopPropagation(); this.props.addMeetingSectionData({...eachMSD, term: this.props.term, courseCode: this.props.code, }) }}
        onMouseOver={(e) => { this.props.addMeetingSectionData({...eachMSD, term: this.props.term, courseCode: this.props.code}) }}
        onMouseLeave={(e) => { this.props.removeMeetingSectionData({...eachMSD, term: this.props.term, courseCode: this.props.code}) }}
      >
        {eachMSD.code}
      </button>)

    return (
      <div onClick={() => this.toggleCourseInformation()} className="shortlistEntry">
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
