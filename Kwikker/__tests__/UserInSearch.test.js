import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import UserInSearch from '../App/Components/UserInSearch/UserInSearch';

describe('UserInSearch component', () => {
  it('UserInSearch component', () => {
    const navigationMock = { addListener: jest.fn() };
    const wrapper = shallow(<UserInSearch navigation={navigationMock} following />);
    const instance = wrapper.instance();
    expect(wrapper.instance().props.following).toBe(true);
    wrapper.instance().unfollow();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  });
});