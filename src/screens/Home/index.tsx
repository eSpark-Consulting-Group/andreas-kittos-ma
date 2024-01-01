import React from 'react';
import {View} from 'react-native';

import {GapView, MyBanner} from '../../components';
import {HomeBanner_1, HomeBanner_2, HomeBanner_3} from '../../assets';

export default function Home() {
  return (
    <View>
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <MyBanner
          background={HomeBanner_1}
          title1="Convenience at Your Doorstep!"
          title2="Laundry Delivery Services"
        />
        <GapView length={20} />
        <MyBanner
          background={HomeBanner_2}
          title1="Fresh, Clean and Delivered!"
          title2="Laundry Delivery Services"
        />
        <GapView length={20} />
        <MyBanner
          background={HomeBanner_3}
          title1="Fresh, Clean and Delivered!"
          title2="Laundry Delivery Services"
        />
      </View>
    </View>
  );
}
