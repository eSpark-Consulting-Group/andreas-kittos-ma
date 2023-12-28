import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {LaundryBack} from '../../assets';
import {MyText} from '../../components';

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
      <MyBanner />
    </View>
  );
}

const MyBanner = () => (
  <View style={{width: '100%', alignItems: 'center'}}>
    <ImageBackground
      source={LaundryBack}
      style={{
        width: 320,
        height: 140,
      }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText size={20} weight="700" style={{color: '#fff'}}>
          Laundry
        </MyText>
      </View>
    </ImageBackground>
  </View>
);
