import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, RefreshControl, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

/** @module Profile **/

export default class Profile extends Component {
_menu = null;

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
    profileUsername: '',
    myProfile: false,
    dataLoaded: false,
    uBlocked: true,
    blocked: false,
    rekweekerUsername: null,
  };
}


componentDidMount() {
  AsyncStorage.getItem('@app:id').then((id) => {
    this.setState({
      currentUsername: id,
      profileUsername: this.props.navigation.state.params.username,
    }, () => {
      this.pullRefresh();
      this.profileOwner();
    });
  });
  this.willFocusListener = this.props.navigation.addListener(
    'willFocus',
    () => {
      AsyncStorage.getItem('@app:id').then((id) => {
        this.setState({
          currentUsername: id,
          profileUsername: this.props.navigation.state.params.username,
        }, () => {
          this.pullRefresh();
          this.profileOwner();
        });
      });
    }
  );
}

/**
   * options of the settings menu
   * @memberof Profile
  */
getOPtions() {
  if (this.state.profileData.muted === false && this.state.profileData.blocked === false) return (['Mute', 'Block', 'Cancle']);
  if (this.state.profileData.muted && this.state.profileData.blocked) return (['Unmute', 'Unblock', 'Cancle']);
  if (this.state.profileData.blocked === false && this.state.profileData.muted) return (['Unmute', 'Block', 'Cancle']);
  return (['Mute', 'Unblock', 'Cancle']);
}

/**
   * gets more kweeks and likes after first 20
   * @memberof Profile
  */
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

 /** pull to refresh functionality.
   * updates profile, kweeks and likes
   * @memberof Profile
  */
 pullRefresh= () => {
   this.setState({ refreshing: false, profileUsername: this.props.navigation.state.params.username, },
     () => {
       this.updateProfile(this.state.profileUsername);
       this.updateKweeks();
       this.updateLikes();
     });
 }

/**
   * open settings menu
   * @memberof Profile
  */
showActionSheet = () => {
  this.ActionSheet.show();
}

/**
   * activate kweeks tab
   * @memberof Profile
  */
kweeks() {
  this.setState({ kweeksTab: true, likesTab: false, });
}

/**
   * activate likes tab
   * @memberof Profile
  */
likes() {
  this.setState({ kweeksTab: false, likesTab: true });
}

/**
   * navigate to folloewrs list
   * @memberof Profile
  */
Follower() {
  if (!this.state.refreshing) {
    this.props.navigation.navigate('FollowerList', {
      userName: this.state.profileData.username,
    });
  }
}

/**
   * navigate to conversation of the frofile user
   * @memberof Profile
  */
conversation() {
  if (!this.state.refreshing) {
    this.props.navigation.navigate('ConversationScreen', {
      title: this.state.profileData.screen_name,
      profileUrl: this.state.profileData.profile_image_url,
      userName: this.state.profileData.username,
    });
  }
}

/**
   * navigate to folloing list
   * @memberof Profile
  */
Following() {
  if (!this.state.refreshing) {
    this.props.navigation.navigate('FollowingList', {
      userName: this.state.profileData.username,
    });
  }
}

/**
   * navigate to edit profile
   * @memberof Profile
  */
EditProfile() {
  if (!this.state.refreshing) {
    this.props.navigation.navigate('EditProfileNavigator', {
      userName: this.state.profileData.username,
      cover: this.state.profileData.profile_banner_url,
      image: this.state.profileData.profile_image_url,
      bio: this.state.profileData.bio,
      birthDate: this.state.profileData.birth_date,
      screenName: this.state.profileData.screen_name,
    });
  }
}

/**
   * chechs if the profile is the profil of the current user of not
   * @memberof Profile
  */
profileOwner() {
  if (this.state.profileUsername === this.state.currentUsername) {
    this.setState({ myProfile: true });
  } else {
    this.setState({ myProfile: false });
  }
}

/**
   * view thetab content if it's kweeks or likes or empty
   * @memberof Profile
  */
tabContent() {
  if (this.state.kweeksTab) {
    if (this.state.kweeks.length !== 0) {
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
                replyTo={item.reply_info}
                following={item.user.following}
                mentions={item.mentions}
                navigation={this.props.navigation}
                refresh={() => this.pullRefresh()}
              />
            </TouchableOpacity>
          ))
      }

        </View>
      );
    }
    return (
      <View style={styles.Container}>
        <Text style={{ fontSize: 30 }}>
          Your Kweets will
        </Text>
        <Text style={{ fontSize: 30 }}>
          show up here
        </Text>
      </View>
    );
  }
  if (this.state.likesTab) {
    if (this.state.likes.length !== 0) {
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
                replyTo={item.reply_info}
                following={item.user.following}
                mentions={item.mentions}
                navigation={this.props.navigation}
                refresh={() => this.pullRefresh()}
              />
            </TouchableOpacity>
          ))
      }

        </View>
      );
    }
    return (
      <View style={styles.Container}>
        <Text style={{ fontSize: 30 }}>
          No likes
        </Text>
      </View>
    );
  }
}

/**
   * update kweeks or get more kweeks
   * @memberof Profile
   * @param {int} id - last id of kweeks.
  */
