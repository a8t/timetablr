import React, { Component } from 'react';
import Search from "./Search/Search.js";
import Shortlist from "./Shortlist/Shortlist.js";
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shortlist: []
    }
    this.addToShortList = this.addToShortList.bind(this)
  }

  addToShortList(newEntry) {
    this.setState({
      shortlist: [...this.state.shortlist, newEntry]
    })
  }

  render () {
    return (
      <div id='sidebar'>
        <Search addToShortList={this.addToShortList}/>
        <Shortlist shortlist={this.state.shortlist}/>
      </div>
    );
  }
}

export default Sidebar;
