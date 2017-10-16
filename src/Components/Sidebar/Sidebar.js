import React from 'react';
import Search from "./Search/Search.js";
import Shortlist from "./Shortlist/Shortlist.js";

const Sidebar = props => {
  return (
    <div id='sidebar'>
      <Search addToShortList={props.addToShortList}/>
      <Shortlist shortlist={props.shortlist}/>
    </div>
  );
}

export default Sidebar;
