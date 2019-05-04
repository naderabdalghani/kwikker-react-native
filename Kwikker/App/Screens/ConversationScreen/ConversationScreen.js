import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
    headerRight: (
      <TouchableOpacity onPress={() => {
        navigation.navigate('Profile', {
          username: navigation.state.params.userName,
        });
      }
    }
      >
        <EvilIcons
          name="exclamation" size={35} color="rgb(0, 0, 0)" style={{ margin: 10 }}
        />
      </TouchableOpacity>

    ),

  });


  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: false,
      message: '',
      photo: null,
      photoID: null,
      currentUsername: '',
    };
  }


  componentDidMount() {
    let socket = io('http://kwikkerbackend.eu-central-1.elasticbeanstalk.com', { transports: ['websocket'] });
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
        socket = io('http://kwikkerbackend.eu-central-1.elasticbeanstalk.com', { transports: ['websocket'] });
        socket.connect();
        AsyncStorage.getItem('@app:id').then((id) => {
          if (id !== this.state.currentUsername) {
            this.setState({ currentUsername: id, },
              () => {
                if (this.props.navigation.state.params.userName.localeCompare(this.state.currentUsername) > 0) { eventSockt = this.state.currentUsername.concat(this.props.navigation.state.params.userName); } else { eventSockt = this.props.navigation.state.params.userName.concat(this.state.currentUsername); }
              });
            socket.on(eventSockt, (message) => {
              this.updateMessages();
            });
          }
        });
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
    if ((this.state.message && !this.state.refreshing) || (this.state.photo && !this.state.refreshing)) {
      if (this.state.photo) {
        this.setState({ refreshing: true });
        const formData = new FormData();
        formData.append('file', { name: this.state.photo.fileName, type: this.state.photo.type, uri: this.state.photo.uri });
        axios({
          method: 'post',
          url: 'media/',
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
          .then((response) => {
            this.setState({ photoID: response.data.media_id });
          })
          .catch(() => {
            this.setState({ refreshing: false });
            ToastAndroid.show('failed to send image', ToastAndroid.SHORT);
          })
          .then(() => {
            if (this.state.photoID) {
              axios.post('direct_message/',
                {
                  text: this.state.message,
                  username: this.props.navigation.state.params.userName,
                  media_id: this.state.photoID
                })
                .then((response) => {
                  this.setState({
                    message: '',
                    photoID: null,
                    photo: null
                  });
                  this.textInput.clear();
                })
                .catch((error) => {
                  this.setState({ refreshing: false });
                  ToastAndroid.show('failed to send image', ToastAndroid.SHORT);
                });
            }
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
        this.setState({ photo: response });
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
 * @param {string} media - if message has media render it.
 */
 isMedia(media) {
   if (media) {
     return (
       <Image
         resizeMode="contain"
         source={{ uri: media }} style={{ minWidth: 200,
           alignSelf: 'center',
           width: '100%',
           minHeight: 400,
           margin: 5 }}
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

 /** Render X symbol.
 * to remove picked image
 * @memberof ConversationScreen
 */

 renderX() {
   if (this.state.photo) {
     return (
       <EvilIcons
         onPress={() => {
           this.setState({ photo: null });
         }} name="close" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }}
       />
     );
   }
   return (null);
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
                 {this.isMedia(item.media_url)}
                 <Text style={item.from_username !== this.state.currentUsername ? { color: 'black' } : { color: 'white', }}>{item.text}</Text>
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
       }}
       >
         <TouchableOpacity onPress={this.handleChoosePhoto} style={{ alignSelf: 'center', width: '15%' }}>
           <FontAwesome name="photo" size={25} color="rgb(0, 0, 0)" onPress={this.handleChoosePhoto} style={{ alignSelf: 'center', paddingLeft: 10, paddingTop: 15, }} />
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
       { this.renderX() }
       <TouchableOpacity style={{ maxHeight: '50%', maxWidth: '100%' }}>
         <Image resizeMode="contain" source={this.state.photo} style={{ maxHeight: '100%', maxWidth: '100%' }} />
       </TouchableOpacity>
     </View>
   );
 }
}
