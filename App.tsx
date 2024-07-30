/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';

import App from './src/navigation';
import store from './src/app/store';

function AppProvider(): React.JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1625160203-guq9oapbhtejh25kpm5asn82cpla80r5.apps.googleusercontent.com',
      iosClientId:
        '1625160203-0kvs60tj860oqa076k2t4stc2bf1btf2.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
}

export default AppProvider;
