import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import io from 'socket.io-client';
import styles from './Styles';
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
      message: '',
      photo: '',
      formData: '',
      photoID: 'null',
      currentUsername: '',
    };
  }


  componentDidMount() {
    const socket = io('http://kwikkerbackend.eu-central-1.elasticbeanstalk.com', { transports: ['websocket'] });
    socket.connect();
    let eventSockt;
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id, },
        () => {
          if (this.props.navigation.state.params.userName.localeCompare(this.state.currentUsername) > 0) { eventSockt = this.state.currentUsername.concat(this.props.navigation.state.params.userName); } else { eventSockt = this.props.navigation.state.params.userName.concat(this.state.currentUsername); }
        });
      socket.on(eventSockt, (message) => {
        this.updateMessages();
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

  /** Send message
 *  sends message to specifice user
 *  (Post request) we send the message and the user name
 * @memberof ConversationScreen
 */
  async onSubmit() {
    if ((this.state.message.length > 0 && !this.state.refreshing) || this.state.photo) {
      if (this.state.photo) {
        this.setState({ refreshing: true });
        axios.post('media/', {
          params: {
            file: this.state.formData
          }
        })
          .then((response) => {
            console.warn(response.data.media_id);
            this.setState({
              photoID: response.data.media_id,
              photo: '',
            });
            this.textInput.clear();
          })
          .catch((error) => {
          }).then(() => {
            axios.post('direct_message/',
              {
                text: this.state.message,
                username: this.props.navigation.state.params.userName,
                media_id: this.state.photoID
              })
              .then((response) => {
                this.setState({
                  message: '',
                  photoID: 'null',
                });
                this.textInput.clear();
              })
              .catch((error) => {
              });
          });
      } else {
        axios.post('direct_message/',
          {
            text: this.state.message,
            username: this.props.navigation.state.params.userName,
            media_id: this.state.photoID
          })
          .then((response) => {
            this.setState({
              message: '',
              photoID: 'null',
            });
            this.textInput.clear();
          })
          .catch((error) => {
          });
      }
    }
  }


  /** when user choose Photo
 * @memberof ConversationScreen
 */
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        const data = new FormData();
        data.append('picture', {
          uri: response.path,
          name: response.fileName,
          type: response.type
        });
        this.setState({ photo: response, formData: data });
      }
    });
  };


  /** Get more Messages above when we get to the beginning of the scrollView.
 * Check we reached beginning of content
 * @memberof ConversationScreen
 * @param  {int} contentOffset - position on screen
 */
moreMessages=({ contentOffset }) => {
  if (contentOffset.y === 0 && this.state.messages.length && this.state.refreshing !== true) {
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
   },
   () => { this.updateMessages(); });
 }

 /** reander media
 * @memberof ConversationScreen
 */
 isMedia(media) {
   if (media) {
     return (
       <Image
         resizeMode="contain"
         source={{ uri: media }} style={{ width: 200,
           height: 200 }}
       />
     );
   }
   return (null);
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
         },
         () => { this.scrollView.scrollToEnd({ animated: true }); });
       } else {
         this.setState((prevState) => ({
           messages: prevState.messages.concat(response.data),
           refreshing: false,
         }), () => { this.scrollView.scrollTo({ y: 5 }); });
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
           <View
             key={item.id}
           >
             <View style={{ flexDirection: 'row' }}>
               {this.userImage(item.from_username)}
               <View style={this.messageType(item.from_username)}>
                 <Text style={item.from_username !== this.state.currentUsername ? { color: 'black' } : { color: 'white', }}>{item.text}</Text>
                 {this.isMedia(item.media_url)}
               </View>
             </View>
             <Text style={[this.messageType(item.from_username), styles.messageTime]}>{item.created_at}</Text>
           </View>

         ))
        }
       </ScrollView>

       <View style={{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'stretch', }}
       >
         <TouchableOpacity onPress={this.handleChoosePhoto} style={{ alignSelf: 'center' }}>
           <FontAwesome name="photo" size={25} color="rgb(0, 0, 0)" onPress={this.handleChoosePhoto} style={{ alignSelf: 'center' }} />
         </TouchableOpacity>
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
       <TouchableOpacity onPress={() => { this.setState({ photo: '' }); }} style={{ maxHeight: '30%', maxWidth: '30%', alignSelf: 'center' }}>
         <Image source={this.state.photo} style={{ maxHeight: '100%', maxWidth: '100%', alignSelf: 'center' }} />
       </TouchableOpacity>
     </View>
   );
 }
}
