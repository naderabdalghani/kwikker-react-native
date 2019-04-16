import { Text, View, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Signup from '../App/Screens/Signup/Signup';
import styles from '../App/Screens/Signup/Styles';

const messages = {
  null: '',
  success: 'Registration successfull, email confirmation pending.',
  fail: 'An error occurred, please try again.',
  usernameAlreadyExists: 'Username already exists',
  emailAlreadyExists: 'Email already exists',
  bothExists: 'Both email and username exists',
  resend: 'Confirmation email resent successfully.'
};

describe('Signup component', () => {
  it('onRegistrationFail: should display an error message according to the error type received in the response', () => {
    const error = {
      response: {
        status: 404,
        data: {
          username_already_exists: false,
          email_already_exists: true,
        }
      }
    };
    const wrapper = shallow(<Signup />);
    const instance = wrapper.instance();
    instance.onRegistrationFail(error);
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.fail);

    error.response.status = 403;
    instance.onRegistrationFail(error);
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.emailAlreadyExists);

    error.response.data.username_already_exists = true;
    instance.onRegistrationFail(error);
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.bothExists);

    error.response.data.email_already_exists = false;
    instance.onRegistrationFail(error);
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.usernameAlreadyExists);
  });
  it('onRegistrationSuccess: Stops the loading screen and displays a success message', () => {
    const wrapper = shallow(<Signup />);
    const instance = wrapper.instance();
    instance.onRegistrationSuccess();
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.success);
  });
  it('resendButtonPress: should turn on the loading screen, clear the error message, process the user\'s credentials ', async () => {
    const wrapper = shallow(<Signup />);
    const instance = wrapper.instance();
    const resendButtonPress = await instance.resendButtonPress();
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.resend);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/account/registration/resend_email', {
      email: instance.state.email
    });
  });
  it('submitButtonPress: Sends a user\'s credentials and data then either calls onRegistrationSuccess() or calls onRegistrationFail()', async () => {
    mockAxios.post.mockClear();
    const wrapper = shallow(<Signup />);
    const instance = wrapper.instance();
    const SignupButtonPressInstance = await instance.submitButtonPress();
    expect(wrapper.instance().state.loading).toBe(false);
    expect(wrapper.instance().state.message).toBe(messages.success);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/account/registration', {
      username: instance.state.username,
      password: instance.state.password,
      email: instance.state.email,
      screen_name: instance.state.screenname,
      birth_date: instance.state.date,
    });
  });
  it('renderRegistrationMessage: Renders a \'resend\' button if an unconfirmed user has already registered successfully or his email already exists', () => {
    const wrapper = shallow(<Signup />);
    const { successMessage, resendButton } = styles;

    wrapper.instance().state.message = messages.fail;
    const normalRender = (wrapper.instance().renderRegistrationMessage());
    const expectedNormalRender = (
      <View>
        <Text style={successMessage}>{wrapper.instance().state.message}</Text>
      </View>
    );
    expect(normalRender).toEqual(expectedNormalRender);

    wrapper.instance().state.message = messages.success;
    const resendButtonRender = (wrapper.instance().renderRegistrationMessage());
    const expectedResendButtonRender = (
      <View>
        <Text style={successMessage}>{wrapper.instance().state.message}</Text>
        <TouchableNativeFeedback onPress={wrapper.instance().resendButtonPress}>
          <Text style={resendButton}>Resend confirmation email</Text>
        </TouchableNativeFeedback>
      </View>
    );
    expect(resendButtonRender).toEqual(expectedResendButtonRender);
  });
});