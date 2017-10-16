import React, {Component} from 'react';
import './Search.css'
import SearchResult from './SearchResult/SearchResult.js'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    }
    this.timer = ''
  }

  componentWillUpdate(){
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
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(searchTerm)
      }, 100);
    }
  }

  render () {

    const searchResults = this.state.searchResults.map(eachResult => <SearchResult courseID={eachResult.id} key={eachResult.code} courseCode={eachResult.code} courseName={eachResult.name} addToShortList={this.props.addToShortList}/>)


    return(
      <div id="search">
        <input type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
          placeholder="Search course"/>
        <div className='searchResults'>
          {searchResults}
        </div>
      </div>
    )
  }
}

export default Search
