import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import CategoryPanel from '../public/scripts/CategoryPanel';
import Film from '../public/scripts/film';
import AddItem from '../public/scripts/AddItem';

describe('<CategoryPanel />', function () {
  it('should contain two films when two in array', function () {
    const film1 = {}
    const film2 = {}
    let FilmPanel = CategoryPanel.create(Film)
    const wrapper = shallow(<FilmPanel items={[film1, film2]}/>);
    expect(wrapper.find(Film)).to.have.length(2);
  });

  it('should have a title of Film but contain no films when props are empty', function () {
    let FilmPanel = CategoryPanel.create(Film)
    const wrapper = shallow(<FilmPanel items={[]} title="Films"/>);

    expect(wrapper.find('h2').text()).to.contain('Film')
    expect(wrapper.find(Film)).to.have.length(0);
  });

  it('should have a add item component when no items in array', function () {
    let FilmPanel = CategoryPanel.create(Film)
    const wrapper = shallow(<FilmPanel items={[]} title="Films"/>);

    expect(wrapper.find(AddItem)).to.have.length(1);
  });

  it('should have a add item component when items in array', function () {
    const film1 = {}
    const film2 = {}
    let FilmPanel = CategoryPanel.create(Film)
    const wrapper = shallow(<FilmPanel items={[film1, film2]}/>);

    expect(wrapper.find(AddItem)).to.have.length(1);
  });

  it('should call function to add a new film when child asks to', function () {
    const film1 = {}
    const film2 = {}
    let FilmPanel = CategoryPanel.create(Film)
    const submitNewItemSpy = sinon.spy();
    const wrapper = shallow(<FilmPanel items={[film1, film2]} submitNewItem={submitNewItemSpy}/>);

    wrapper.find(AddItem).get(0).props.onItemSubmit('Film')
    expect(submitNewItemSpy.calledWith('Film')).to.be.true;
  });

});