import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, RefreshControl, Image, TouchableOpacity, ScrollView } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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
    myProfile: '',
    menu: false,
  };
}


componentDidMount() {
  AsyncStorage.getItem('@app:id').then((id) => {
    this.setState({
      currentUsername: id,
      profileUsername: this.props.navigation.state.params.username,
    }, () => {
      this.profileOwner();
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

setMenuRef = (ref) => {
  this._menu = ref;
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};


 pullRefresh= () => {
   this.setState({ refreshing: false, manu: false },
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

profileOwner() {
  if (this.state.profileUsername === this.state.currentUsername) {
    this.setState({ myProfile: 'myProfile' });
  } else {
    this.setState({ myProfile: 'notMyProfile' });
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

mute() {

}

block() {

}

menu() {
  if (this.state.menu) {
    return (
      <View style={{ width: '40%', backgroundColor: '#fff', borderColor: '#AAB8C2', borderWidth: 1, marginLeft: '55%', }}>
        <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingLeft: 10 }}>
          <Text style={{ color: '#000' }}>Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingLeft: 10 }}>
          <Text style={{ color: '#000' }}>Block</Text>
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
          <TouchableOpacity onPress={() => { this.menuPressed(); }}>
            <View style={styles.menu}>
              <Image
                style={styles.menuImage}
                source={require('./../../Assets/Images/menu.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.menu()}
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
          following={this.state.profileData.following}
          blocked={this.state.profileData.blocked}
          myProfile={this.state.myProfile}
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
