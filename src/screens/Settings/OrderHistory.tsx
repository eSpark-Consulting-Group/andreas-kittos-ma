import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageURISource,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {GapView, MyView, MySearchBar, MyText} from '../../components';
import {MyTheme, OrderStatus} from '../../types';

interface TabFilter {
  id: number;
  title: string;
  selected: boolean;
}

interface OrderItem {
  title: string;
  image: ImageURISource;
  orderNo: string;
  tax: number;
  total: number;
  qty: number;
  date: Date;
  status: OrderStatus;
}

const tabData: TabFilter[] = [
  {id: 1, title: 'All', selected: true},
  {id: 2, title: 'Pending', selected: false},
  {id: 3, title: 'Processing', selected: false},
  {id: 4, title: 'On-hold', selected: false},
  {id: 5, title: 'Completed', selected: false},
  {id: 6, title: 'Cancelled', selected: false},
  {id: 7, title: 'Refunded', selected: false},
  {id: 8, title: 'Failed', selected: false},
];

const dummyItems: OrderItem[] = [
  {
    title: 'Product A',
    image: {uri: 'https://picsum.photos/200/300'},
    orderNo: 'ORD123456',
    tax: 5.0,
    total: 50.0,
    qty: 2,
    date: new Date('2023-12-15'),
    status: 'Completed',
  },
  {
    title: 'Product B',
    image: {uri: 'https://picsum.photos/200/301'},
    orderNo: 'ORD789012',
    tax: 3.5,
    total: 40.0,
    qty: 1,
    date: new Date('2023-11-28'),
    status: 'Pending',
  },
  // Add 8 more dummy entries using picsum.photos API
  {
    title: 'Product C',
    image: {uri: 'https://picsum.photos/200/302'},
    orderNo: 'ORD345678',
    tax: 4.0,
    total: 30.0,
    qty: 3,
    date: new Date('2023-10-20'),
    status: 'Processing',
  },
  {
    title: 'Product D',
    image: {uri: 'https://picsum.photos/200/303'},
    orderNo: 'ORD901234',
    tax: 2.0,
    total: 20.0,
    qty: 4,
    date: new Date('2023-09-18'),
    status: 'Cancelled',
  },
  {
    title: 'Product E',
    image: {uri: 'https://picsum.photos/200/304'},
    orderNo: 'ORD567890',
    tax: 3.0,
    total: 60.0,
    qty: 1,
    date: new Date('2023-08-10'),
    status: 'On-hold',
  },
  {
    title: 'Product F',
    image: {uri: 'https://picsum.photos/200/305'},
    orderNo: 'ORD123890',
    tax: 5.5,
    total: 70.0,
    qty: 2,
    date: new Date('2023-07-05'),
    status: 'Refunded',
  },
  {
    title: 'Product G',
    image: {uri: 'https://picsum.photos/200/306'},
    orderNo: 'ORD456789',
    tax: 4.0,
    total: 25.0,
    qty: 5,
    date: new Date('2023-06-03'),
    status: 'Failed',
  },
  {
    title: 'Product H',
    image: {uri: 'https://picsum.photos/200/307'},
    orderNo: 'ORD987654',
    tax: 2.5,
    total: 35.0,
    qty: 3,
    date: new Date('2023-05-12'),
    status: 'Completed',
  },
  {
    title: 'Product I',
    image: {uri: 'https://picsum.photos/200/308'},
    orderNo: 'ORD234567',
    tax: 3.0,
    total: 45.0,
    qty: 2,
    date: new Date('2023-04-08'),
    status: 'Pending',
  },
  // Add 1 more entry to make a total of 10 if needed
];

export default function OrderHistory() {
  const theme = useTheme();
  const [tabFilter, setTabFilter] = useState(tabData);
  const tabDataMemo = useMemo(() => tabFilter, [tabFilter, setTabFilter]);

  const handleChange = (index: number) => {
    const temp = [...tabDataMemo];
    temp.map(item => (item.selected = false));
    temp[index].selected = true;
    setTabFilter(temp);
  };

  return (
    <MyView hPad={0} topPad={10} style={{flex: 1}}>
      <View style={[styles.top, {borderColor: theme.colors.border}]}>
        <MySearchBar
          placeholder="Search"
          style={{flex: 0, marginHorizontal: 20}}
        />
        <GapView />
        <FlatList
          data={tabDataMemo}
          horizontal
          renderItem={({item, index}) =>
            renderTabItem({item, index, theme, handleChange})
          }
        />
      </View>
      <FlatList
        data={dummyItems}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <GapView length={30} />}
        renderItem={({item, index}) => (
          <Item item={item} index={index} theme={theme} />
        )}
      />
    </MyView>
  );
}

const renderTabItem = ({
  item,
  index,
  theme,
  handleChange,
}: {
  item: TabFilter;
  index: number;
  theme: MyTheme;
  handleChange: (index: number) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => handleChange(index)}>
      <MyText
        text={item.title}
        style={{
          paddingHorizontal: 42,
          paddingVertical: 17,
        }}
      />
      {item.selected && (
        <View
          style={{
            width: '100%',
            height: 3,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const Item = ({
  item,
  index,
  theme,
}: {
  item: OrderItem;
  index: number;
  theme: MyTheme;
}) => {
  const handleColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return '#0040FF';
      case 'Cancelled':
        return '#FF0000';
      case 'Completed':
        return '#62C640';
      case 'Failed':
        return '#D02F44';
      case 'On-hold':
        return '#5C78D4';
      case 'Processing':
        return '#FFAF00';
      case 'Refunded':
        return '#FF8A00';
    }
  };

  return (
    <View style={styles.item_main}>
      <View
        style={{
          height: '100%',
          width: 107,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          borderRadius: 10,
          marginRight: 8,
        }}>
        <Image source={item.image} style={{height: 70, width: 70}} />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <MyText text={item.title} size={14} weight="600" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText text={'Order No: ' + item.orderNo.toString()} size={12} />
          <MyText text={'Tax: €' + item.tax} size={12} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText text={'Qty: ' + item.qty.toString()} size={12} />
          <MyText
            text={'Total: €' + item.total}
            size={12}
            textColor={theme.colors.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText text={item.date.toDateString()} size={10} />
          <MyText
            text={item.status}
            textColor={handleColor(item.status)}
            size={12}
            weight="500"
            style={{
              width: 100,
              textAlign: 'center',
              paddingVertical: 8,
              borderRadius: 50,
              backgroundColor: handleColor(item.status) + '22',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    borderBottomWidth: 1,
  },
  item_main: {
    height: 107,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
