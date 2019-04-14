import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import PeopleSearch from '../App/Components/PeopleSearch/PeopleSearch';

describe('PeopleSearch component', () => {
  it('PeopleSearch component', () => {
    const wrapper = shallow(<PeopleSearch following />);
    const instance = wrapper.instance();
    expect(wrapper.instance().props.following).toBe(true);
  });
});