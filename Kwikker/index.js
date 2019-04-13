import { AppRegistry, ToastAndroid } from 'react-native';
import axios from 'axios';
import App from './App';
import { name as appName } from './app.json';

// 3000 is your own server port, it could be a different number
// therefore copy the link json-server outputs once you run json-server --watch db.json

axios.defaults.baseURL = 'http://localhost:3000/'; // fake json-server
// axios.defaults.baseURL = 'http://6d5bcddc.ngrok.io/'; // actual server
axios.defaults.timeout = 5000;

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    this.props.navigation.push('Login');
    ToastAndroid.show('Session expired.', ToastAndroid.LONG);
  }
  return Promise.reject(error);
});

AppRegistry.registerComponent(appName, () => App);
