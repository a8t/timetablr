import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  mount(<Sidebar/>)
});