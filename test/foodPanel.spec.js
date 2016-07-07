import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import FoodPanel from '../public/scripts/foodPanel';
import Food from '../public/scripts/food';

describe('<FoodPanel />', function () {
  it('should contain three recipes when three in array', function () {
    const recipe1 = {}
    const recipe2 = {}
    const recipe3 = {}
    const wrapper = shallow(<FoodPanel food={[recipe1, recipe2, recipe3]}/>);
    expect(wrapper.find(Food)).to.have.length(3);
  });

  it('should have a title of Food but contain no recipes when props are empty', function () {
    const wrapper = shallow(<FoodPanel data={[]}/>);
    expect(wrapper.find('h2').text()).to.contain('Food')
    expect(wrapper.find(Food)).to.have.length(0);
  });
});