import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import Notifications from '../App/Screens/Notifications/Notifications';

describe('notificationsComponent component', () => {
  it('Shallow rendering', () => {
    const wrapper = shallow(<Notifications />);
    const componentInstance = wrapper.instance();
  });
});