import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

import {MyText} from '..';
import {MyBannerProps} from '../../types';

export default function MyBanner({
  background,
  title1,
  title2,
  touchable,
}: MyBannerProps) {
  return (
    <TouchableOpacity activeOpacity={0.95} disabled={touchable ? false : true}>
      <ImageBackground
        source={background}
        imageStyle={styles.image}
        style={styles.background}>
        <MyText size={20} weight="700" style={styles.title}>
          {title1}
        </MyText>
        {title2 && (
          <MyText size={20} weight="700" style={styles.title}>
            {title2}
          </MyText>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
  },
  background: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
});
