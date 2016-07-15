import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Film from '../public/scripts/film';
let imdb = "http://www.imdb.com/title/"

describe('<Film />', function () {
  it('elements should be rendered correctly', function () {
  	var filmItem = {
  		link: 'www.imdb.com/1234',
  		title: 'Scream',
  		image: 'film.jpeg',
  		description: 'horror',
      rating: 3
  	}
    const wrapper = shallow(<Film item={filmItem} />);
    expect(wrapper.find('h4').text()).contains(filmItem.title + ' - 3/10');
    expect(wrapper.find('.film').containsMatchingElement(<a href={filmItem.link}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={filmItem.image}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(filmItem.description);
  });
});