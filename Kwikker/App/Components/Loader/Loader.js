import React, { Component } from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';
import styles from './Styles';

const Loader = (props) => {
  const {
    loading,
    ...attributes
  } = props;
  const { modalBackground, activityIndicatorWrapper, loadingText, activityIndicatorStyle } = styles;
  return (
    <Modal visible={loading} transparent animationType="none">
      <View style={modalBackground}>
        <View style={activityIndicatorWrapper}>
          <View style={activityIndicatorStyle}>
            <ActivityIndicator animating={loading} size={50} />
          </View>
          <Text style={loadingText}>Logging In</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;