import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import axios from 'axios';
import Conversation from '../../Components/Conversation/Conversation';
import styles from './Styles';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.pullRefresh();
  }

  /** pull to refresh functionality.
   * gets first 20 conversations
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateConversations();
 }

 /** Get more Conversations when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
MoreConversations=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.setState({
      refreshing: true,
    });
    this.updateConversations(this.state.conversations[this.state.conversations.length - 1].id);
  }
}

/** Update Conversations.
 * gets first 20 Conversation With default parameter (id=null)
 * To retrieve more send the id of the last retrieved conversation.
 * @param {int} id - The id of Conversation .
 */
updateConversations(id = null) {
  axios.get('conversations', {
    params: {
      last_conversation_retrieved_id: id
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
        onScroll={({ nativeEvent }) => { this.MoreConversations(nativeEvent); }}
      >
        {this.state.conversations.map((item, index) => (
          <TouchableOpacity>
            <Conversation
              key={index}
              profileUrl={item.user.profile_image_url}
              messageText={item.last_message.text}
              userName={item.user.username}
              messageTime={item.last_message.created_at}
              screenName={item.user.screen_name}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
      <TouchableOpacity style={styles.messageButton}>
        <Image source={require('./../../Assets/Images/Message1.png')} style={styles.buttomImage} />
      </TouchableOpacity>
    </View>
  );
}
}
