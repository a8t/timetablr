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
    const msData = this.props.ms_data.map(eachMSD => <button key={eachMSD.id} style={{margin: "2px"}} onMouseOver={() => {
      this.props.addMeetingSectionID(eachMSD.id)}} onMouseOut={() => this.props.removeMeetingSectionID(eachMSD.id)} >{eachMSD.code}</button>)

    return (
      <div onClick={() => this.toggleCourseInformation(this.props)} className="shortlistEntry">
        {this.props.code}: {this.props.name}
        <div className='showCourseInformation'
          style={  {display: this.state.displayInfo ? 'block' : 'none',
          overflow: 'scroll'}}>
            <p>{this.props.description}</p>
            {msData}
        </div>
      </div>
    )
  }
}

export default ShortlistEntry
