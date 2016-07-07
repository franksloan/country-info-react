import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Film from '../public/scripts/film';
let imdb = "http://www.imdb.com/title/"

describe('<Film />', function () {
  it('elements should be rendered correctly', function () {
  	var filmItem = {
  		imdbID: '1234',
  		title: 'Scream',
  		poster: 'film.jpeg',
  		plot: 'horror',
      imdbRating: 3
  	}
    const wrapper = shallow(<Film film={filmItem} />);
    expect(wrapper.find('h4').text()).contains(filmItem.title + ' - 3/10');
    const url = imdb + filmItem.imdbID
    expect(wrapper.find('.film').containsMatchingElement(<a href={url}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={filmItem.poster}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(filmItem.plot);
  });
});