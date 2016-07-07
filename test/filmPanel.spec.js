import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import FilmPanel from '../public/scripts/filmPanel';
import Film from '../public/scripts/film';

describe('<FilmPanel />', function () {
  it('should contain two films when two in array', function () {
    const film1 = {}
    const film2 = {}
    const wrapper = shallow(<FilmPanel films={[film1, film2]}/>);
    expect(wrapper.find(Film)).to.have.length(2);
  });

  it('should have a title of Film but contain no films when props are empty', function () {
    const wrapper = shallow(<FilmPanel data={[]}/>);
    expect(wrapper.find('h2').text()).to.contain('Film')
    expect(wrapper.find(Film)).to.have.length(0);
  });
});