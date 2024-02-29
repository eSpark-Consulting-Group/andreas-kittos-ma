import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';

import {BubbleIcon, MyView} from '../../components';
import {Close, WashingMachineLarge} from '../../assets';
import {D1ParamsList, RootStackParamsList} from '../../types/navigationParams';

type ProductViewNavigationProps = NativeStackScreenProps<
  D1ParamsList,
  'ProductImage'
>;

export default function ProductImage() {
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  const route = useRoute<ProductViewNavigationProps['route']>();

  const ProductImage = route?.params?.image;

  return (
    <MyView topPad={15} botPad={15} style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <BubbleIcon onPress={() => navigation.goBack()} children={<Close />} />
      </View>
      <View style={styles.content}>
        <Image
          source={ProductImage ? {uri: ProductImage} : WashingMachineLarge}
          style={{height: 300, width: 300}}
        />
      </View>
    </MyView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
