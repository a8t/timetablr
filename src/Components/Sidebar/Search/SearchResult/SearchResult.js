import React from 'react';
import './SearchResult.css'


const SearchResult = props => {

  return (
    <button 
      className='searchResult' 
      onMouseDown={() => {
        props.addToShortlist({
          code: props.courseCode,
          name: props.courseName,
          id: props.courseID
        })
        props.searchResultUnfocused()
      }}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          props.addToShortlist({
            code: props.courseCode,
            name: props.courseName,
            id: props.courseID
          })
          props.searchResultUnfocused()
        } else if (e.key === 'Escape') {
          props.searchResultUnfocused()          
        }
      }}
      onFocus={() => props.searchResultFocused()}
      onBlur={() => props.searchResultUnfocused()}
      
    >
      <div className='course'>
        <p className='courseCode'>
            {props.courseCode}
        </p>
        <p className='courseName'>
          {props.courseName}
        </p>
      </div>
    </button>
  )
}

export default SearchResult
