/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';

import AppProvider from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['VirtualizedLists']);

AppRegistry.registerComponent(appName, () => AppProvider);
