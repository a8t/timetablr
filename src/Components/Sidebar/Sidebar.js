import React, { Component } from 'react';
import Search from "./Search/Search.js";
import Shortlist from "./Shortlist/Shortlist.js";
import './Sidebar.css';

const Sidebar = props => {
  return (
    <div id='sidebar'>
      <Search 
        addToShortlist={props.addToShortlist}
        shortlist={props.shortlist}
        />
        <Shortlist 
          removeFromShortlist={props.removeFromShortlist}
          addMeetingSectionData={props.addMeetingSectionData}
          removeMeetingSectionData={props.removeMeetingSectionData}
          shortlist={props.shortlist}
        />
    </div>
  );
}

export default Sidebar;
