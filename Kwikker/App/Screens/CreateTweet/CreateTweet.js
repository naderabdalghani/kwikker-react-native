import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { StackActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import ParsedText from 'react-native-parsed-text';
import AsyncStorage from '@react-native-community/async-storage';
import CustomButton from '../../Components/CustomButton/CustomButton';
import styles from './Styles';

let thiss;

/** @module CreateTweet **/
export default class CreateTweet extends Component {
static navigationOptions = ({ navigation }) => {
  //const { params = {} } = navigation.state;
  const kweekId = navigation.getParam('kweekId', null);
  const buttonDisabled = navigation.getParam('buttonDisabled', true);
  return {
    headerRight:
  <View style={{ marginRight: 10 }}>
    <CustomButton marginSize={10} customFontSize={15} disabled={buttonDisabled} onPress={() => thiss.submitKweek()}>{kweekId === null ? 'Kweek' : 'Reply'}</CustomButton>
  </View>,
    headerBackImage:
  <Feather name="x" size={24} color="rgb(29, 161, 242)" />
  };
};

state = { text: '', count: 280, photo: null, media: null, img: null };

componentDidMount() {
  this.props.navigation.setParams({ buttonDisabled: (this.state.count <= 0) || (this.state.count >= 279) });
}

/**
 * open gallery to upload photo
 */
handleChoosePhoto = () => {
  const options = {
    noData: true,
  };
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      this.setState({ photo: response });
      console.log(this.state.photo.uri);
      console.log(this.state.photo.fileName);
      console.log(this.state.photo.type);
    }
  });
};

/**
 * open camera to take photo
 */
handleCam = () => {
  const options = {
    noData: true,
  };
  ImagePicker.launchCamera(options, response => {
    if (response.uri) {
      this.setState({ photo: response });
      console.log(this.state.photo.uri);
      console.log(this.state.photo.fileName);
      console.log(this.state.photo.type);
    }
  });
};

/**
 * Handle submitting a kweek
 */
submitKweek() {
  const { navigation } = this.props;
  const kweekId = navigation.getParam('kweekId', null);
  if (this.state.photo !== null) {
    const formData = new FormData();
    formData.append('file', { name: this.state.photo.fileName, type: this.state.photo.type, uri: this.state.photo.uri });
    axios({
      method: 'post',
      url: 'media/',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.media_id);
        //this.props.navigation.navigate('Home');
        this.setState({ media: response.data.media_id });
      })

      .catch((err) => {
      // handle error
        let error = JSON.stringify(err);
        error = JSON.parse(error);
        console.log(error);
        console.log(error.response.status);
      })
      .then(() => {
      // always executed
        axios.post('kweeks/', {
          text: this.state.text,
          reply_to: (kweekId === null ? null : kweekId),
          media_id: this.state.media
        })
          .then((response) => {
            console.log(response.status);
            console.log(kweekId);
            //this.props.navigation.navigate('Home');
          })
          .catch((err) => {
          // handle error
            let error = JSON.stringify(err);
            error = JSON.parse(error);
            console.log(error);
            console.log(error.response.status);
          })
          .then(() => {
            this.props.navigation.dispatch(StackActions.popToTop());
          });
      });
  }
  if (this.state.photo === null) {
    axios.post('kweeks/', {
      text: this.state.text,
      reply_to: (kweekId === null ? null : kweekId),
      media_id: null
    })
      .then((response) => {
        console.log(response.status);
        console.log(kweekId);
        //this.props.navigation.navigate('Home');
      })
      .catch((err) => {
      // handle error
        let error = JSON.stringify(err);
        error = JSON.parse(error);
        console.log(error);
        console.log(error.response.status);
      })
      .then(() => {
        this.props.navigation.dispatch(StackActions.popToTop());
      });
  }
}

render() {
  AsyncStorage.getItem('@app:image').then((image) => {
    this.setState({ img: image });
  });
  thiss = this;
  const maxLength = 280;
  const { navigation } = this.props;
  const kweekId = navigation.getParam('kweekId', null);
  const user = navigation.getParam('user', null);
  return (
    <View style={{ flex: 1 }}>
      {kweekId === null ? null : (
        <View styles={{ flexDirection: 'row', marginLeft: '15%' }}>
          <Text style={{ fontSize: 18, color: '#657786', marginLeft: '15%', marginTop: '2%' }}>Replying to
            <Text style={styles.hashtag}> @{user}</Text>
          </Text>
        </View>
      )
      }
      <View style={{ flex: 10, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: this.state.img }} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'flex-start', marginTop: '15%', marginLeft: '15%' }} />
        </View>
        <View style={{ flex: 6 }}>
          <TextInput
            onChangeText={(t) => {
              this.setState({ text: t, count: maxLength - t.length });
              this.props.navigation.setParams({ buttonDisabled: (this.state.count <= 0) || (this.state.count >= 279) });
            }}
            //value={this.state.text}
            placeholder={kweekId === null ? "What's happening?" : 'Kweek your reply'}
            placeholderTextColor="#657786"
            style={{ fontSize: 18 }}
            multiline
          >
            <ParsedText
              parse={[
                { pattern: /#(\w+)/, style: styles.hashtag },
                { pattern: /@(\w+)/, style: styles.hashtag }]}
              style={{ fontSize: 18, color: '#000000' }}
              childrenProps={{ allowFontScaling: false }}
            >
              {this.state.text}
            </ParsedText>
          </TextInput>
          { this.state.photo === null ? null : (
            <View style={{ height: 200, width: '80%', marginTop: '2%', borderWidth: 1, borderColor: '#AAB8C2', borderRadius: 5 }}>
              <Image source={this.state.photo} style={{ height: '100%', width: '100%' }} />
            </View>
          )
          }
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 0.75, borderTopColor: '#AAB8C2', backgroundColor: '#FFFFFF' }}>
        <Feather name="camera" size={36} color="rgb(29, 161, 242)" onPress={this.handleCam} style={{ marginLeft: '3%', marginTop: '1%' }} />
        <FontAwesome name="photo" size={36} color="rgb(29, 161, 242)" onPress={this.handleChoosePhoto} style={{ marginLeft: '3%', marginTop: '1%' }} />
        <Text style={{ marginLeft: '53%', marginTop: '4%' }}>{this.state.count} / 280</Text>
      </View>
    </View>
  );
}
}
