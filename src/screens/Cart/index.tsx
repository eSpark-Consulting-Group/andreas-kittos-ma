import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
          <Text style={{color: '#49ACE1'}}>{'<'}</Text>
        </View>
        <Text style={{fontWeight: '400', fontSize: 16, marginLeft: 20}}>
          My Cart
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#49ACE1',
          borderRadius: 40,
          paddingHorizontal: 20,
          paddingVertical: 11,
        }}>
        <Text style={{fontWeight: '500', fontSize: 14, color: '#fff'}}>
          Checkout {'>'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
