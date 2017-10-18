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

  componentDidUpdate(){
    this.performSearch(this.state.searchTerm)
  }

  updateSearch(event) {
    this.setState({
      searchTerm: event.target.value.substr(0, 50)
    })
  }

  fetchCourseData(course) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/search?course=${course}`)
    .then(response => response.json())
    .then(jsonResponse =>
      {this.setState({searchResults: jsonResponse.slice(0, 10)})}
        )
  }

  performSearch(searchTerm){
    if (searchTerm.length > 1) {
      console.log('INSIDE PERFORMSEA');
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(searchTerm)
      }, 100);
    }
  }

  // hide search results when click outside of search bar
  hideSearchBar() {
    console.log("inside hide search bar");
    if (!this.hovered) {
      this.refs.searchResults.style.display = 'none'
      console.log("inside if");
    } else {
      this.closeTimer = setTimeout(() => {
        console.log("delay delay");
        this.refs.searchResults.style.display = 'none'
      }, 200);
      console.log("inside else");
    }
  }

  // show search results when click inside of search bar
  showSearchBar() {
    this.refs.searchResults.style.display = 'block'
  }

  // when user mouse on search result
  mouseOnSearchResult() {
    this.hovered = true
    console.log(this.hovered);
  }

  // when user mouse out search result
  mouseOutSearchResult() {
    this.hovered = false
    console.log(this.hovered);
  }

  render () {

    const searchResults = this.state.searchResults.map(eachResult => <SearchResult courseID={eachResult.id} key={eachResult.code} courseCode={eachResult.code} courseName={eachResult.name} addToShortList={this.props.addToShortList}/>)


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
