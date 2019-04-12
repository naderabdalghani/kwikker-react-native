import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput } from 'react-native';
import axios from 'axios';
import styles from './Styles';

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View>
        <Text style={styles.header}>{navigation.state.params.title}</Text>
        <Text>@{navigation.state.params.userName} </Text>
      </View>
    ),

  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: false,
      scrolledDown: false,
      message: '',
    };
  }


  componentDidMount() {
    this.pullRefresh();
  }


  /** Send message
 *  sends message to specifice user
 *  (Post request) we send the message and the user name
 * @param {string} message - the message that i will send
 */
  onSubmit() {
    if (this.state.message !== '') {
      axios.post('direct_message', {
        text: this.state.message,
        username: this.props.navigation.state.params.userName
      })
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  /** Get more Messages when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreMessages=({ contentOffset }) => {
  if (contentOffset.y === 0) {
    this.setState({
      refreshing: true,
    });
    this.updateMessages(this.state.messages[this.state.messages.length - 1].id);
  }
}

/** pull to refresh functionality.
   * gets first 20 messages
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateMessages();
 }


/** styles messages.
 * if message from me text will be on the right.
 * if message from the other text will be on the left.
 * @param {int} type - The id of Message .
 */
messageType=(type) => {
  if (type === 1) {
    return styles.otherMessage;
  }
  return styles.message;
}


/** styles messages.
 * if message from the other his image will be on the left.
 * @param {int} type - The id of Message .
 */
userImage(type) {
  if (type === 1) {
    return <Image source={{ uri: this.props.navigation.state.params.profileUrl }} style={styles.userImage} />;
  }
  return (null);
}

/** Scroll Down once on opening conversation
 *
 */
scrollDown() {
  if (!this.state.scrolledDown) {
    this.scrollView.scrollToEnd({ animated: true });
    this.setState({
      scrolledDown: true
    });
  }
}


/** Update Messages.
 * gets first 20 Message With default parameter (id=null)
 * To retrieve more send the id of the last retrieved message.
 * @param {int} id - The id of Message .
 */
updateMessages(id = null) {
  axios.get('direct_message', {
    params: {
      last_message_retrieved_id: id,
      username: this.props.navigation.state.params.userName
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          messages: response.data
        });
      } else {
        this.setState((prevState) => ({ messages: prevState.messages.concat(response.data)
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
        ref={(ref) => { this.scrollView = ref; }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollDown();
        }}
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        style={{ flex: 1, margin: 2 }}
        onScroll={({ nativeEvent }) => { this.moreMessages(nativeEvent); }}
      >
        {this.state.messages.slice(0).reverse().map((item, index) => (
          <View>
            <View style={{ flexDirection: 'row' }}>
              {this.userImage(item.type)}
              <Text style={this.messageType(item.type)}>{item.text}</Text>
            </View>
            <Text style={[this.messageType(item.type), styles.messageTime]}>{item.created_at}</Text>
          </View>

        ))
        }
      </ScrollView>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInput}
          placeholder="Start a message"
          onChangeText={(message) => this.setState({ message })}
          multiline
          onSubmitEditing={() => { this.onSubmit(); }}
        />

        <TouchableOpacity onPress={() => { this.onSubmit(); }} style={styles.messageButton}>
          <Image source={require('../../Assets/Images/send.png')} style={styles.buttomImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
