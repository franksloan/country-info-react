import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Button, ButtonGroup, FormGroup, FormControl, Form} from 'react-bootstrap'

import AddItem from '../public/scripts/AddItem';

describe('<AddItem>', function () {

  it('button should be shown', function () {
    const wrapper = shallow(
    	<AddItem />);
    
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('form and two buttons should be shown on click', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Form)).to.have.length(1);
  });

  it('form should 5 form groups and 1 button', function () {
    const fadePanelsSpy = sinon.spy();
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    expect(wrapper.find(Form).find(FormGroup)).to.have.length(5);
    expect(wrapper.find(Form).find(Button)).to.have.length(1);
  });

  it('show form only in wizard mode', function () {
    const fadePanelsSpy = sinon.spy();
    const wrapper = shallow(<AddItem wizardMode={true} />);

    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Form)).to.have.length(1);
  });

  // it('button should be shown again when not focusing on input', function () {
  // 	const fadePanelsSpy = sinon.spy();
  // 	const unfadePanelsSpy = sinon.spy();
  //   const wrapper = shallow(
  //   	<AddCountry fadePanels={fadePanelsSpy}
  //   				unfadePanels={unfadePanelsSpy}/>);
    
  //   wrapper.find(Button).simulate('click');

  //   expect(wrapper.find(FormControl)).to.have.length(1);

  //   wrapper.find(FormControl).simulate('blur');

  //   expect(wrapper.find(Button)).to.have.length(1);
  //   expect(unfadePanelsSpy.calledOnce).to.be.true;
  // });

  // it('input should be set whilst typing', function () {
  // 	const fadePanelsSpy = sinon.spy();
  // 	const unfadePanelsSpy = sinon.spy();
  // 	const preventDefaultSpy = sinon.spy();
  //   const wrapper = shallow(
  //   	<AddCountry fadePanels={fadePanelsSpy}
  //   				unfadePanels={unfadePanelsSpy}/>);
    
  //   wrapper.find(Button).simulate('click');

  //   // type Italy into input and test that it is set on the state
  //   let eStubOnChange = {target: { value: 'Italy'} }
  //   wrapper.find(FormControl).simulate('change', eStubOnChange);
    
  //   expect(wrapper.state().newCountry).to.equal('Italy')
  // });

  // it('new country should be submitted on enter', function () {
  // 	const fadePanelsSpy = sinon.spy();
  // 	const unfadePanelsSpy = sinon.spy();
  // 	const onCountrySubmitSpy = sinon.spy();
  // 	const preventDefaultSpy = sinon.spy();
  //   const wrapper = shallow(
  //   	<AddCountry fadePanels={fadePanelsSpy}
  //   				unfadePanels={unfadePanelsSpy}
  //   				onCountrySubmit={onCountrySubmitSpy}/>);
    
  //   wrapper.find(Button).simulate('click');

  //   // type Italy into input
  //   let eStubOnChange = {target: { value: 'Italy'} }
  //   wrapper.find(FormControl).simulate('change', eStubOnChange);
    
  //   expect(wrapper.state().newCountry).to.equal('Italy')

  //   // hit enter
  //   let eStubOnSubmit =  { preventDefault: preventDefaultSpy }
  //   wrapper.find(Form).simulate('submit', eStubOnSubmit);

  //   expect(wrapper.find(Button)).to.have.length(1);
  //   expect(onCountrySubmitSpy.calledOnce).to.be.true;
  //   // country should be cleared
  //   expect(wrapper.state().newCountry).to.equal('')
  // });

});