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

  it('should highlight the country when one is selected', function () {
  	const selectCountrySpy = sinon.spy();
    const wrapper = shallow(<CountryPanel 
    							data={['Poland', 'Ukraine']}
    							selectCountry={selectCountrySpy}/>);
   	wrapper.find(Country).get(0).props.selectCountry('Poland')
    expect(selectCountrySpy.calledOnce).to.be.true;
    expect(wrapper.state().activeCountry).to.equal('Poland')
  });

  it('should submit new country when child does', function () {
  	const submitNewCountrySpy = sinon.spy();
  	const fadeCountryPanelSpy = sinon.spy();
  	const fadeFilmPanelSpy = sinon.spy();
    const wrapper = shallow(<CountryPanel 
    							data={['Poland', 'Ukraine']}
    							submitNewCountry={submitNewCountrySpy}
    							fadeCountryPanel={fadeCountryPanelSpy}
    							fadeFilmPanel={fadeFilmPanelSpy}/>);
   	wrapper.find(AddCountry).get(0).props.onCountrySubmit('Italy')
    expect(submitNewCountrySpy.calledWith('Italy')).to.be.true;
    expect(fadeCountryPanelSpy.calledWith(true)).to.be.true;
    expect(fadeFilmPanelSpy.calledWith(false)).to.be.true;
  });

  it('should fade other panels', function () {
  	const fadeTravelPanelSpy = sinon.spy();
  	const fadeFoodPanelSpy = sinon.spy();
  	const fadeFilmPanelSpy = sinon.spy();
    const wrapper = shallow(<CountryPanel 
    							data={['Poland', 'Ukraine']}
    							fadeFoodPanel={fadeFoodPanelSpy}
    							fadeTravelPanel={fadeTravelPanelSpy}
    							fadeFilmPanel={fadeFilmPanelSpy}/>);
   	wrapper.find(AddCountry).get(0).props.fadePanels()
    expect(fadeFoodPanelSpy.calledWith(true)).to.be.true;
    expect(fadeTravelPanelSpy.calledWith(true)).to.be.true;
    expect(fadeFilmPanelSpy.calledWith(true)).to.be.true;
  });

});