import React, {memo} from 'react';
import {StyleSheet, ImageBackground, ImageURISource} from 'react-native';

import {AvatarEdit} from '../../assets';

function MyAvatar({
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
        ...styles.container,
      }}>
      {edit && <AvatarEdit />}
    </ImageBackground>
  );
}

export default memo(MyAvatar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
