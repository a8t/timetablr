import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = shallow(<App />)
  const appInstance = wrapper.instance()
  const sampleData = [
    { code: "msCode0", courseCode: "courseCode0", name: "course0", description: "desc0", ms_data: [], term: "term0", department: "dept0" },
    { code: "msCode1", courseCode: "courseCode0", name: "course0", description: "desc0", ms_data: [], term: "term0", department: "dept0" },
    { code: "msCode1", courseCode: "courseCode1", name: "course1", description: "desc1", ms_data: [], term: "term1", department: "dept1" },
    { code: "msCode2", courseCode: "courseCode2", name: "course2", description: "desc2", ms_data: [], term: "term2", department: "dept2" },
    { code: "msCode3", courseCode: "courseCode3", name: "course3", description: "desc3", ms_data: [], term: "term3", department: "dept3" },
    { code: "msCode4", courseCode: "courseCode4", name: "course4", description: "desc4", ms_data: [], term: "term4", department: "dept4" },
  ]
  const sampleShortlist = [
    {
      term: "Term0",
      code: "courseCode0"
    },
    {
      term: "Term1",
      code: "courseCode1"
    },
    {
      term: "Term2",
      code: "courseCode2"
    },
    {
      term: "Term3",
      code: "courseCode3"
    },
    {
      term: "Term4",
      code: "courseCode4"
    }
  ]
  return {
    wrapper,
    appInstance,
    sampleData,
    sampleShortlist
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('addMeetingSection method', () => {

  it('adds one item to meeting section ID in state', () => {
    const { wrapper, appInstance, sampleData } = setup()
    appInstance.addMeetingSectionData(sampleData[0])
    expect(appInstance.state["meetingSectionData"]).toEqual([sampleData[0]])
  })

  it('doesnt allow adding more than two of each', () => {
    const { wrapper, appInstance, sampleData } = setup()
    appInstance.addMeetingSectionData(sampleData[0])
    appInstance.addMeetingSectionData(sampleData[0])    
    appInstance.addMeetingSectionData(sampleData[1])    
    appInstance.addMeetingSectionData(sampleData[0])    
    expect(appInstance.state["meetingSectionData"]).toEqual([sampleData[0], sampleData[0], sampleData[1]])
  })
})

describe('removeMeetingSectionData method', () => {
  it('removes items from app state, preserves order', () => {
    const { wrapper, appInstance, sampleData } = setup()
    appInstance.addMeetingSectionData(sampleData[0])
    appInstance.addMeetingSectionData(sampleData[1])
    appInstance.addMeetingSectionData(sampleData[2])
    appInstance.addMeetingSectionData(sampleData[3])

    
    appInstance.removeMeetingSectionData(sampleData[1])
    expect(appInstance.state["meetingSectionData"]).toEqual([sampleData[0], sampleData[2], sampleData[3]])

    appInstance.removeMeetingSectionData(sampleData[2])
    expect(appInstance.state["meetingSectionData"]).toEqual([sampleData[0], sampleData[3]])
    
  })
  // it('removes the most recent occurence', () => {
  //   const wrapper = shallow(<App />)
  //   const appInstance = wrapper.instance()
  //   appInstance.addMeetingSectionData({ code: 3, courseCode: 5, id: 1 })
  //   appInstance.addMeetingSectionData({ code: 3123, courseCode: 5234 })
  //   appInstance.addMeetingSectionData({ code: 3, courseCode: 5, id: 2})
  //   appInstance.removeMeetingSectionData({ code: 3, courseCode: 5 })
    
  //   expect(appInstance.state["meetingSectionData"]).toEqual([{ code: 3123, courseCode: 5234 }, { code: 3, courseCode: 5, id: 1 }])
  // })
})

describe('addToShortlist method', () => {
  // it('adds entry data to app shortlist state', () => {
  //   const { wrapper, appInstance, sampleData } = setup()
    
  //   appInstance.addToShortlist({id: 3})

  //   expect(
  //     appInstance.state.shortlist[0].code
  //   ).toBeDefined()
    
  // })

})


describe('removeFromShortlist method', () => {
  it('removes items from app shortlist', () => {
    const { wrapper, appInstance, sampleShortlist } = setup()
    appInstance.state.shortlist.push(sampleShortlist[0])
    appInstance.state.shortlist.push(sampleShortlist[1])
    appInstance.state.shortlist.push(sampleShortlist[2])

    
    appInstance.removeFromShortlist(sampleShortlist[1])

    expect(appInstance.state.shortlist).toEqual([
      sampleShortlist[0],
      sampleShortlist[2]
    ])
  })

  it('removes all associated meetingTimes when course removed', () => {
    const { wrapper, appInstance, sampleShortlist, sampleData} = setup()
    appInstance.state.shortlist.push(sampleShortlist[0])
    appInstance.addMeetingSectionData(sampleData[0])
    appInstance.addMeetingSectionData(sampleData[1])

    
    appInstance.removeFromShortlist(sampleShortlist[0])
    
    expect(appInstance.state.shortlist).toEqual([])
    expect(appInstance.state.meetingSectionData).toEqual([])
  })

})
