import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import All from '../App/Components/NotificationsTaps/All';

describe('All component', () => {
  it('render Notifications', () => {
    const wrapper = shallow(<All
      screenProps={{ rootNav: { addListener: jest.fn() },
        refreshing: false,
        pullRefresh: jest.fn(),
        notifications: [{ id: 1 }, { id: 2 }, { id: 3 }],
        unseenCount: 1,
        setType: (data) => jest.fn(data) }}
    />);
    const instance = wrapper.instance();
    expect(wrapper.instance().state.notifClicked).toBe(false);
    expect(wrapper.instance().state.refreshing).toBe(false);
  });
});