import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import React, {memo} from 'react';

import MyText from '../MyText';
import {MyBannerProps, MyTheme} from '../../types';
import {useTheme} from '@react-navigation/native';

function MyBanner({
  background,
  title1,
  title2,
  touchable,
  onPress,
}: MyBannerProps) {
  const theme = useTheme() as MyTheme;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.95}
      disabled={touchable ? false : true}>
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

export default memo(MyBanner);

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
