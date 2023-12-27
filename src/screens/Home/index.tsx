import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {HomeTab, LaundryBack} from '../../assets';
import AntIcon from 'react-native-vector-icons/AntDesign';

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
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
          Laundry
        </Text>
      </View>
    </ImageBackground>
  </View>
);
