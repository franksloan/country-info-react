import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Food from '../public/scripts/food';

describe('<Food />', function () {
  it('elements should be rendered correctly', function () {
  	var recipeItem = {
  		url: 'www.recipes.com',
  		title: 'Pasta',
  		img: 'recipe.jpeg',
  		teaser: 'tall',
      averageRating: 3
  	}
    const wrapper = shallow(<Food recipe={recipeItem} />);
    expect(wrapper.find('h4').text()).contains(recipeItem.title + ' - 3/5');
    expect(wrapper.find('.food').containsMatchingElement(<a href={recipeItem.url}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={recipeItem.img}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(recipeItem.teaser);
  });
});