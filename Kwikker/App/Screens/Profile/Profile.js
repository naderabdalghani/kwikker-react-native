import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, RefreshControl, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import Kweek from '../../Components/Kweek/Kweek';
import styles from './Styles';


const {
  indicator,
  indicatorActive,
  indicatorInActive,
  tabLable,
  tabLableActive,
  tabLableInActive,
  tabContent,
  tabContentContainer,
} = styles;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      profileData: [],
      kweeks: [],
      likes: [],
      refreshing: false,
      kweeksTab: true,
      likesTab: false,

    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id }, () => {
        this.pullRefresh();
      });
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({ refreshing: false,
        }, () => { this.pullRefresh(); });
      }
    );
  }


 pullRefresh= () => {
   this.setState({ refreshing: false, },
     () => {
       this.updateProfile(this.state.currentUsername);
       this.updateKweeks();
       this.updateLikes();
     });
 }


 tabContent() {
   if (this.state.kweeksTab) {
     return (
       <View style={{ flex: 1 }}>
         {this.state.kweeks.map((item, index) => (
           <TouchableOpacity key={item.id}>
             <Kweek
              key={item.id}
              id={item.id}
              date={item.created_at}
              profileImageUrl={item.user.profile_image_url}
              screenName={item.user.screen_name}
              userName={item.user.username}
              numberOfLikes={item.number_of_likes}
              numberOfRekweeks={item.number_of_rekweeks}
              numberOfReplies={item.number_of_replies}
              kweetText={item.text}
              liked={item.liked_by_user}
              rekweeked={item.rekweeked_by_user}
              rekweekerUserName={item.rekweek_info}
              mediaUrl={item.media_url}
              replyTo={item.reply_to}
              following={item.user.following}
              mentions={item.mentions}
              navigation={this.props.navigation}
            />
           </TouchableOpacity>
         ))
      }

       </View>
     );
   }
   if (this.state.likesTab) {
     return (
       <View style={{ flex: 1 }}>
         {this.state.likes.map((item, index) => (
           <TouchableOpacity key={item.id}>
             <Kweek
              key={item.id}
              id={item.id}
              date={item.created_at}
              profileImageUrl={item.user.profile_image_url}
              screenName={item.user.screen_name}
              userName={item.user.username}
              numberOfLikes={item.number_of_likes}
              numberOfRekweeks={item.number_of_rekweeks}
              numberOfReplies={item.number_of_replies}
              kweetText={item.text}
              liked={item.liked_by_user}
              rekweeked={item.rekweeked_by_user}
              rekweekerUserName={item.rekweek_info}
              mediaUrl={item.media_url}
              replyTo={item.reply_to}
              following={item.user.following}
              mentions={item.mentions}
              navigation={this.props.navigation}
            />
           </TouchableOpacity>
         ))
      }

       </View>
     );
   }
 }

 kweeks() {
   this.setState({ kweeksTab: true, likesTab: false, });
 }

 likes() {
   this.setState({ kweeksTab: false, likesTab: true });
 }

 Follower() {
   this.props.navigation.navigate('FollowerList', {
     userName: this.state.profileData.username,
   });
 }

 Following() {
   this.props.navigation.navigate('FollowingList', {
     userName: this.state.profileData.username,
   });
 }

 EditProfile() {
   this.props.navigation.navigate('EditProfileNavigator', {
     userName: this.state.profileData.username,
   });
 }


moreKweeKsAndLikes=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.kweeks.length) {
    this.setState({
      refreshing: true,
    });
    this.updateKweeks(this.state.kweeks[this.state.kweeks.length - 1].id);
  }
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.likes.length) {
    this.setState({
      refreshing: true,
    });
    this.updateLikes(this.state.likes[this.state.likes.length - 1].id);
  }
}


updateKweeks(id = null) {
  axios.get('kweeks/timelines/profile', {
    params: {
      last_retrieved_kweek_id: id,
      username: this.state.currentUsername
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({

          kweeks: response.data
        });
      } else {
        this.setState((prevState) => ({

          kweeks: prevState.kweeks.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
    })
    .then(() => {
      // always executed
    });
}

updateLikes(id = null) {
  axios.get('kweeks/user/liked', {
    params: {
      username: this.state.currentUsername,
      last_retrieved_kweek_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({

          likes: response.data
        });
      } else {
        this.setState((prevState) => ({

          likes: prevState.likes.concat(response.data)
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


updateProfile(userName) {
  this.setState({
    refreshing: true,
  });
  axios.get('user/profile', {
    params: {
      username: userName
    }
  })
    .then((response) => {
      this.setState({
        profileData: response.data,
        refreshing: false,
      });
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
      <View style={styles.bbcontainer}>
        <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
          <Image
            style={styles.backButton}
            source={require('./../../Assets/Images/black_back_button.png')}
          />
        </TouchableNativeFeedback>
      </View>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        onScroll={({ nativeEvent }) => { this.moreKweeKsAndLikes(nativeEvent); }}
      >
        <ProfileHeader
          Follower={this.Follower.bind(this)}
          Following={this.Following.bind(this)}
          EditProfile={this.EditProfile.bind(this)}

          ref={(ref) => { this.feedback = ref; }}
          followingCount={this.state.profileData.following_count}
          followersCount={this.state.profileData.followers_count}
          username={this.state.profileData.username}
          bio={this.state.profileData.bio}
          birthDate={this.state.profileData.birth_date}
          createdAt={this.state.profileData.created_at}
          profileBannerUrl={this.state.profileData.profile_banner_url}
          profileImageUrl={this.state.profileData.profile_image_url}
          screenName={this.state.profileData.screen_name}
        />
        <View style={styles.fackTabContainer}>
          <TouchableOpacity style={styles.fackTab} onPress={this.kweeks.bind(this)}>
            <Text style={[tabLable, this.state.kweeksTab ? tabLableActive : tabLableInActive]}>
                Kweeks
            </Text>
            <View style={[indicator, this.state.kweeksTab ? indicatorActive : indicatorInActive]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fackTab} onPress={this.likes.bind(this)}>
            <Text style={[tabLable, this.state.likesTab ? tabLableActive : tabLableInActive]}>
                Likes
            </Text>
            <View style={[indicator, this.state.likesTab ? indicatorActive : indicatorInActive]} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />


        {this.tabContent()}


      </ScrollView>
    </View>
  );
}
}
