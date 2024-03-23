import React, {memo} from 'react';
import {StyleSheet, ImageBackground, ImageURISource, View} from 'react-native';

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
    <View style={{...styles.container, height: size, width: size}}>
      {Boolean(source?.uri) ? (
        <ImageBackground
          source={source}
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          borderRadius={100}>
          {edit && <AvatarEdit />}
        </ImageBackground>
      ) : (
        edit && <AvatarEdit />
      )}
    </View>
  );
}

export default memo(MyAvatar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9',
    borderRadius: 100,
  },
});
