/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import App from './src/navigation';
import store from './src/app/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {View} from 'react-native';
import {Image} from 'react-native';
import {SplachScr} from './src/assets';

function AppProvider(): React.JSX.Element {
  const [splashHide, setSplashHide] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1625160203-guq9oapbhtejh25kpm5asn82cpla80r5.apps.googleusercontent.com',
      iosClientId:
        '1625160203-0kvs60tj860oqa076k2t4stc2bf1btf2.apps.googleusercontent.com',
      offlineAccess: true,
    });
    setTimeout(() => {
      setSplashHide(true);
    }, 3200);
  }, []);

  return splashHide ? (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  ) : (
    <View>
      <Image style={{width: '100%', height: '100%'}} source={SplachScr} />
    </View>
  );
}

export default AppProvider;
