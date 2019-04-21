import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';

/** @module Mentions **/

export default class Mentions extends React.Component {
  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            enabled={false}
            refreshing={this.props.screenProps.refreshing}
          />
)} onScroll={({ nativeEvent }) => { this.props.screenProps.moreLists(nativeEvent); }} style={{ flex: 1 }}
      />
    );
  }
}