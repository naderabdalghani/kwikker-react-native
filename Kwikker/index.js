import { AppRegistry, ToastAndroid, YellowBox } from 'react-native';
import axios from 'axios';
import App from './App';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Setting a timer for a long period',
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);
console.disableYellowBox = true;
// 3000 is your own server port, it could be a different number
// therefore copy the link json-server outputs once you run json-server --watch db.json
// axios.defaults.baseURL = 'http://localhost:3000'; // fake json-server
axios.defaults.baseURL = 'http://kwikkerbackend.eu-central-1.elasticbeanstalk.com/'; // actual server
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
