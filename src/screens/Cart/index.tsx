import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {MyHeader, MyText} from '../../components';
import {Dots} from '../../assets';

export default function Cart() {
  return (
    <View>
      <MyHeader
        center="logo"
        lefticon="back"
        right={
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <Dots />
          </View>
        }
      />
      <Text>Cart</Text>
    </View>
  );
}

const Button = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#49ACE1',
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 11,
      }}>
      <MyText style={{color: '#fff'}} size={14} weight="500">
        Checkout
      </MyText>
      <Feather
        name="chevron-right"
        size={14}
        color={'#fff'}
        style={{textAlignVertical: 'center', marginLeft: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
