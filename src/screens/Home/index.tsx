import React from 'react';
import {View} from 'react-native';

import {MyBanner} from '../../components';
import {HomeBanner_1, HomeBanner_2, HomeBanner_3} from '../../assets';

export default function Home() {
  return (
    <View>
      <MyBanner
        background={HomeBanner_1}
        title1="Convenience at Your Doorstep!"
        title2="Laundry Delivery Services"
      />
      <MyBanner
        background={HomeBanner_2}
        title1="Fresh, Clean and Delivered!"
        title2="Laundry Delivery Services"
      />
      <MyBanner
        background={HomeBanner_3}
        title1="Fresh, Clean and Delivered!"
        title2="Laundry Delivery Services"
      />
      {/* <MyBanner background={CatBanner_1} title1="Laundry" touchable />
      <MyBanner background={CatBanner_2} title1="Ironing" />
      <MyBanner background={CatBanner_3} title1="Dry Cleaning" /> */}
    </View>
  );
}
