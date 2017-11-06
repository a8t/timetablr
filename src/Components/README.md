# About the app

## Some notes

Components are animated (for fun and to keep away jarring transitions) using ```React Transition Group```. This adds a timer to the ```componentDidMount``` and ```componentWillUnmount``` hooks of elements entering or exiting a CSSTransitionGroup, e.g. a new ```ShortlistEntry``` component rendering inside the ```Shortlist```, during which a CSS class (with animation) is added. This allows a newly rendered component to fade in or out, etc. See more [here](https://github.com/reactjs/react-transition-group).