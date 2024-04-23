import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MapboxGL from '@rnmapbox/maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

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

  const [lat, setLat] = useState(34.6826183);
  const [long, setLong] = useState(33.0306031);
  const [markerLat, setMarkerLat] = useState(33.24771523931372);
  const [markerLong, setMarkerLong] = useState(35.070026403487844);
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.05, // Adjust this value to change the zoom level
    longitudeDelta: 0.05, // Adjust this value to change the zoom level
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: lat,
    longitude: long,
  });

  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGZjZWZ5MHJqcTJxcnFnczJuMXZjaCJ9.N6v3J8c2cf7qqiQhJFtJDA',
  );

  const confirmUserLocation = () => {
    // navigation.navigate('Checkout', {latLong: `${lat},${long}`});
    console.log('region lat long', region);
  };

  const onRegionChange = (newRegion: any) => {
    // Update the marker's coordinates to the center of the map's new region
    setRegion(newRegion);
    setMarkerCoordinate({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  return (
    <MyView topPad={0} hPad={0} style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        <Marker coordinate={markerCoordinate} pinColor={colors.primary} />
      </MapView>
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
                      if (
                        item.geometry.coordinates[0] == lat &&
                        item.geometry.coordinates[1] == long
                      ) {
                        setLat(markerLat);
                        setLong(markerLong);
                        setTimeout(() => {
                          setLat(item.geometry.coordinates[0]);
                          setLong(item.geometry.coordinates[1]);
                        }, 0);
                      } else {
                        setLat(item.geometry.coordinates[0]);
                        setLong(item.geometry.coordinates[1]);
                      }
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
