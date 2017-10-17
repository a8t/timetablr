import React from 'react';
import './SearchResult.css'


const SearchResult = props => {

  return (
    <div className='searchResult' key={props.key}>
      <div className='course'>
        <p className='courseCode'>
            {props.courseCode}:
        </p>
        <p className='courseName'>
          {props.courseName}
        </p>
      </div>
      <button
        onClick={() => props.addToShortList({
          code: props.courseCode,
          name: props.courseName,
          id:   props.courseID
        })}>+</button>
    </div>
  )
}

export default SearchResult
