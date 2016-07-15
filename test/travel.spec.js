import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Travel from '../public/scripts/travel';

describe('<Travel />', function () {
  it('elements should be rendered correctly', function () {
  	var travelSight = {
  		link: 'www.lonely-planet.com',
  		title: 'tower',
  		image: 'sight.jpeg',
  		description: 'tall'
  	}
    const wrapper = shallow(<Travel item={travelSight} />);
    expect(wrapper.find('h4').text()).contains(travelSight.title);
    expect(wrapper.find('.travel').containsMatchingElement(<a href={travelSight.link}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={travelSight.image}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(travelSight.description);
  });
});