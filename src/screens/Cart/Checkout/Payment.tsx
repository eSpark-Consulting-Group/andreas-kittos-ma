import React from 'react';
import {View, Text} from 'react-native';
import {MyText} from '../../../components';
import {CheckoutFooter} from '.';

export default function Payment({setIndex}: {setIndex: (num: number) => void}) {
  return (
    <>
      <MyText>Payment</MyText>
      <CheckoutFooter
        priButtonLabel="Place my order"
        secButtonLabel="Go back"
        priButtonPress={() => setIndex(3)}
        secButtonPress={() => setIndex(2)}
      />
    </>
  );
}
