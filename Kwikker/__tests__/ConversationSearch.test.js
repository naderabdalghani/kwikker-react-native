import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import ConversationSearch from '../App/Screens/ConversationSearch/ConversationSearch';

describe('ConversationSearch component', () => {
  it('Mount:  get 20 chat on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn() };
    const wrapper = shallow(<ConversationSearch

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});