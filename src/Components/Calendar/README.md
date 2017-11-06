# About the calendars

Previous Javascript calendar view solutions have utilized tables or variously nested divs. Timetablr's approach is novel in that relies on CSS Grid (and, as such requires up-to-date browsers; university students were considered savvy enough for this assumption to be a valid one to make) in order to position calendar ```Entry``` components.

Quick rundown: with CSS grid, you can define a two-dimensional grid in several ways. The one we care about here is the ability to *name grid lines* and define the space between those, in a simple and declarative manner. See ```Calendar.css``` to see how each half-hour line is named e.g. ```time1730```; same with each weekday. Then, when an ```Entry``` is created (up in the ```App``` component), it is told *which named lines it fits into*. 

To clarify: you can specify a row-start, row-end, column-start, and column-end for any div. ```Entry``` components are generated using a ```meetingSectionData``` object. The day-of-week and start/end time data is read and turned into a string and given to the ```Entry``` as a _style_. So it positions itself!

The ```TermCalendar``` componens are then just used for actually displaying lines/legends for the calendar. The Grid itself is completely independent of those divs, but for now it isn't possible to directly style a CSS Grid—you can only style divs aligned to the Grid.