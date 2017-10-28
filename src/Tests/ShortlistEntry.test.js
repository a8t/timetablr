import React from "react";
import ReactDOM from "react-dom";
import ShortlistEntry from "../Components/Sidebar/Shortlist/ShortlistEntry/ShortlistEntry";

import { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = shallow(<ShortlistEntry ms_data={[]} />)
  const appInstance = wrapper.instance()

  return {
    wrapper,
    appInstance
  }
}


it("renders without crashing", () => {
  shallow(<ShortlistEntry ms_data={[]}/>)
});

describe("toggleCourseInformation", () => {

  it("adds one item to meeting section ID in state", () => {
    const { wrapper, appInstance} = setup()
    appInstance.setState({displayInfo: true})
    appInstance.toggleCourseInformation()

    expect(appInstance.state.displayInfo).toEqual(false)
  })

})
