import React, {memo} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ImageURISource,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

import {AvatarEdit} from '../../assets';
import {User, setUserData} from '../../features/user/userSlice';

function MyAvatar({
  source,
  size,
  edit,
}: {
  source?: ImageURISource;
  size?: number;
  edit?: boolean;
}) {
  const userData: User = useSelector((store: any) => store.user.userData);
  const dispatch = useDispatch();

  const getPhotos = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets) {
      console.log('res', result?.assets[0]?.uri);
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
            <TouchableWithoutFeedback onPress={() => getPhotos()}>
              <AvatarEdit />
            </TouchableWithoutFeedback>
          )}
        </ImageBackground>
      ) : (
        edit && (
          <TouchableWithoutFeedback onPress={() => getPhotos()}>
            <AvatarEdit />
          </TouchableWithoutFeedback>
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
