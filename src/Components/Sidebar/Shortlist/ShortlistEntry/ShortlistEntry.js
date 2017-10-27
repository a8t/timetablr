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

    const msSorted = this.props.ms_data.sort((a, b) => {
      if (a.code < b.code) {
        return -1
      } else {
        return 1
      }
    })

    const msDataToButton = msData =>
      <MSButton
        key={msData.id + msData.code}
        eachMSD={msData}
        addMeetingSectionData={this.props.addMeetingSectionData}
        removeMeetingSectionData={this.props.removeMeetingSectionData}
        term={this.props.term}
        code={this.props.code}
        meetingSectionData={this.props.meetingSectionData}
      />

    const msLectures  = msSorted.filter(each => each.code[0]==="L")
    const msLabs      = msSorted.filter(each => each.code[0]==="P")
    const msTutorials = msSorted.filter(each => each.code[0]==="T")

    const lectureButtons  = msLectures.map(e => msDataToButton(e))
    const labButtons      = msLabs.map(e => msDataToButton(e))
    const tutorialButtons = msTutorials.map(e => msDataToButton(e))
    


    return (
      <div 
        onClick={() => this.toggleCourseInformation()} 
        className="shortlistEntry" key={this.props.code + this.props.term}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            this.toggleCourseInformation()
          }
        }}
      >
        <button
          className="remove"
          onClick={(e) => {
            e.stopPropagation()
            this.props.removeFromShortlist({
              code: this.props.code,
              term: this.props.term
            })
          }}
        >
          x
        </button>
        <button className="expandArrow">
          {this.state.displayInfo ? "🙈" : "🐵"}
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
          <p>
            {lectureButtons[0] ? "Lectures" : ""}
            {lectureButtons[0] ? <br/> : ""}
            {lectureButtons}
          </p>
          <p>
            {labButtons[0] ? "Labs" : ""}
            {labButtons[0] ? <br /> : ""}
            { labButtons }
          </p>
          <p>
            {tutorialButtons[0] ? "Tutorials" : ""}
            {tutorialButtons[0] ? <br /> : ""}
            {tutorialButtons}
          </p>
        </div>

      </div>
    )
  }
}

export default ShortlistEntry
