import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Button, ButtonGroup, FormGroup, FormControl, Form, ControlLabel} from 'react-bootstrap'

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
    expect(wrapper.state().showForm).to.be.true;
  });

  it('button should be shown on two clicks', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');
    // click the same button again
    wrapper.find({name: 'toggle'}).simulate('click');

    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Form)).to.have.length(0);
    expect(wrapper.state().showForm).to.be.false;
  });

  it('form should contain 5 form groups and 1 button', function () {
    const fadePanelsSpy = sinon.spy();
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    expect(wrapper.find(Form).find(FormGroup)).to.have.length(5);
    expect(wrapper.find(Form).find(Button)).to.have.length(1);
  });

  it('show form only in wizard mode', function () {
    const wrapper = shallow(<AddItem wizardMode={true} />);

    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Form)).to.have.length(1);
  });

  it('title input should be set whilst typing', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let eStubOnChange = {target: { value: 'Rocky'} }
    let titleInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Title')
    titleInputGroup.childAt(1).simulate('change', eStubOnChange)

    expect(wrapper.state().title).to.equal('Rocky')
  });

  it('rating input should be set whilst typing', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let eStubOnChange = {target: { value: 9} }
    let ratingInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Rating')
    ratingInputGroup.childAt(1).simulate('change', eStubOnChange)

    expect(wrapper.state().rating).to.equal(9)
  });

  it('link input should be set whilst typing', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let eStubOnChange = {target: { value: 'www.films.com'} }
    let linkInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Link')
    linkInputGroup.childAt(1).simulate('change', eStubOnChange)

    expect(wrapper.state().link).to.equal('www.films.com')
  });

  it('image input should be set whilst typing', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let eStubOnChange = {target: { value: 'www.image.com'} }
    let imageInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Image')
    imageInputGroup.childAt(1).simulate('change', eStubOnChange)

    expect(wrapper.state().image).to.equal('www.image.com')
  });

  it('description input should be set whilst typing', function () {
    const wrapper = shallow(<AddItem />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let eStubOnChange = {target: { value: 'A boxing film'} }
    let descriptionInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Description')
    descriptionInputGroup.childAt(1).simulate('change', eStubOnChange)

    expect(wrapper.state().description).to.equal('A boxing film')
  });

  it('item should be submitted on click', function () {
    const onItemSubmitSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();
    const wrapper = shallow(<AddItem onItemSubmit={onItemSubmitSpy} />);
    
    wrapper.find(Button).simulate('click');

    // type Italy into title and test that it is set on the state
    let titleStubOnChange = {target: { value: 'Rocky'} }
    let titleInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Title')
    titleInputGroup.childAt(1).simulate('change', titleStubOnChange)

    let ratingStubOnChange = {target: { value: 9} }
    let ratingInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Rating')
    ratingInputGroup.childAt(1).simulate('change', ratingStubOnChange)

    let linkStubOnChange = {target: { value: 'www.films.com'} }
    let linkInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Link')
    linkInputGroup.childAt(1).simulate('change', linkStubOnChange)

    let imageStubOnChange = {target: { value: 'www.image.com'} }
    let imageInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Image')
    imageInputGroup.childAt(1).simulate('change', imageStubOnChange)

    let descriptionStubOnChange = {target: { value: 'A boxing film'} }
    let descriptionInputGroup = wrapper.find(FormGroup).filterWhere(n => n.childAt(0).childAt(0).text() === 'Description')
    descriptionInputGroup.childAt(1).simulate('change', descriptionStubOnChange)

    let eStubOnSubmit =  { preventDefault: preventDefaultSpy }
    wrapper.find(Form).simulate('submit', eStubOnSubmit);

    const item = {
      title: 'Rocky',
      rating: 9,
      link: 'www.films.com',
      image: 'www.image.com',
      description: 'A boxing film'
    }
    
    expect(onItemSubmitSpy.args[0][0].title === 'Rocky').to.be.true;
    expect(onItemSubmitSpy.calledWith(item)).to.be.true;
  });

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