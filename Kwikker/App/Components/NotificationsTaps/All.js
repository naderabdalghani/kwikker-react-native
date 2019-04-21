import React, { Component } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import Notification from '../Notification/Notification';

/** @module All **/

export default class All extends React.Component {
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
            key={item.id}
            onPress={() => {
              this.props.screenProps.showPopNotification(item.screen_name, item.kweek_text, item.type);
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