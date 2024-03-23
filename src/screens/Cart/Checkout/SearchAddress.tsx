import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MapboxGL from '@rnmapbox/maps';

import {GapView, MyText, MyView} from '../../../components';
import {MyTheme} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  D1ParamsList,
} from '../../../types/navigationParams';

type MapNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList,
  'SearchAddress'
>;

export default function SearchAddress() {
  const {colors} = useTheme() as MyTheme;
  const navigation = useNavigation<MapNavigationProps['navigation']>();

  const [lat, setLat] = useState(33.24771523931372);
  const [long, setLong] = useState(35.070026403487844);

  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGZjZWZ5MHJqcTJxcnFnczJuMXZjaCJ9.N6v3J8c2cf7qqiQhJFtJDA',
  );

  const confirmUserLocation = () => {
    navigation.navigate('Checkout', {latLong: `${lat},${long}`});
  };

  return (
    <MyView topPad={0} hPad={0} style={{flex: 1}}>
      {/* <Image source={Map} style={{width: '100%'}} /> */}
      <MapboxGL.MapView
        style={{flex: 1}}
        onCameraChanged={cam => {
          setLat(cam.properties.center[0]);
          setLong(cam.properties.center[1]);
        }}>
        <MapboxGL.Camera
          centerCoordinate={[33.226160585800415, 35.05016499668548]}
          zoomLevel={9}
        />
        <MapboxGL.MarkerView
          coordinate={[lat, long]}
          children={
            <View
              style={{
                paddingVertical: 10,
              }}>
              <MIcons
                name="location-on"
                color={colors.primary}
                size={35}
                style={{top: -10}}
              />
            </View>
          }
        />
        {/* <MapboxGL.MarkerView
          coordinate={[lat, long]}
          children={<MIcons name="location-on" size={24} />}
        /> */}
      </MapboxGL.MapView>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={confirmUserLocation}>
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
      </TouchableOpacity>
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
