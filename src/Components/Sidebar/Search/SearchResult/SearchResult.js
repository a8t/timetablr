import React, { Component } from 'react';
import './SearchResult.css'


const SearchResult = props => {

  return (
    <div className='searchResult' key={props.key}>
      <p>{props.courseCode}</p> <p>{props.courseName}</p>
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
