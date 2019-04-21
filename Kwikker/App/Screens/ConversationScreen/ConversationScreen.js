import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './Styles';
import { auth } from '../../Utils/Authorization';

/** @module ConversationScreen **/

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
      currentUsername: '',
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
      this.pullRefresh();
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.pullRefresh();
      }
    );
  }


  /** Send message
 *  sends message to specifice user
 *  (Post request) we send the message and the user name
 * @memberof ConversationScreen
 */
  async onSubmit() {
    if (this.state.message.length > 0 && !this.state.refreshing) {
      this.setState({ refreshing: true });
      axios.post('direct_message/',
        {
          text: this.state.message,
          username: this.props.navigation.state.params.userName,
          media_url: 'null'
        })
        .then((response) => {
          this.setState({
            message: '',
            scrolledDown: false,
          });
          this.textInput.clear();
          this.updateMessages();
        })
        .catch((error) => {
        });
    }
  }

  /** Get more Messages above when we get to the beginning of the scrollView.
 * Check we reached beginning of content
 * @memberof ConversationScreen
 * @param  {int} contentOffset - position on screen
 */
moreMessages=({ contentOffset }) => {
  if (contentOffset.y === 0 && this.state.messages.length) {
    this.setState({
      refreshing: true,
    });
    this.updateMessages(this.state.messages[this.state.messages.length - 1].id);
  }
}

/** pull to refresh functionality.
   * gets first 20 messages
   * @memberof ConversationScreen
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
 * @memberof ConversationScreen
 * @param {string} type - user name of the sender .
 */
 messageType(type) {
   if (type !== this.state.currentUsername) {
     return styles.otherMessage;
   }
   return styles.message;
 }


 /** styles messages.
 * if message from the other his image will be on the left.
 * @memberof ConversationScreen
 * @param {string} type - username of the sender .
 */
 userImage(type) {
   if (type !== this.state.currentUsername) {
     return <Image source={{ uri: this.props.navigation.state.params.profileUrl }} style={styles.userImage} />;
   }
   return (null);
 }

 /** Scroll Down once on opening conversation
 * @memberof ConversationScreen
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
 * @memberof ConversationScreen
 * @param {int} id - The id of Message .
 */
 updateMessages(id = null) {
   this.setState({ refreshing: true });
   axios.get('direct_message/', {
     params: {
       last_message_retrieved_id: id,
       username: this.props.navigation.state.params.userName
     }
   })
     .then((response) => {
       if (id === null) {
         this.setState({
           messages: response.data,
           refreshing: false,
         });
       } else {
         this.setState((prevState) => ({
           messages: prevState.messages.concat(response.data),
           refreshing: false,
         }));
       }
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
             enabled={false}
             refreshing={this.state.refreshing}
             onRefresh={this.pullRefresh}
           />
)}
         style={{ flex: 1, margin: 2 }}
         onScroll={({ nativeEvent }) => { this.moreMessages(nativeEvent); }}
       >
         {this.state.messages.slice(0).reverse().map((item, index) => (
           <View key={item.id}>
             <View style={{ flexDirection: 'row' }}>
               {this.userImage(item.from_username)}
               <Text style={this.messageType(item.from_username)}>{item.text}</Text>
             </View>
             <Text style={[this.messageType(item.from_username), styles.messageTime]}>{item.created_at}</Text>
           </View>

         ))
        }
       </ScrollView>

       <View style={{ flexDirection: 'row' }}>
         <TextInput
           ref={(input) => { this.textInput = input; }}
           style={styles.textInput}
           placeholder="Start a message"
           value={this.state.message}
           onChangeText={(message) => this.setState({ message })}
         />

         <TouchableOpacity onPress={() => { this.onSubmit(); }} style={styles.messageButton}>
           <Image source={require('../../Assets/Images/send.png')} style={styles.buttomImage} />
         </TouchableOpacity>
       </View>
     </View>
   );
 }
}
