import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Food from '../public/scripts/food';

describe('<Food />', function () {
  it('elements should be rendered correctly', function () {
  	var recipeItem = {
  		link: 'www.recipes.com',
  		title: 'Pasta',
  		image: 'recipe.jpeg',
  		description: 'tall',
      rating: 3
  	}
    const wrapper = shallow(<Food item={recipeItem} />);
    expect(wrapper.find('h4').text()).contains(recipeItem.title + ' - 3/5');
    expect(wrapper.find('.food').containsMatchingElement(<a href={recipeItem.link}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={recipeItem.image}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(recipeItem.description);
  });
});