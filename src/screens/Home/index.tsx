import React from 'react';
import {View, ScrollView} from 'react-native';

import {GapView, MyBanner, MyCatalog} from '../../components';
import {
  Bed,
  Cardigan,
  Dress,
  Duvet,
  Handkerchief,
  Hat,
  HomeBanner_1,
  HomeBanner_2,
  HomeBanner_3,
  Iron,
  LeatherG,
  Mat,
  Scarf,
  Shorts,
  Suit,
  TShirt,
  Table,
  TextileG,
  TowelBig,
  TowelMid,
  WashingMachine,
} from '../../assets';

export default function Home() {
  const laundryCatalog = [
    {name: 'Laundry Wash and Fold', image: WashingMachine, price: '€9.00'},
    {name: 'Bath Mat - Wash & Iron', image: Mat, price: '€6.00'},
    {name: 'Big Size Towel - Cleaning', image: TowelBig, price: '€4.00'},
    {name: 'Feather Duvet King', image: Duvet, price: '€26.00'},
    {name: 'Medium Size Towel - Cleaning', image: TowelMid, price: '€3.00'},
    {name: 'Table Cloth - Cleaning', image: Table, price: '€8.00'},
  ];
  const ironingCatalog = [
    {name: '2 Piece Suit - Iron', image: Suit, price: '€7.00'},
    {name: 'Blouse/Top/Shirt/Silk T-shirt', image: TShirt, price: '€6.50'},
    {name: 'Cardigan – Iron', image: Cardigan, price: '€3.00'},
    {name: 'Double Bed Sheet – Iron', image: Bed, price: '€4.00'},
    {name: 'Dress / Overalls – Iron', image: Dress, price: '€6.00'},
    {name: 'Ironing 5 Kilos', image: Iron, price: '€20.00'},
  ];
  const dryCleanCatalog = [
    {name: 'Gloves leather / suede', image: LeatherG, price: '€15.00'},
    {name: 'Gloves textile', image: TextileG, price: '€6.00'},
    {name: 'Handkerchief -Dry Cleaning', image: Handkerchief, price: '€3.00'},
    {name: 'Headwears', image: Hat, price: '€12.00'},
    {name: 'Neckerchief / Scarf – Dry Cleaning', image: Scarf, price: '€6.50'},
    {name: 'Swimsuit', image: Shorts, price: '€10.00'},
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <GapView length={15} />
        <View style={{paddingHorizontal: 20}}>
          <MyBanner
            background={HomeBanner_1}
            title1="Convenience at Your Doorstep!"
            title2="Laundry Delivery Services"
          />
        </View>
        <GapView length={20} />
        <MyCatalog catalogName={'Laundry'} catalogItems={laundryCatalog} />
        <GapView length={20} />
        <View style={{paddingHorizontal: 20}}>
          <MyBanner
            background={HomeBanner_2}
            title1="Fresh, Clean and Delivered!"
            title2="Laundry Delivery Services"
          />
        </View>
        <GapView length={20} />
        <MyCatalog catalogName={'Ironing'} catalogItems={ironingCatalog} />
        <GapView length={20} />
        <View style={{paddingHorizontal: 20}}>
          <MyBanner
            background={HomeBanner_3}
            title1="Fresh, Clean and Delivered!"
            title2="Laundry Delivery Services"
          />
        </View>
        <GapView length={20} />
        <MyCatalog
          catalogName={'Dry Cleaning'}
          catalogItems={dryCleanCatalog}
        />
        <GapView length={2} />
      </ScrollView>
    </View>
  );
}
