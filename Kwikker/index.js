import { AppRegistry } from 'react-native';
import axios from 'axios';
import App from './App';
import { name as appName } from './app.json';

// 3000 is your own server port, it could be a different number
// therefore copy the link json-server outputs once you run json-server --watch db.json
axios.defaults.baseURL = 'http://localhost:3000';

AppRegistry.registerComponent(appName, () => App);
