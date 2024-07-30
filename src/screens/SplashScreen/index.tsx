import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import {SplachScr} from '../../assets';
import {colors} from '../../theme';

export default function SplashScreen(): React.JSX.Element {
  const [change, setChange] = useState(false);
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      await BootSplash.hide({fade: true});
      setTimeout(() => {
        setChange(true);
      }, 3000);
    })();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoScaleAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {change ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: textFadeAnim,
              },
            ]}>
            MPOUGADA LAUNDRY SERVICE
          </Animated.Text>
          <Animated.Image
            source={require('../../assets/images/logo.png')} // Change this to your logo image
            resizeMode={'contain'}
            style={[
              styles.logo,
              {
                transform: [{scale: logoScaleAnim}],
              },
            ]}
          />
        </View>
      ) : (
        <Image style={{width: '100%', height: '100%'}} source={SplachScr} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    color: colors.light.primary,
    textAlign: 'center',
    width: '80%',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
