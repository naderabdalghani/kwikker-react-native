import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import Notifications from '../App/Screens/Notifications/Notifications';

describe('notificationsComponent component', () => {
  it('componentDidMount: should turn on  loading , get 20 notifications ', async () => {
    const wrapper = shallow(<Notifications />);
    const Instance = wrapper.instance();
    const RefreshInstance = await Instance.pullRefresh();
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith('notifications', {
      params: {
        last_notification_retrieved_id: null
      }
    });
  });
});