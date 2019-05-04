import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Mentions from '../App/Components/NotificationsTaps/Mentions';

describe('All component', () => {
  it('render Mentions', () => {
    const wrapper = shallow(<Mentions
      screenProps={{ rootNav: jest.fn(),
        mentions: [],
        unseenCountMentions: 0,
        refreshing: false,
        pullRefresh: jest.fn(),
        notifications: [],
        unseenCount: 0,
        moreNotifications: (data) => jest.fn(data),
        moreMentions: (data) => jest.fn(data),
        setType: (data) => jest.fn(data) }}
    />);
    const instance = wrapper.instance();
  });
});