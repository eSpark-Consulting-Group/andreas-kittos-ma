import React from 'react';
import {View} from 'react-native';

import {CheckoutFooter} from '.';
import {MyText} from '../../../components';

export default function Shipping({
  setIndex,
}: {
  setIndex: (num: number) => void;
}) {
  return (
    <>
      <MyText>Shipping</MyText>
      <CheckoutFooter
        priButtonLabel="Continue to preview"
        secButtonLabel="Go back"
        priButtonPress={() => setIndex(2)}
        secButtonPress={() => setIndex(0)}
      />
    </>
  );
}
