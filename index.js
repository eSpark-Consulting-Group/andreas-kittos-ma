/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import AppProvider from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists']);

AppRegistry.registerComponent(appName, () => AppProvider);