updateKweeks(id = null) {
  axios.get('kweeks/timelines/profile', {
    params: {
      last_retrieved_rekweeker_username: this.state.rekweekerUsername,
      last_retrieved_kweek_id: id,
      username: this.state.profileUsername
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
      if (this.state.kweeks[this.state.kweeks.length - 1].rekweek_info === null) {
        this.setState({ rekweekerUsername: null });
      } else {
        this.setState((prevState) => ({ rekweekerUsername: prevState.kweeks[prevState.kweeks.length - 1].rekweek_info.rekweeker_username }));
      }
    });
}

/**
   * update liked kweeks or get more liked kweeks
   * @memberof Profile
   * @param {int} id - last id of liked kweeks.
  */
updateLikes(id = null) {
  axios.get('kweeks/user/liked', {
    params: {
      username: this.state.profileUsername,
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


/** updates profile
   * gets profile info and update it
   * @memberof Profile
   * @param {string} userName - username of profile owner.
  */
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
        uBlocked: false,
        dataLoaded: true,
        blocked: response.data.blocked
      });
      if (this.state.myProfile) {
        AsyncStorage.setItem('@app:image', response.data.profile_image_url);
      }
    })
    .catch((error) => {
      this.setState({
        profileData: error.response.data,
        refreshing: false,
        uBlocked: true,
        dataLoaded: true
      });
      // handle error
      // console.log(error);
    })
    .then(() => {
      // always executed
    });
}

/**
   * unmute the profile owner
   * @memberof Profile
  */
unmute() {
  axios.delete('interactions/mutes', {
    params: {
      username: this.state.profileData.username
    }
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
      console.log('unmuted');
    })
    .catch((error) => {
      console.log('errrrrrrrrrrrrrror!');
    });
}

/**
   * unblock the profile owner
   * @memberof Profile
  */
unblock() {
  axios.delete('interactions/blocks', {
    params: {
      username: this.state.profileData.username
    }
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
      console.log('unblocked');
    })
    .catch((error) => {
      console.log('errrrrrrrrrrrrrror!');
    });
}

/**
   * mute the profile owner
   * @memberof Profile
  */
mute() {
  axios.post('interactions/mutes', {
    username: this.state.profileData.username
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
    })
    .catch((error) => {
    });
}

/**
   * block the profile owner
   * @memberof Profile
  */
block() {
  axios.post('interactions/blocks', {
    username: this.state.profileData.username
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
    })
    .catch((error) => {
    });
}

/**
   * handle settings menu is inteaction
   * @memberof Profile
  */
handleMenu(index) {
  if (index === 0 && this.state.profileData.muted === false) {
    this.mute();
  }
  if (index === 0 && this.state.profileData.muted) {
    this.unmute();
  }
  if (index === 1 && this.state.profileData.blocked === false) {
    this.block();
  }
  if (index === 1 && this.state.profileData.blocked) {
    this.unblock();
  }
}

/**
   * checks if the profile owner is blocked or not and return profile content
   * @memberof Profile
  */
youRBlocked() {
  if (this.state.blocked && !this.state.uBlocked) {
    return (
      <View>
        <View style={{ alignItems: 'center', backgroundColor: '#E1E8ED', marginTop: 5, paddingBottom: '80%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>@{this.state.profileData.username} is</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>blocked</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 10 }}>Are you sure you want to view</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>these Tweets? Viewing Tweets</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>won't unblock @{this.state.profileData.username}</Text>
          <TouchableOpacity
            style={{ margin: 10, borderColor: '#657786', borderWidth: 1, height: 30, borderRadius: 20, padding: 15, justifyContent: 'center', fontSize: 18 }}
            onPress={() => {
              this.setState({
                blocked: false
              });
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
              View Tweets
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (!this.state.uBlocked) {
    return (
      <View>
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
      </View>

    );
  }
  if (!this.state.dataLoaded) { return (null); }
  if (this.state.uBlocked) {
    return (
      <Text style={{ margin: 10 }}>
      You are blocked from following @{this.state.profileData.username} and viewing @{this.state.profileData.username}'s Tweets.
      </Text>
    );
  }
}

/**
   * checs if the profile owner is the current user or not to handle settings menu
   * @memberof Profile
  */
renderMenu() {
  if (!this.state.myProfile && this.state.dataLoaded) {
    return (
      <TouchableOpacity onPress={this.showActionSheet}>
        <View style={styles.menu}>
          <Image
            style={styles.menuImage}
            source={require('./../../Assets/Images/menu.png')}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (null);
}


render() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
            <View style={styles.backButton}>
              <FontAwesome
                name="arrow-left"
                size={26}
                style={{ color: '#fff' }}
              />
            </View>
          </TouchableNativeFeedback>
          {this.renderMenu()}
        </View>
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
          updateProfile={this.updateProfile.bind(this)}
          conversation={this.conversation.bind(this)}
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
          following={this.state.profileData.following}
          blocked={this.state.profileData.blocked}
          muted={this.state.profileData.muted}
          followsYou={this.state.profileData.follows_you}
          myProfile={this.state.myProfile}
          uBlocked={this.state.uBlocked}
          blockedView={this.state.blocked}
        />

        {this.youRBlocked()}


      </ScrollView>
      <ActionSheet
        ref={(o) => this.ActionSheet = o}
        options={this.getOPtions()}
        cancelButtonIndex={2}
        //destructiveButtonIndex={1}
        onPress={(index) => { this.handleMenu(index); }}
      />
    </View>
  );
}
}
