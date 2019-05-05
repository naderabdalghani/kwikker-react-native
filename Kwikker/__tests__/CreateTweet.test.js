import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import CreateTweet from '../App/Screens/CreateTweet/CreateTweet';


describe('Create Kweek', () => {
  it('Handle rekweeks and likes', async () => {
    const navigationMock = { addListener: jest.fn(),
      setParam: jest.fn(),
      navigate: jest.fn(),
      getParam: jest.fn(),
      state: { params: { kweekId: 'kweekId', user: 'user' } } };
    const wrapper = shallow(<CreateTweet
      navigation={navigationMock}
    />);
    const instance = wrapper.instance();
    expect(mockAxios.put).toHaveBeenCalledTimes(0);

    //expect(wrapper.instance().state.count).toBe(280);
    //expect(wrapper.instance().state.media).toBe(null);
    //instance.setState({ text: 'shadyfahmy' });
    //expect(wrapper.instance().state.count).toBe(270);
    //instance.submitKweek();
    //expect(mockAxios.post).toHaveBeenCalledTimes(1);
    //expect(mockAxios.post).toHaveBeenCalledWith('/kweeks/', {
      //text: instance.state.text,


    //});

    // Accessing component state
  });
});