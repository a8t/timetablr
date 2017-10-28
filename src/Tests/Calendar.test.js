import React from "react";
import ReactDOM from "react-dom";
import Calendar from "../Components/Calendar/Calendar";

import { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(<Calendar />)
});

const setup = () => {
  const wrapper = shallow(<Calendar />)
  const appInstance = wrapper.instance()
  return {
    wrapper,
    appInstance
  }
}

describe("", () => {

  it("adds one item to meeting section ID in state", () => {
    
  })
})