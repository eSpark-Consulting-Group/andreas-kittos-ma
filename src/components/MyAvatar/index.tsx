import React, {memo} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ImageURISource,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {AvatarEdit} from '../../assets';

function MyAvatar({
  source,
  size,
  edit,
  getImage,
}: {
  source?: ImageURISource;
  size?: number;
  edit?: boolean;
  getImage?: (image?: string) => void;
}) {
  const getPhotos = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets) {
      getImage?.(result?.assets[0]?.uri);
    }
  };

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
          {edit && (
            <TouchableOpacity activeOpacity={1} onPress={() => getPhotos()}>
              <AvatarEdit />
            </TouchableOpacity>
          )}
        </ImageBackground>
      ) : (
        edit && (
          <TouchableOpacity activeOpacity={1} onPress={() => getPhotos()}>
            <AvatarEdit />
          </TouchableOpacity>
        )
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
