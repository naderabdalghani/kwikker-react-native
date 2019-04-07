import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput } from 'react-native';
import axios from 'axios';
import styles from './Styles';

export default class ConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
    headerLeft:
  <TouchableOpacity>
    <Image source={{ uri: `${navigation.state.params.profileUrl}` }} style={styles.userImage} />
  </TouchableOpacity>
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: false,
      message: '',
    };
  }

  componentDidMount() {
    this.pullRefresh();
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

 /** Get more Messages when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreMessages=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.setState({
      refreshing: true,
    });
    this.updateMessages(this.state.messages[this.state.messages.length - 1].id);
  }
}

/** styles messages.
 * if message from me text will be on the right.
 * if message from the other text will be on the left.
 * @param {int} type - The id of Message .
 */
messageType=(type) => {
  if (type === 1) {
    return {
      alignSelf: 'flex-start', backgroundColor: 'lightgray', borderRadius: 10, padding: 5, margin: 5,
    };
  }
  return {
    alignSelf: 'flex-end', backgroundColor: 'skyblue', borderRadius: 10, padding: 5, color: 'white', margin: 5,
  };
}


/** Update Messages.
 * gets first 20 Message With default parameter (id=null)
 * To retrieve more send the id of the last retrieved message.
 * @param {int} id - The id of Message .
 */
updateMessages(id = null) {
  axios.get('direct_message', {
    params: {
      last_message_retrieved_id: id
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
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.moreMessages(nativeEvent); }}
      >
        {this.state.messages.map((item, index) => (
          <View>
            <Text style={this.messageType(item.type)}>{item.text}</Text>
            <Text style={[this.messageType(item.type), { backgroundColor: 'white', color: 'gray', padding: 0, margin: 5 }]}>{item.created_at}</Text>
          </View>

        ))
        }
      </ScrollView>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ width: '85%' }}
          placeholder=""
          secureTextEntry={false}
          value={this.state.message}
          onChangeText={(message) => this.setState({ message })}
          autoFocus={false}
          multiline
        />

        <TouchableOpacity style={styles.messageButton}>
          <Image source={require('../../Assets/Images/send.png')} style={styles.buttomImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
}
