import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Image} from 'react-native';
import {SplachScr} from '../../assets';

export default function SplashScreen(): React.JSX.Element {
  useEffect(() => {}, []);

  return (
    <View>
      <Image style={{width: '100%', height: '100%'}} source={SplachScr} />
    </View>
  );
}
