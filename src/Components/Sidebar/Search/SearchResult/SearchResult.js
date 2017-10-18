import React from 'react';
import './SearchResult.css'


const SearchResult = props => {

  return (
    <div className='searchResult' onClick={() => props.addToShortList({
      code: props.courseCode,
      name: props.courseName,
      id: props.courseID
    })}>
      <div className='course'>
        <p className='courseCode'>
            {props.courseCode}:
        </p>
        <button onClick={e => e.preventDefault}
          >+</button>
        <p className='courseName'>
          {props.courseName}
        </p>
      </div>
    </div>
  )
}

export default SearchResult
