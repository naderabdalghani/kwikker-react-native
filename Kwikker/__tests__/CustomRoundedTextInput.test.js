import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import CustomRoundedTextInput from '../App/Components/CustomRoundedTextInput/CustomRoundedTextInput';

describe('CustomRoundedTextInput component', () => {
  it('handleFocus: should set isFocused to true', () => {
    const wrapper = shallow(<CustomRoundedTextInput />);
    const instance = wrapper.instance();
    instance.handleFocus();
    expect(wrapper.instance().state.isFocused).toBe(true);
  });
  it('handleBlur: should set isFocused to false', () => {
    const wrapper = shallow(<CustomRoundedTextInput />);
    const instance = wrapper.instance();
    instance.handleBlur();
    expect(wrapper.instance().state.isFocused).toBe(false);
  });
});