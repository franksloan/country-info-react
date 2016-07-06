import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Country from '../public/scripts/country';

describe('<Country>', function () {
  it('select country should be called', function () {
  	const spy = sinon.spy();
    const wrapper = shallow(<Country country={'Poland'} selectCountry={spy} />);
    wrapper.find('li').simulate('click');
   
    expect(spy.calledOnce).to.be.true;
  });
});