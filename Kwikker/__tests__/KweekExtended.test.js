import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import KweekExtended from '../App/Components/KweekExtended/KweekExtended';

describe('kweek component', () => {
  it('Handle rekweeks and likes', () => {
    const navigationMock = { addListener: jest.fn() };
    const rply = { reply_to_username: 'shady', reply_to_kweek_id: '5' };
    const mention = { username: 'nader' };
    const mention2 = { username: 'khaled' };
    const wrapper = shallow(<KweekExtended
      navigation={navigationMock}
      key={1}
      profileUrl="www.photo.com"
      kweekText="kweek"
      screenName="Shady"
      numberOfLikes={11}
      numberOfRekweeks={5}
      rekweeked={false}
      liked={false}
      rekweekerUserName="shady"
      date="2019-05-04T11:22:44.552Z"
      replyTo={rply}
      mentions={null}
      hashtags={null}
      mentions={[mention, mention2]}
    />);
    const instance = wrapper.instance();
    expect(wrapper.instance().state.rekweeksCounter).toBe(5);
    expect(wrapper.instance().state.likesCounter).toBe(11);
    expect(wrapper.instance().state.rekeeked).toBe(false);
    expect(wrapper.instance().state.liked).toBe(false);
    instance.likePressed();
    instance.rekweekPressed();
    expect(wrapper.instance().state.rekweeksCounter).toBe(6);
    expect(wrapper.instance().state.likesCounter).toBe(12);
    expect(wrapper.instance().state.rekeeked).toBe(true);
    expect(wrapper.instance().state.liked).toBe(true);
    instance.likePressed();
    instance.rekweekPressed();
    expect(wrapper.instance().state.rekweeksCounter).toBe(5);
    expect(wrapper.instance().state.likesCounter).toBe(11);
    expect(wrapper.instance().state.rekeeked).toBe(false);
    expect(wrapper.instance().state.liked).toBe(false);


    // Accessing component state
  });
});