import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Trend from '../App/Components/Trend/Trend';

describe('All component', () => {
  it('render Kweeks', () => {
    const wrapper = shallow(<Trend
      text="hi"
      numberOfKweeks={0}
    />);
    const instance = wrapper.instance();
  });
});