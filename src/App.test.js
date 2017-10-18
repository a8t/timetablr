import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('addMeetingSection method', () => {
  // it('rejects data in wrong format', () => {
  //   const wrapper = shallow(<App/>)
  //   const appInstance = wrapper.instance()
  //   appInstance.addMeetingSectionData("hello")
  //   expect(appInstance.state["meetingSectionData"]).toEqual([])
  // })
  it('adds one item to meeting section ID in state', () => {
    const wrapper = shallow(<App />)
    const appInstance = wrapper.instance()
    appInstance.addMeetingSectionData({code: 3, courseCode: 5})
    expect(appInstance.state["meetingSectionData"]).toEqual([{ code: 3, courseCode: 5 }])
  })
  it('doesnt allow adding more than two of each', () => {
    const wrapper = shallow(<App />)
    const appInstance = wrapper.instance()
    appInstance.addMeetingSectionData({code: 3, courseCode: 5})
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })    
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })    
    expect(appInstance.state["meetingSectionData"]).toEqual([{ code: 3, courseCode: 5 }, { code: 3, courseCode: 5 }])
  })
})

describe('removeMeetingSectionDAta method', () => {
  // it('rejects data in wrong format', () => {
  //   const wrapper = shallow(<App/>)
  //   const appInstance = wrapper.instance()
  //   appInstance.addMeetingSectionData("hello")
  //   expect(appInstance.state["meetingSectionData"]).toEqual([])
  // })
  it('removes correct item to meeting section ID in state', () => {
    const wrapper = shallow(<App />)
    const appInstance = wrapper.instance()
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })
    expect(appInstance.state["meetingSectionData"]).toEqual([{ code: 3, courseCode: 5 }])
  })
  it('doesnt allow adding more than two of each', () => {
    const wrapper = shallow(<App />)
    const appInstance = wrapper.instance()
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })
    appInstance.addMeetingSectionData({ code: 3, courseCode: 5 })
    expect(appInstance.state["meetingSectionData"]).toEqual([{ code: 3, courseCode: 5 }, { code: 3, courseCode: 5 }])
  })
})