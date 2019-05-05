import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import BlockedAccount from '../App/Components/BlockedAccount/BlockedAccount';

describe('MutedAccount component', () => {
  it('unblock: unblock user', () => {
    const wrapper = shallow(<BlockedAccount />);
    const instance = wrapper.instance();
    instance.unblock();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  });
});