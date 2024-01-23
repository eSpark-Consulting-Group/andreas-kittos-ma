/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import App from './src/navigation';
import store from './src/app/store';

function AppProvider(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
}

export default AppProvider;
