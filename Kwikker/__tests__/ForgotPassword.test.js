import { Text, View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import ForgotPassword from '../App/Screens/ForgotPassword/ForgotPassword';
import styles from '../App/Screens/ForgotPassword/Styles';

describe('ForgotPassword component', () => {
  it('onFail: Stops the loading screen and provides the user with an error', () => {
    const wrapper = shallow(<ForgotPassword />);
    const instance = wrapper.instance();
    instance.onFail();
    expect(wrapper.instance().state.message).toBe('A user with the provided email does not exist.');
    expect(wrapper.instance().state.loading).toBe(false);
  });
  it('onSuccess: Stops the loading screen and provides the user with a success message', () => {
    const wrapper = shallow(<ForgotPassword />);
    wrapper.instance().onSuccess();
    const { email } = wrapper.instance().state;
    expect(wrapper.instance().state.message).toBe(`We've sent an email to ${email}. Click the link in the email to reset your password.`);
    expect(wrapper.instance().state.loading).toBe(false);
  });
  it('searchButtonPress: Searches for the entered email, if it exists, a password-reset email is sent to that email and onSuccess() is called, if not, onFail() is called', async () => {
    const wrapper = shallow(<ForgotPassword />);
    wrapper.instance().searchButtonPress();
    const instance = wrapper.instance();
    const searchButtonPressInstance = await instance.searchButtonPress();
    expect(wrapper.instance().state.loading).toBe(false);
    expect(mockAxios.post).toHaveBeenCalledWith('/account/forget_password', {
      email: wrapper.instance().state.email
    });
  });
  it('renderContent: Renders a message if it already exists, or an introductory text if not', () => {
    const wrapper = shallow(<ForgotPassword />);
    const { errorMessage, successMessage, Text1Style, Text2Style } = styles;
    const introductoryText = (wrapper.instance().renderContent());
    const expectedIntroductoryText = (
      <View>
        <Text style={Text1Style}>Find your Kwikker account</Text>
        <Text style={Text2Style}>Enter your email.</Text>
      </View>
    );
    expect(introductoryText).toEqual(expectedIntroductoryText);

    wrapper.instance().state.message = 'test';
    const errorRender = (wrapper.instance().renderContent());
    const expectedErrorRender = (
      <View>
        <Text style={successMessage}>{wrapper.instance().state.message}</Text>
        <Text style={Text2Style}>Please try entering your email again.</Text>
      </View>
    );
    expect(errorRender).toEqual(expectedErrorRender);
  });
});