import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import CountryPanel from '../public/scripts/countryPanel';
import Country from '../public/scripts/country';
import AddCountry from '../public/scripts/addCountry';

describe('<CountryPanel>', function () {
  it('should contain two countries when two in array', function () {
    const wrapper = shallow(<CountryPanel data={['Poland', 'Ukraine']}/>);
    expect(wrapper.find(Country)).to.have.length(2);
  });

  it('add country component should be rendered', function () {
    const wrapper = shallow(<CountryPanel data={['Poland', 'Ukraine']}/>);
    expect(wrapper.find(AddCountry)).to.have.length(1);
  });

  it('should have a title of Countries but contain no countries when props are empty', function () {
    const wrapper = shallow(<CountryPanel data={[]}/>);
    expect(wrapper.find('h2').text()).to.contain('Countries')
    expect(wrapper.find(Country)).to.have.length(0);
  });

  it('should be disabled', function () {
    const wrapper = shallow(<CountryPanel data={['Poland', 'Ukraine']} disabled={true}/>);
    expect(wrapper.find(Country).first().props().disabled).to.be.true;
  });

  it('should be active', function () {
    const wrapper = shallow(<CountryPanel data={['Poland', 'Ukraine']} activeCountry={'Poland'}/>);
    expect(wrapper.find(Country).first().props().active).to.be.true;
  });

});