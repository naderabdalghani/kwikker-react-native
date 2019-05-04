import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import Notifications from '../App/Screens/Notifications/Notifications';

describe('notificationsComponent component', () => {
  it('Mount:  get 20 notifications on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn() };
    const wrapper = shallow(<Notifications navigation={navigationMock} />);
    const Instance = wrapper.instance();
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    expect(mockAxios.get).toHaveBeenCalledWith('notifications', {
      params: {
        last_notification_retrieved_id: null
      }
    });
    const pullInstance = await Instance.pullRefresh();
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(4);
    expect(mockAxios.get).toHaveBeenCalledWith('notifications', {
      params: {
        last_notification_retrieved_id: null
      }
    });
    const updateInstance = await Instance.updateNotifications(5);
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(5);
    expect(mockAxios.get).toHaveBeenCalledWith('notifications', {
      params: {
        last_notification_retrieved_id: 5
      }
    });
  });
});