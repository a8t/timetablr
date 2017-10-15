import React, { Component } from 'react';
import Search from "./Search/Search.js";
import Shortlist from "./Shortlist/Shortlist.js";

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='sidebar'>
        <Search addToShortList={this.props.addToShortList}/>
        <Shortlist shortlist={this.props.shortlist}/>
      </div>
    );
  }
}

export default Sidebar;
