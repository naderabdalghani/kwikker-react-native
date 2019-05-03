import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, RefreshControl, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
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
    menu: false,
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

setMenuRef = (ref) => {
  if (!this.state.refreshing) {
    this._menu = ref;
  }
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};


 pullRefresh= () => {
   this.setState({ refreshing: false, profileUsername: this.props.navigation.state.params.username, },
     () => {
       this.updateProfile(this.state.profileUsername);
       this.updateKweeks();
       this.updateLikes();
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


kweeks() {
  this.setState({ kweeksTab: true, likesTab: false, });
}

likes() {
  this.setState({ kweeksTab: false, likesTab: true });
}


Follower() {
  if (!this.state.refreshing) {
    this.props.navigation.push('FollowerList', {
      userName: this.state.profileData.username,
    });
  }
}

conversation() {
  if (!this.state.refreshing) {
    this.props.navigation.push('ConversationScreen', {
      title: this.state.profileData.screen_name,
      profileUrl: this.state.profileData.profile_image_url,
      userName: this.state.profileData.username,
    });
  }
}

Following() {
  if (!this.state.refreshing) {
    this.props.navigation.push('FollowingList', {
      userName: this.state.profileData.username,
    });
  }
}

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

profileOwner() {
  if (this.state.profileUsername === this.state.currentUsername) {
    this.setState({ myProfile: true });
  } else {
    this.setState({ myProfile: false });
  }
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
              replyTo={item.reply_info}
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
              replyTo={item.reply_info}
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


updateKweeks(id = null) {
  axios.get('kweeks/timelines/profile', {
    params: {
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
    });
}

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

mute() {
  axios.post('interactions/mutes', {
    username: this.state.profileData.username
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
      this.setState({ menu: false });
    })
    .catch((error) => {
      this.setState({ menu: false });
    });
}

block() {
  axios.post('interactions/blocks', {
    username: this.state.profileData.username
  })
    .then((response) => {
      this.updateProfile(this.state.profileUsername);
      this.menuPressed();
    })
    .catch((error) => {
      this.menuPressed();
    });
}

menu() {
  if (this.state.menu) {
    return (
      <View style={styles.itemssContainer}>
        <TouchableOpacity onPress={() => { this.mute(); }}>
          <View style={styles.menuItems}>
            <Text style={styles.menuText}>Mute</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.block(); }}>
          <View style={styles.menuItems}>
            <Text style={styles.menuText}>Block</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (<View />);
}

menuPressed() {
  if (this.state.menu) {
    this.setState({ menu: false });
  } else {
    this.setState({ menu: true });
  }
}

getOPtions() {
  if (this.state.profileData.muted === false && this.state.profileData.blocked === false) return (['Mute', 'Block']);
  if (this.state.profileData.muted && this.state.profileData.blocked) return (['Unmute', 'Unblock']);
  if (this.state.profileData.blocked === false && this.state.profileData.muted) return (['Unmute', 'Block']);
  return (['Mute', 'Unblock']);
}

showActionSheet = () => {
  this.ActionSheet.show();
}

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


youRBlocked() {
  if (this.state.blocked && !this.state.uBlocked) {
    return (
      <View>
        <Text style={{ margin: 10 }}>
      You blocked @{this.state.profileData.username} 
      Are you sure you want to view these Tweets? Viewing Tweets won't unblock
       @{this.state.profileData.username}
        </Text>
        <TouchableOpacity
          style={styles.follow}
          onPress={() => { this.setState({
            blocked: false
          }); }}
        >
          <Text style={{ color: '#1DA1F2', fontWeight: 'bold', fontSize: 15 }}>
          Yes, view profile
          </Text>
        </TouchableOpacity>
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


render() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
            <Image
              style={styles.backButton}
              source={require('./../../Assets/Images/black_back_button.png')}
            />
          </TouchableNativeFeedback>
          {/*
          <Menu
            ref={this.setMenuRef}
            button={<Text onPress={this.showMenu}>Show menu</Text>}
          >
            <MenuItem onPress={this.hideMenu}>Mute</MenuItem>
            <MenuItem onPress={this.hideMenu}>Block</MenuItem>
          </Menu> */}
          {this.renderMenu()}
        </View>
      </View>
      {/* <View style={styles.itemssContainer}>
        <TouchableOpacity onPress={() => { this.mute(); }}>
          <View style={styles.menuItems}>
            <Text style={styles.menuText}>Mute</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.block(); }}>
          <View style={styles.menuItems}>
            <Text style={styles.menuText}>Block</Text>
          </View>
        </TouchableOpacity>
      </View> */}
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
        cancelButtonIndex={0}
        //destructiveButtonIndex={1}
        onPress={(index) => { this.handleMenu(index); }}
      />
    </View>
  );
}
}
