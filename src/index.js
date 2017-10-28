import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import {BrowserRouter as Router, Route} from "react-router-dom"


const RouterApp = () => {
  return (
    <Router>
      <div>
        <Route name="" path="*" component={App} />
      </div>
    </Router>
  )
}

ReactDOM.render(<RouterApp />, document.getElementById("root"));
registerServiceWorker();
