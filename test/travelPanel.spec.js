import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import TravelPanel from '../public/scripts/travelPanel';
import Travel from '../public/scripts/travel';

describe('<TravelPanel />', function () {
  it('should contain two sights when two in array', function () {
    const sight1 = {}
    const sight2 = {}
    const wrapper = shallow(<TravelPanel travel={[sight1, sight2]}/>);
    expect(wrapper.find(Travel)).to.have.length(2);
  });

  it('should have a title of Travel but contain no sights when props are empty', function () {
    const wrapper = shallow(<TravelPanel data={[]}/>);
    expect(wrapper.find('h2').text()).to.contain('Travel')
    expect(wrapper.find(Travel)).to.have.length(0);
  });
});