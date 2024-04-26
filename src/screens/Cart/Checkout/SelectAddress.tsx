import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme, UserInfoAddr} from '../../../types';
import {GapView, MyText, MyView, OverlayLoader} from '../../../components';
import {DeleteBtn, Leaves} from '../../../assets';
import {
  handleCalculateDist,
  handleDeleteAddress,
  handleGetAddresses,
} from './utils';
import {useDispatch} from 'react-redux';
import {
  setShipAddress,
  setShipAddressId,
} from '../../../features/checkout/checkoutSlice';
import {
  BottomTabParamsList,
  D1ParamsList,
} from '../../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AddressNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList,
  'SelectAddress'
>;

export default function SelectAddress() {
  const {colors} = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const navigation = useNavigation<AddressNavigationProps['navigation']>();

  const [addrs, setAddrs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    setLoading(true);
    const addr = await handleGetAddresses();
    setLoading(false);
    setAddrs(addr as []);
  };

  const deleteAddress = async (id: string) => {
    const addr = await handleDeleteAddress(id);
    if (addr.status) {
      getAddresses();
    }
  };

  const renderAddresses = ({
    item,
  }: {
    item: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      address: UserInfoAddr;
    };
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          padding: 20,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
        }}
        onPress={async () => {
          setLoading(true);
          const calculationRes = await handleCalculateDist(
            `${item.address.latitude},${item.address.longitude}`,
          );
          if (calculationRes.data) {
            console.log('kms', calculationRes.data[0].distance / 1000 - 15);
            dispatch(
              setShipAddress({
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                phoneNumber: item.phoneNumber,
                apartment: item.address.apartment,
                block: item.address.block,
                city: item.address.city,
                country: item.address.country,
                latitude: item.address.latitude,
                longitude: item.address.longitude,
                state: item.address.state,
                street: item.address.street,
                zipCode: item.address.zipCode,
                distanceOut:
                  calculationRes.data[0].distance / 1000 - 15 > 0
                    ? calculationRes.data[0].distance / 1000 - 15
                    : 0,
              }),
            );
            dispatch(setShipAddressId(item.id));
            navigation.navigate('Checkout', {latLong: ''});
            setLoading(true);
          } else {
            setLoading(true);
          }
        }}>
        <View style={{flexDirection: 'row'}}>
          <MyText text="Street Name:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address?.street.trim() ?? 'Street Name'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <MyText text="City:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.city ?? 'City'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <MyText text="State / Province:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.state ?? 'State / Province'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <MyText text="Country:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.country ?? 'Country'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <MyText text="Zip-code:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.zipCode ?? 'Zip-code'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            deleteAddress(item.id);
            dispatch(setShipAddressId(''));
            dispatch(setShipAddress(null));
          }}
          style={{position: 'absolute', right: 20, bottom: 10}}>
          <DeleteBtn />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <MyView style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <FlatList
        data={addrs}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
        renderItem={renderAddresses}
        ItemSeparatorComponent={() => <GapView length={15} />}
        ListEmptyComponent={
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Leaves />
              <GapView length={20} />
              <MyText
                text="Looks like you haven’t save any address yet!"
                style={{textAlign: 'center'}}
              />
            </View>
          </View>
        }
      />
    </MyView>
  );
}
