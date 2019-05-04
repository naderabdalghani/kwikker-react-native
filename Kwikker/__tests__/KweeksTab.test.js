import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Kweeks from '../App/Components/SearchTaps/Kweeks';

describe('All component', () => {
  it('render Kweeks', () => {
    const wrapper = shallow(<Kweeks
      screenProps={{ rootNav: jest.fn(),
        refreshing: false,
        users: [],
        kweeks: [],
        moreKweeksLists: (data) => jest.fn(data),
        moreUsersLists: (data) => jest.fn(data),
        pullRefresh: () => jest.fn() }}
    />);
    const instance = wrapper.instance();
  });
});