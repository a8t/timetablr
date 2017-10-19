import React, {Component} from 'react';
import './Search.css'
import SearchResult from './SearchResult/SearchResult.js'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    }
    this.timer = ''
    this.hovered = false
    this.closeTimer = ''
  }

  updateSearch(event) {
    this.setState({
      searchTerm: event.target.value.substr(0, 50)
    })

    const a = event.target.value

    if (a.length > 1) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(a)
      }, 100);
    }
  }


  fetchCourseData(course) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/search?course=${course}`)
    .then(response => response.json())
    .then(jsonResponse =>
      {this.setState({searchResults: jsonResponse.slice(0, 10)})}
        )
  }

  // hide search results when click outside of search bar
  hideSearchBar() {
    if (!this.hovered) {
      this.refs.searchResults.style.display = 'none'
    } else {
      this.closeTimer = setTimeout(() => {
        this.refs.searchResults.style.display = 'none'
      }, 200);
    }
  }

  // show search results when click inside of search bar
  showSearchBar() {
    this.refs.searchResults.style.display = 'block'
  }

  // when user mouse on search result
  mouseOnSearchResult() {
    this.hovered = true
  }

  // when user mouse out search result
  mouseOutSearchResult() {
    this.hovered = false
  }

  render () {

    const searchResults = this.state.searchResults.filter(eachResult => !this.props.shortlist.map(each => each.code + each.term).includes(eachResult.code+eachResult.term)).map(eachResult => 
      <SearchResult 
        key={eachResult.code} 
        courseID={eachResult.id} 
        courseCode={eachResult.code} 
        courseName={eachResult.name} 
        addToShortlist={this.props.addToShortlist}
      />
    )


    return(
      <div id="search">
        <input className="searchBar"
          ref="searchBar"
          type="text"
          value={this.state.search}
          onBlur={() => this.hideSearchBar()}
          onFocus={() => this.showSearchBar()}
          onChange={this.updateSearch.bind(this)}
          placeholder="Search course"/>
        <div className='searchResults'
          ref="searchResults"
          onMouseEnter={() => this.mouseOnSearchResult()}
          onMouseLeave={() => this.mouseOutSearchResult()}>
            {searchResults}
        </div>
      </div>
    )
  }
}

export default Search
