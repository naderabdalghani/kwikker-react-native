import React, { Component } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import Notification from '../Notification/Notification';

/** @module All **/

export default class All extends React.Component {
  /** to render unseend messges.
   * @memberof All
 */
  renderUnseen(index) {
    if (index < this.props.screenProps.unseenCount) { return { backgroundColor: '#f2f2f2' }; }

    return (null);
  }

  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.props.screenProps.refreshing}
            onRefresh={this.props.screenProps.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.props.screenProps.moreNotifications(nativeEvent); }}
      >
        {this.props.screenProps.notifications.map((item, index) => (
          <TouchableOpacity
            style={
              this.renderUnseen(index)
            }
            key={item.id}
            onPress={() => {
            }}
          >
            <Notification
              key={item.id}
              profileUrl={item.profile_pic_URL}
              kweekText={item.kweek_text}
              type={item.type}
              screenName={item.screen_name}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
    );
  }
}