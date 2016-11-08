import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
import TestUtils from "react-addons-test-utils"; 
import $ from "jquery"
import mockery from "mockery"

import App from '../public/scripts/app'
import CountryPanel from '../public/scripts/countryPanel'
import Film from '../public/scripts/film'
import Food from '../public/scripts/food'
import Travel from '../public/scripts/travel'
import CategoryPanel from '../public/scripts/categoryPanel'

describe('<App /> shallow', function(){
   it('panels should be created', function () {

    let spy = sinon.spy(CategoryPanel, 'create');

    const wrapper = shallow(<App />);

    expect(wrapper.find(CountryPanel)).to.have.length(1);
    expect(spy.calledWith(Film)).to.be.true;
    expect(spy.calledWith(Food)).to.be.true;
    expect(spy.calledWith(Travel)).to.be.true;
  });

   it('array is created', function () {
    
    const wrapper = shallow(<App />);
    console.log(wrapper.state())
    const array = App.updateArray('films', 'New film');
    
    expect(array.length).to.equal(1)
    expect(array[0]).to.equal('New film')
  });
})

describe('<App />', function () {
  beforeEach(function(){
    sinon.stub($, "ajax").yieldsTo("success", ["France","Spain","Poland"])
  });
  afterEach(function(){
    $.ajax.restore();
  });

  it('countries should be loaded initially', function (done) {
    const wrapper = mount(<App/>);

    expect(wrapper.state().countries[0]).to.equal("France");
    expect(wrapper.state().countries[1]).to.equal("Spain");
    expect(wrapper.state().countries[2]).to.equal("Poland");
    done()
  });

  it('calls componentDidMount', (done) => {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    done();
  });

  it('select country should be called when a country is clicked', function (done) {
    
    const wrapper = mount(<App />);

    $.ajax.restore();
    const spain = {countryName: "Spain", films: [], food: [], travel: []}
    sinon.stub($, "ajax").yieldsTo("success", spain)
    const spy = sinon.spy();
    wrapper.find('.country-panel').find('ul').childAt(1).simulate('click');

    expect(wrapper.state().countryData.countryName).to.equal('Spain')
    done()
  });

});