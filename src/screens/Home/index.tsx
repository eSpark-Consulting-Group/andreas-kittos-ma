import React from 'react';
import {View, ScrollView, FlatList} from 'react-native';

import {GapView, MyBanner, MyCatalog} from '../../components';
import {HomeBanner_1, HomeBanner_2, HomeBanner_3} from '../../assets';
import {dryCleanCatalog, ironingCatalog, laundryCatalog} from '../../constants';

export default function Home() {
  const homeData = [
    {
      bannerTitle1: 'Convenience at Your Doorstep!',
      bannerTitle2: 'Laundry Delivery Services',
      bannerBackground: HomeBanner_1,
      catalogName: 'Laundry',
      catalogItems: laundryCatalog,
    },
    {
      bannerTitle1: 'Fresh, Clean and Delivered!',
      bannerTitle2: 'Laundry Delivery Services',
      bannerBackground: HomeBanner_2,
      catalogName: 'Ironing',
      catalogItems: ironingCatalog,
    },
    {
      bannerTitle1: 'Convenience at Your Doorstep!',
      bannerTitle2: 'Laundry Delivery Services',
      bannerBackground: HomeBanner_3,
      catalogName: 'Dry Cleaning',
      catalogItems: dryCleanCatalog,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={homeData}
        ListHeaderComponent={<GapView length={15} />}
        ListFooterComponent={<GapView length={2} />}
        ItemSeparatorComponent={() => <GapView length={20} />}
        renderItem={({item}) => (
          <>
            <View style={{paddingHorizontal: 20}}>
              <MyBanner
                background={item.bannerBackground}
                title1={item.bannerTitle1}
                title2={item.bannerTitle2}
              />
            </View>
            <GapView length={20} />
            <MyCatalog
              catalogName={item.catalogName}
              catalogItems={item.catalogItems}
            />
          </>
        )}
      />
    </View>
  );
}
