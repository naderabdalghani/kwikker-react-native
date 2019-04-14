import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import Conversation from '../App/Components/Conversation/Conversation';

describe('Conversation component', () => {
  it('Conversation component', () => {
    const wrapper = shallow(<Conversation screenName="Hi" />);
    const instance = wrapper.instance();
    expect(wrapper.instance().props.screenName).toBe('Hi');
  });
});