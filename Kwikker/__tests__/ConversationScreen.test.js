import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import ConversationScreen from '../App/Screens/ConversationScreen/ConversationScreen';

describe('ConversationScreen component', () => {
  it('Mount:  get 20 message on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(), state: { params: { userName: 'khaled' } } };
    const wrapper = shallow(<ConversationScreen

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    await Instance.setState({ refreshing: false, message: 'hi' });
    await Instance.onSubmit();
  });
});