import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import Notification from '../App/Components/Notification/Notification';

describe('notificationComponent component', () => {
  it('Shallow rendering', () => {
    const wrapper = shallow(<Notification
      key={1}
      profileUrl="www.photo.com"
      kweekText="kweek"
      type="LIKE"
      screenName="Khaled"
    />);
    const componentInstance = wrapper.instance();
    // Accessing component state
    expect(wrapper.state('type')).toBe('liked your kweek');
  });
});