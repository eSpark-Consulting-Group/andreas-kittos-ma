import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {MyText} from '../../components';

export default function Cart() {
  return (
    <View>
      <MyHeader />
      <Text>Cart</Text>
    </View>
  );
}

const MyHeader = () => {
  return (
    <View
      style={{
        height: 60,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E4E4E4',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          <Ionicons name="arrow-back" color={'#49ace1'} size={15} />
        </View>
        <MyText style={{marginLeft: 20}} size={16} weight="400">
          My Cart
        </MyText>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({});
