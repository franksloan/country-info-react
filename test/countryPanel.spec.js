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

  // it('should highlight the country when one is selected', function () {
  // 	const selectCountrySpy = sinon.spy();
  //   const wrapper = shallow(<CountryPanel 
  //   							data={['Poland', 'Ukraine']}
  //   							selectCountry={selectCountrySpy}/>);
  //  	wrapper.find(Country).get(0).props.selectCountry('Poland')
  //   expect(selectCountrySpy.calledOnce).to.be.true;
  //   expect(wrapper.state().activeCountry).to.equal('Poland')
  // });

  // it('should submit new country when child does', function () {
  // 	const submitNewCountrySpy = sinon.spy();
  //   const wrapper = shallow(<CountryPanel 
  //   							data={['Poland', 'Ukraine']}
  //   							submitNewCountry={submitNewCountrySpy}/>);
  //  	wrapper.find(AddCountry).get(0).props.onCountrySubmit('Italy')
  //   expect(submitNewCountrySpy.calledWith('Italy')).to.be.true;
  //   expect(wrapper.state().activeCountry).to.be.equal('Italy');
  //   expect(wrapper.state().countriesEnabled).to.be.false;
  // });

  // it('should fade other panels', function () {
  // 	const fadePanelsSpy = sinon.spy();
  //   const wrapper = shallow(<CountryPanel 
  //   							data={['Poland', 'Ukraine']}
  //   							fadePanels={fadePanelsSpy}/>);
  //  	wrapper.find(AddCountry).get(0).props.fadePanels()
  //   expect(fadePanelsSpy.calledWith(false, true, true, true)).to.be.true;
  // });

  // it('should unfade all panels', function () {
  // 	const fadePanelsSpy = sinon.spy();
  //   const wrapper = shallow(<CountryPanel 
  //   							data={['Poland', 'Ukraine']}
  //   							fadePanels={fadePanelsSpy}/>);
  //  	wrapper.find(AddCountry).get(0).props.unfadePanels()
  //   expect(fadePanelsSpy.calledWith(false, false, false, false)).to.be.true;
  // });

});