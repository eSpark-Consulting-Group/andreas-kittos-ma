import React, {memo} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import MIcons from 'react-native-vector-icons/FontAwesome';

import {MyText} from '..';
import {FloatCart} from '../../assets';

function FAB({quantity, onPress}: {quantity: number; onPress?: () => void}) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: 'red',
        position: 'absolute',
        bottom: -10,
        right: -10,
        zIndex: 100,
      }}>
      <FloatingAction
        onPressMain={onPress}
        color="white"
        floatingIcon={
          <View>
            <View
              style={{
                backgroundColor: '#FFBE55',
                position: 'absolute',
                borderRadius: 100,
                top: -5,
                right: -2,
                height: 15,
                width: 15,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}>
              {quantity && quantity > 0 ? (
                <MyText
                  size={8}
                  weight="700"
                  textColor="white"
                  text={quantity.toString()}
                />
              ) : (
                <MIcons name="plus" size={8} color={'white'} />
              )}
            </View>
            <FloatCart />
          </View>
        }
      />
    </View>
  );
}

export default memo(FAB);
