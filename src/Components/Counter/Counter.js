import React, {Component} from "react";
import "./Counter.css"

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
    // flash will toggle between 3 values: "" initially and then "flash1" or "flash2".
    // If the initial value is "flash1" or "flash2" the animation will happen on the initial render too.
    this.flash = "";
  }

  componentWillReceiveProps(nextProps) {
    var newValue = nextProps.count;
    if (this.props.count !== newValue) {
      this.flash = this.flash === "flash1" ? "flash2" : "flash1";
    }
  }

  render() {
    return(
      <div id="counter" className={this.flash}>
        {this.props.count}
      </div>
    )
  }

}


export default Counter
