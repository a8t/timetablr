import React, {Component} from "react";
import "./URLGenerator.css"
import { CopyToClipboard } from "react-copy-to-clipboard";
import fire from "../../../fire"

class URLGenerator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      generated: false,
      copied: false,
      url: ""
    }
    this.toggleGenerateCopy = this.toggleGenerateCopy.bind(this)
    this.toggleCopied = this.toggleCopied.bind(this)
  }

  toggleGenerateCopy(){
    const newURL = `${Math.random().toString(36).substr(2, 10)}`
    

    const newTimetableRef = fire.database().ref('URLs').push(this.props.data)
    const timetableID = newTimetableRef.key

    this.setState(prevstate => {
      return {
        generated: true,
        url: timetableID
      }
    })
  }

  toggleCopied(){
    this.setState({
      copied: !this.state.copied
    })
  }

  
  render() {
    return (
      <div id="URLGenerator">
        {!this.state.generated
            ? <button onClick={e => {
                this.toggleGenerateCopy()
                e.target.blur()
              }}>Get URL</button>
            : <CopyToClipboard text={`timetablr.ca/${this.state.url}`}
                onCopy={() => this.toggleCopied()}>
                {!this.state.copied 
                  ? <button onClick={e => {
                      e.target.blur()
                    }}>Copy to clipboard?</button>
                  : <button onClick={e => {
                      this.toggleGenerateCopy()
                      this.toggleCopied()
                      e.target.blur()
                    }}>Copied! Get new URL?</button>
                }
              </CopyToClipboard>
        }

        {this.state.generated
            ? <div id="url">
                <a id="urltext" href={`/${this.state.url}`}>{`timetablr.ca/${this.state.url}`}</a>
              </div>
            : <div id="url">
              </div>
        }
      </div>
    )
  }

}

export default URLGenerator;
