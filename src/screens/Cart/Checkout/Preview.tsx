import React from 'react';
import {View, Text} from 'react-native';
import {MyText} from '../../../components';
import {CheckoutFooter} from '.';

export default function Preview({setIndex}: {setIndex: (num: number) => void}) {
  return (
    <>
      <MyText>Preview</MyText>
      <CheckoutFooter
        priButtonLabel="Continue to Payment"
        secButtonLabel="Go back"
        priButtonPress={() => setIndex(3)}
        secButtonPress={() => setIndex(1)}
      />
    </>
  );
}
