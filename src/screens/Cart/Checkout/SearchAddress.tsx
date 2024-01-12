import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';

import {GapView, MyText, MyView} from '../../../components';
import {Map} from '../../../assets';
import {MyTheme} from '../../../types';

export default function SearchAddress() {
  const {colors} = useTheme() as MyTheme;
  return (
    <MyView topPad={0} hPad={0} style={{flex: 1}}>
      <Image source={Map} style={{width: '100%'}} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <MyText
            weight="500"
            size={16}
            textColor={'#666'}
            text="Unnamed Location"
          />
          <MyText
            size={12}
            textColor={colors.placeholder}
            text="Tap to select this location"
          />
        </View>
        <MIcons size={25} name="arrow-forward" color={colors.text} />
      </View>
      <GapView length={15} />
      <View style={{paddingHorizontal: 20}}>
        <MyText
          weight="500"
          size={16}
          textColor={'#666'}
          text="Nearby Places"
        />
        <GapView length={20} />
        <View style={{paddingHorizontal: 10}}>
          <MyText textColor={'#666'} text="Karachi" />
          <GapView length={20} />
          <MyText
            textColor={'#666'}
            text="NED University of Engineering and Technlogy"
          />
          <GapView length={20} />
          <MyText textColor={'#666'} text="Hammad Dental Clinic" />
          <GapView length={20} />
          <MyText textColor={'#666'} text="Web Designing Karachi" />
          <GapView length={20} />
          <MyText textColor={'#666'} text="Multi Consultants" />
        </View>
      </View>
    </MyView>
  );
}
