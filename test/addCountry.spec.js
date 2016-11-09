import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Button, ButtonGroup, FormGroup, FormControl, Form, InputGroup} from 'react-bootstrap'

import AddCountry from '../public/scripts/addCountry';

describe('<AddCountry>', function () {

  it('button should be shown', function () {
    const wrapper = shallow(
    	<AddCountry showInput={false}/>);
    
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('button should be removed on click', function () {
  	const fadePanelsSpy = sinon.spy();
    const wrapper = shallow(
    	<AddCountry fadePanels={fadePanelsSpy}
                  showInput={true}/>);

    expect(wrapper.find(Button)).to.have.length(0);
  });

  it('should be cancelled when input is exited', function () {
  	const cancelInputSpy = sinon.spy();
    const stopPropagationSpy = sinon.spy();
    const wrapper = shallow(
    	<AddCountry cancelInput={cancelInputSpy}
                  showInput={true}/>);

    expect(wrapper.find(FormControl)).to.have.length(1);

    let eStubOnClick =  { stopPropagation: stopPropagationSpy }
    wrapper.find(InputGroup.Addon).simulate('click', eStubOnClick);

    expect(stopPropagationSpy.calledOnce).to.be.true;
    expect(cancelInputSpy.calledOnce).to.be.true;
  });

  it('input should be set whilst typing', function () {
  	const fadePanelsSpy = sinon.spy();
  	const unfadePanelsSpy = sinon.spy();
  	const preventDefaultSpy = sinon.spy();
    const wrapper = shallow(
    	<AddCountry fadePanels={fadePanelsSpy}
    				unfadePanels={unfadePanelsSpy}
            showInput={true}/>);

    // type Italy into input and test that it is set on the state
    let eStubOnChange = {target: { value: 'Italy'} }
    wrapper.find(FormControl).simulate('change', eStubOnChange);
    
    expect(wrapper.state().newCountry).to.equal('Italy')
  });

  it('new country should be submitted on enter', function () {
  	const onCountrySubmitSpy = sinon.spy();
  	const preventDefaultSpy = sinon.spy();
    const wrapper = shallow(
    	<AddCountry onCountrySubmit={onCountrySubmitSpy}
            showInput={true}/>);

    // type Italy into input
    let eStubOnChange = {target: { value: 'Italy'} }
    wrapper.find(FormControl).simulate('change', eStubOnChange);
    
    expect(wrapper.state().newCountry).to.equal('Italy')

    // hit enter
    let eStubOnSubmit =  { preventDefault: preventDefaultSpy }
    wrapper.find(Form).simulate('submit', eStubOnSubmit);

    expect(onCountrySubmitSpy.calledOnce).to.be.true;
    // country should be cleared
    expect(wrapper.state().newCountry).to.equal('')
  });

});