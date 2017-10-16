import React, {Component} from 'react';

class CourseInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      display: 'block'
    }
  }

  const toggleCourseInformation = (props) => {
    showingInformation = !showingInformation
  }

  const courseInfoStyle = {
    display: showingInformation ? 'block' : 'none'
  }

  return (
    <div className='showCourseInformation' style={courseInfoStyle}>
      <h1>FUCK!!</h1>
    </div>
  )

}

export default CourseInfo
