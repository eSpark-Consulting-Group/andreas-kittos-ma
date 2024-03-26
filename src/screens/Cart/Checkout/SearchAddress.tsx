import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
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
import {useSelector} from 'react-redux';
import {WINDOW_HEIGHT} from '../../../constants';

type MapNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList,
  'SearchAddress'
>;

export default function SearchAddress() {
  const {colors} = useTheme() as MyTheme;
  const navigation = useNavigation<MapNavigationProps['navigation']>();
  const searchedPlaces: {
    text: string;
    place_name: string;
    geometry: {coordinates: number[]};
  }[] = useSelector((store: any) => store.checkout.searchedPlaces);

  const [lat, setLat] = useState(33.24771523931372);
  const [long, setLong] = useState(35.070026403487844);
  const [markerLat, setMarkerLat] = useState(33.24771523931372);
  const [markerLong, setMarkerLong] = useState(35.070026403487844);

  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGZjZWZ5MHJqcTJxcnFnczJuMXZjaCJ9.N6v3J8c2cf7qqiQhJFtJDA',
  );

  const confirmUserLocation = () => {
    navigation.navigate('Checkout', {latLong: `${lat},${long}`});
  };

  console.log('lat long', lat, long);

  return (
    <MyView topPad={0} hPad={0} style={{flex: 1}}>
      {/* <Image source={Map} style={{width: '100%'}} /> */}

      <MapboxGL.MapView
        style={{height: WINDOW_HEIGHT * 0.45}}
        onCameraChanged={cam => {
          setMarkerLat(cam.properties.center[0]);
          setMarkerLong(cam.properties.center[1]);
        }}>
        <MapboxGL.Camera centerCoordinate={[lat, long]} zoomLevel={9} />
        <MapboxGL.MarkerView
          coordinate={[markerLat, markerLong]}
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
            text="Confirm Location"
          />
          <MyText
            size={12}
            textColor={colors.placeholder}
            text="Tap to select the location"
          />
        </View>
        <MIcons size={25} name="arrow-forward" color={colors.text} />
      </TouchableOpacity>
      <GapView length={15} />
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <MyText weight="500" size={16} textColor={'#666'} text="Places" />
        <GapView length={20} />
        <View style={{paddingHorizontal: 10, flex: 1}}>
          {searchedPlaces?.length > 0 && (
            <ScrollView>
              {searchedPlaces?.map(item => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(
                        'item.geometry.coordinates',
                        item.geometry.coordinates,
                      );

                      setLat(item.geometry.coordinates[0]);
                      setLong(item.geometry.coordinates[1]);
                    }}>
                    <MyText textColor={'#666'} text={item.text} />
                    <MyText
                      size={10}
                      textColor={'#666'}
                      text={item.place_name}
                    />
                    <GapView length={20} />
                  </TouchableOpacity>
                </>
              ))}
            </ScrollView>
          )}
          {searchedPlaces == null ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText
                textColor={'#666'}
                text={'Searched Places will be shown here..'}
              />
            </View>
          ) : searchedPlaces?.length < 1 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MyText textColor={'#666'} text={'No Places found'} />
            </View>
          ) : null}
        </View>
      </View>
    </MyView>
  );
}
