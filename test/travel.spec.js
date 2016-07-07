import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Travel from '../public/scripts/travel';

describe('<Travel />', function () {
  it('elements should be rendered correctly', function () {
  	var travelSight = {
  		url: 'www.lonely-planet.com',
  		sightName: 'tower',
  		img: 'sight.jpeg',
  		sightDescription: 'tall'
  	}
    const wrapper = shallow(<Travel sight={travelSight} />);
    expect(wrapper.find('h4').text()).contains(travelSight.sightName);
    expect(wrapper.find('.travel').containsMatchingElement(<a href={travelSight.url}><img /></a>)).to.be.true;
    expect(wrapper.find('a').containsMatchingElement(<img src={travelSight.img}/>)).to.be.true;
    expect(wrapper.find('p').text()).contains(travelSight.sightDescription);
  });
});