import React, {useRef, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import MapboxGL from '@rnmapbox/maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {GapView, MyText, MyView, OverlayLoader} from '../../../components';
import {MyTheme} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  D1ParamsList,
} from '../../../types/navigationParams';
import {useDispatch, useSelector} from 'react-redux';
import {WINDOW_HEIGHT} from '../../../constants';
import {setSearchRegion} from '../../../features/search/searchSlice';

type MapNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList,
  'SearchAddress'
>;
const initial_lat = 34.6826183;
const initial_long = 33.0306031;

// Define the coordinates for Cyprus
const CYPRUS_REGION = {
  latitude: 35.1264, // Center latitude
  longitude: 33.4299, // Center longitude
  latitudeDelta: 1.5, // Latitude delta to cover the entire country
  longitudeDelta: 2.5, // Longitude delta to cover the entire country
};

export default function SearchAddress() {
  const {colors} = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const navigation = useNavigation<MapNavigationProps['navigation']>();
  const loader = useSelector((store: any) => store.search.searchLoader);
  const searchedPlaces: any[] = useSelector(
    (store: any) => store.checkout.searchedPlaces,
  );

  const mapViewRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: initial_lat,
    longitude: initial_long,
    latitudeDelta: 0.05, // Adjust this value to change the zoom level
    longitudeDelta: 0.05, // Adjust this value to change the zoom level
  });
  const markerRef = useRef({
    latitude: initial_lat,
    longitude: initial_long,
  });

  // MapboxGL.setAccessToken(
  //   'sk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGZjZWZ5MHJqcTJxcnFnczJuMXZjaCJ9.N6v3J8c2cf7qqiQhJFtJDA',
  // );

  const confirmUserLocation = () => {
    navigation.navigate('Checkout', {
      latLong: `${region.latitude},${region.longitude}`,
    });
    console.log('region lat long', region);
  };

  const onRegionChange = (newRegion: any) => {
    // Update the marker's coordinates to the center of the map's new region
    markerRef.current = {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    };
    setRegion(newRegion);
    dispatch(setSearchRegion(newRegion));
  };

  const handlePlacePress = (lat: number, long: number) => {
    const newRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };

    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion(newRegion, 250); // Animate to the new region over 500ms
    }
  };

  return (
    <MyView topPad={0} hPad={0} style={{flex: 1}}>
      <OverlayLoader isShow={loader} />
      <MapView
        ref={mapViewRef}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        <Marker coordinate={markerRef.current} pinColor={colors.primary} />
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
                      console.log('ye hit hoa?', JSON.stringify(item));
                      handlePlacePress(
                        item.geometry.location.lat,
                        item.geometry.location.lng,
                      );
                    }}>
                    <MyText textColor={'#666'} text={item.formatted_address} />
                    <MyText size={10} textColor={'#666'} text={item.name} />
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
