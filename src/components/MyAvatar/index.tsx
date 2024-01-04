import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ImageURISource,
} from 'react-native';

import {AvatarEdit} from '../../assets';

export default function MyAvatar({
  source,
  size,
  edit,
}: {
  source?: ImageURISource;
  size?: number;
  edit?: boolean;
}) {
  return (
    <ImageBackground
      source={source}
      borderRadius={100}
      style={{
        height: size,
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {edit && <AvatarEdit />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
