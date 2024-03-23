import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {MyTheme, UserInfoAddr} from '../../../types';
import {GapView, MyText, MyView} from '../../../components';
import {DeleteBtn} from '../../../assets';
import {handleGetAddresses} from './utils';

export default function SelectAddress() {
  const {colors} = useTheme() as MyTheme;
  const [addrs, setAddrs] = useState([]);

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    const addr = await handleGetAddresses();
    console.log('addr', addr);
    setAddrs(addr as []);
  };

  const renderAddresses = ({item}: {item: {address: UserInfoAddr}}) => {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text="Street Name:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address?.street ?? 'Street Name'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text="City:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.city ?? 'City'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text="State / Province:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.state ?? 'State / Province'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text="Country:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.country ?? 'Country'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText text="Zip-code:" />
          <GapView length={5} mode="horizontal" />
          <MyText
            weight="500"
            textColor={colors.primary}
            text={item.address.zipCode ?? 'Zip-code'}
          />
        </View>
        <TouchableOpacity style={{position: 'absolute', right: 20, bottom: 10}}>
          <DeleteBtn />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MyView>
      <FlatList
        data={addrs}
        renderItem={renderAddresses}
        ItemSeparatorComponent={() => <GapView length={15} />}
      />
    </MyView>
  );
}
