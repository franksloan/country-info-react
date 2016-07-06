import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import CountryPanel from '../public/scripts/countryPanel';
import Country from '../public/scripts/country';

describe('<CountryPanel>', function () {
  it('should contain two countries when two in array', function () {
    const wrapper = shallow(<CountryPanel data={['Poland', 'Ukraine']}/>);
    expect(wrapper.find(Country)).to.have.length(2);
  });

  it('should have a title of Countries but contain no countries when props are empty', function () {
    const wrapper = shallow(<CountryPanel data={[]}/>);
    expect(wrapper.text()).to.contain('Countries')
    expect(wrapper.find(Country)).to.have.length(0);
  });
});