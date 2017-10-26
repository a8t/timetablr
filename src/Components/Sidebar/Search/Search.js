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
    this.resultFocused = false
    this.closeTimer = ''
    this.searchResultFocused = this.searchResultFocused.bind(this)
    this.searchResultUnfocused = this.searchResultUnfocused.bind(this)
  }

  updateSearch(event) {
    this.refs.searchResults.style.display = 'block'
    const a = event.target.value

    this.setState({
      searchTerm: a.substr(0, 50)
    })

    if (a && a.length >= 1) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(a)
      }, 100);
    } else {
      this.setState({searchResults: []})
    }

  }

  fetchCourseData(course) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/search?course=${course}`)
    .then(response => response.json())
    .then(jsonResponse =>
      {this.setState({searchResults: jsonResponse.slice(0, 10)})}
        )
  }

  hideSearchResults() {
      setTimeout(() => {
        if (!this.resultFocused) {this.refs.searchResults.style.display = 'none'}
        this.resultFocused = false        
      }, 10);
  }

  showSearchResults() {
    this.refs.searchResults.style.display = 'block'
  }

  searchResultFocused(){    
    this.resultFocused = true  
  }

  searchResultUnfocused() {
    setTimeout(() => {
      if (!this.resultFocused) { this.refs.searchResults.style.display = 'none' };
      this.resultFocused = false
    }, 0);
  }

  render () {
    

    const searchResults = this.state.searchResults.filter(eachResult => !this.props.shortlist.map(each => each.code + each.term).includes(eachResult.code+eachResult.term)).map(eachResult => 
      <SearchResult 
        key={eachResult.id} 
        courseID={eachResult.id} 
        courseCode={eachResult.code} 
        courseName={eachResult.name} 
        addToShortlist={this.props.addToShortlist}
        searchResultFocused={this.searchResultFocused}
        searchResultUnfocused={this.searchResultUnfocused}
        term={eachResult.term}
      />
    )


    return(
      <div id="search">
        <input className="searchBar"
          ref="searchBar"
          type="text"
          value={this.state.search}
          onBlur={() => this.hideSearchResults()}
          onFocus={() => this.showSearchResults()}
          onChange={this.updateSearch.bind(this)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              this.searchResultUnfocused()
            }
          }}
          placeholder="Search course"/>
        <div className='searchResults' ref="searchResults">
            {searchResults}
        </div>
      </div>
    )
  }
}

export default Search
