import React from 'react';
import './SearchResult.css'


const SearchResult = props => {

  return (
    <div className='searchResult'>
      <div className='course'>
        <p className='courseCode'>
            {props.courseCode}:
        </p>
        <button
          onClick={() => props.addToShortList({
            code: props.courseCode,
            name: props.courseName,
            id:   props.courseID
          })}>+</button>
        <p className='courseName'>
          {props.courseName}
        </p>
      </div>
    </div>
  )
}

export default SearchResult
