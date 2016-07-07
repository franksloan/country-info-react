import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'
import TestUtils from "react-addons-test-utils"; 
import $ from "jquery" 

import App from '../public/scripts/app'
import TravelPanel from '../public/scripts/travelPanel'
import CountryPanel from '../public/scripts/countryPanel'
import Travel from '../public/scripts/travel'

describe('<App />', function () {
  beforeEach(function(){
    sinon.stub($, "ajax").yieldsTo("success", ["France","Spain","Poland"])
  });
  afterEach(function(){
    $.ajax.restore();
  });

  it('country panel should be created', function (done) {
    const wrapper = mount(<App/>);

    expect(wrapper.find(CountryPanel)).to.have.length(1);
    expect(wrapper.find(TravelPanel)).to.have.length(1);
    done()
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
});