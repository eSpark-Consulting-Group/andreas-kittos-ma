import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

import {MyText} from '..';
import {MyBannerProps, MyTheme} from '../../types';
import {useTheme} from '@react-navigation/native';

export default function MyBanner({
  background,
  title1,
  title2,
  touchable,
}: MyBannerProps) {
  const theme = useTheme() as MyTheme;
  return (
    <TouchableOpacity activeOpacity={0.95} disabled={touchable ? false : true}>
      <ImageBackground
        source={background}
        imageStyle={styles.image}
        style={styles.background}>
        <MyText
          size={20}
          weight="700"
          style={styles.title}
          textColor={
            theme.dark ? theme.colors.negative : theme.colors.positive
          }>
          {title1}
        </MyText>
        {title2 && (
          <MyText
            size={20}
            weight="700"
            style={styles.title}
            textColor={
              theme.dark ? theme.colors.negative : theme.colors.positive
            }>
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
    textAlign: 'center',
  },
});
