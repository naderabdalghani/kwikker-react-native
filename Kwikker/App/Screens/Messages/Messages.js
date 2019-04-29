import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Conversation from '../../Components/Conversation/Conversation';
import styles from './Styles';

/** @module Messages **/

export default class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      currentUsername: '',
      refreshing: false,
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:image').then((image) => {
      this.props.navigation.setParams({
        headerLeft: (
          <TouchableOpacity>
            <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        ),
      });
    });
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({
        currentUsername: id,
      });
    });
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.pullRefresh();
      }
    );
  }

  /** pull to refresh functionality.
   * gets first 20 conversations
   * @memberof Messages
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateConversations();
 }

 /** Get more Conversations when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof Messages
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreConversations=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.setState({
      refreshing: true,
    });
    this.updateConversations(this.state.conversations[this.state.conversations.length - 1].last_message.id);
  }
}

/** Update Conversations.
 * gets first 20 Conversation With default parameter (id=null)
 * To retrieve more send the id of the last retrieved conversation.
 * @memberof Messages
 * @param {int} id - The id of Conversation .
 */
updateConversations(id = null) {
  axios.get('direct_message/conversations', {
    params: {
      last_conversations_retrieved_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          conversations: response.data
        });
      } else {
        this.setState((prevState) => ({ conversations: prevState.conversations.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
    // handle error
    // console.log(error);
    })
    .then(() => {
    // always executed
    });
}


render() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.moreConversations(nativeEvent); }}
      >
        {this.state.conversations.map((item, index) => (
          <TouchableOpacity
            key={item.last_message.id} onPress={() => {
              this.props.navigation.navigate('ConversationScreen', {
                title: item.user.screen_name,
                profileUrl: item.user.profile_image_url,
                userName: item.user.username,
              });
            }}
          >
            <Conversation
              key={item.last_message.id}
              profileUrl={item.user.profile_image_url}
              messageText={item.last_message.text}
              userName={item.user.username}
              messageTime={item.last_message.created_at}
              screenName={item.user.screen_name}
              fromUsername={item.last_message.from_username}
              currentUsername={this.state.currentUsername}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
      <TouchableOpacity
        style={styles.messageButton} onPress={() => {
          this.props.navigation.push('ConversationSearch');
        }}
      >
        <Image source={require('./../../Assets/Images/Message1.png')} style={styles.buttomImage} />
      </TouchableOpacity>
    </View>
  );
}
}
