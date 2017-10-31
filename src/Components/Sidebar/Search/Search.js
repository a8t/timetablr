import React, {Component} from "react";
import "./Search.css"
import SearchResult from "./SearchResult/SearchResult.js"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
    }
    this.timer = ""
    this.resultFocused = false
    this.closeTimer = ""
    this.searchResultFocused = this.searchResultFocused.bind(this)
    this.searchResultUnfocused = this.searchResultUnfocused.bind(this)
  }

  updateSearch(event) {
    this.refs.searchResults.style.display = "block"
    const a = event.target.value

    this.setState({
      searchTerm: a.substr(0, 50).replace(/\s/g, '')
    })

    if (a && a.replace(/\s/g, '').length >= 1) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(a.replace(/\s/g, ''))
      }, 100);
    } else {
      this.setState({searchResults: []})
    }

  }

  async fetchCourseData(course) {
    const response = await fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/search?course=${course}`)
    const jsonResponse = await response.json()
    this.setState({ 
      searchResults: jsonResponse.slice(0, 10) 
    })
  }

  hideSearchResults() {
      setTimeout(() => {
        if (!this.resultFocused) {this.refs.searchResults.style.display = "none"}
        this.resultFocused = false        
      }, 10);
  }

  showSearchResults() {
    this.refs.searchResults.style.display = "block"
  }

  searchResultFocused(){    
    this.resultFocused = true  
  }

  searchResultUnfocused() {
    setTimeout(() => {
      if (!this.resultFocused) { this.refs.searchResults.style.display = "none" };
      this.resultFocused = false
    }, 0);
  }

  render () {
    // sigh.
    const filteredResults = this.state.searchResults.filter(eachResult => 
      !this.props.shortlist.map(each => each.code + each.term).includes(eachResult.code + eachResult.term))

    const searchResults = filteredResults.map(eachResult => 
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

    let styleObj = {}
    if (filteredResults.length < 1) { styleObj.display = "none" };
    

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
            if (e.key === "Escape") {
              this.searchResultUnfocused()
              e.target.blur()
            }
          }}
          placeholder="Search course"/>
        <div className="searchResults" style={styleObj} ref="searchResults">
            {searchResults}
        </div>
      </div>
    )
  }
}

export default Search
