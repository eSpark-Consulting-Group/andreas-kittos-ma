import React, {memo, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {
  GapView,
  MyView,
  MySearchBar,
  MyText,
  OverlayLoader,
} from '../../components';
import {MyTheme, OrderItem, OrderListParams} from '../../types';
import {BottomTabParamsList, D1ParamsList} from '../../types/navigationParams';
import {GetOrderList, GetOrderStatus} from './utils';

type OrderNavigationProps = NativeStackScreenProps<
  BottomTabParamsList & D1ParamsList,
  'OrderHistory'
>;

interface TabFilter {
  id: number;
  title: 'All' | string;
  selected: boolean;
}

function OrderHistory() {
  const theme = useTheme() as MyTheme;
  return <OrderList theme={theme} />;
}

export default memo(OrderHistory);

const OrderList = ({theme}: {theme: MyTheme}) => {
  const [loading, setLoading] = useState(false);
  const [tabFilter, setTabFilter] = useState<TabFilter[]>([]);
  const [tabItems, setTabItems] = useState<OrderItem[]>([]);
  const tabDataMemo = useMemo(() => tabFilter, [tabFilter, setTabFilter]);
  const [page, setPage] = useState<number>(0);

  const handleGetOrdersStatus = async () => {
    const resStatus = await GetOrderStatus();
    const data = resStatus?.data?.map((item, index) => ({
      id: index + 1, // Start IDs from 1 (assuming 0 for All)
      title: item,
      selected: false,
    }));
    console.log('xxxx', ...(data as []));
    if (resStatus.status) {
      setTabFilter([
        {
          id: 0,
          title: 'All',
          selected: true,
        },
        ...(data as []),
      ]);
    }
  };

  const handleGetOrdersList = async (params?: OrderListParams) => {
    const resStatus = await GetOrderList(params);
    if (resStatus.status) {
      setTabItems(resStatus?.data?.items as any[]);
    }
    console.log(
      '🚀 ~ handleGetOrdersList ~ resStatus?.data?.items:',
      resStatus?.data?.items,
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleGetOrdersStatus();
    handleGetOrdersList();
  }, []);

  const handleChangeTab = (index: number) => {
    const temp = [...tabDataMemo];
    temp.map(item => (item.selected = false));
    temp[index].selected = true;
    handleChangeTabItems(temp[index].title);
    setTabFilter(temp);
  };

  const handleChangeTabItems = (status: 'All' | string) => {
    setLoading(true);
    if (status == 'All') {
      handleGetOrdersList();
    } else {
      handleGetOrdersList({orderState: status});
      console.log('chala ha ye', status);
    }
  };

  return (
    <MyView hPad={0} topPad={10} style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <View style={[styles.top, {borderColor: theme.colors.border}]}>
        <MySearchBar
          placeholder="Search"
          style={{flex: 0, marginHorizontal: 20}}
        />
        <GapView />
        <FlatList
          data={tabDataMemo}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item, index}) =>
            renderTabItem({item, index, theme, handleChangeTab})
          }
        />
      </View>
      <FlatList
        data={tabItems}
        style={{flex: 1}}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setPage(1);
              handleGetOrdersList({
                orderState:
                  tabFilter?.find(item => item.selected == true)?.title == 'All'
                    ? undefined
                    : tabFilter?.find(item => item.selected == true)?.title,
                page: '1',
              });
            }}
          />
        }
        onEndReached={() => {
          if (tabItems.length > 10) {
            handleGetOrdersList({
              orderState:
                tabFilter?.find(item => item.selected == true)?.title == 'All'
                  ? undefined
                  : tabFilter?.find(item => item.selected == true)?.title,
              page: (page + 1).toString(),
            });
            setPage(state => state + 1);
          }
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <GapView length={30} />}
        ListEmptyComponent={() => (
          <MyText
            size={16}
            style={{
              flex: 0.7,
              alignSelf: 'center',
              textAlignVertical: 'center',
            }}
            text="No Orders!"
          />
        )}
        renderItem={({item, index}) => (
          <Item item={item} index={index} theme={theme} />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              height: loading ? 20 : 10,
              display: tabItems.length > 10 ? 'flex' : 'none',
            }}>
            <ActivityIndicator
              size={'large'}
              color={theme.colors.primary}
              style={{
                height: '100%',
                display: loading ? 'flex' : 'none',
              }}
            />
          </View>
        )}
      />
    </MyView>
  );
};

const renderTabItem = ({
  item,
  index,
  theme,
  handleChangeTab,
}: {
  item: TabFilter;
  index: number;
  theme: MyTheme;
  handleChangeTab: (index: number) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => handleChangeTab(index)}>
      <MyText
        text={item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1)}
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
  const handleColor = (status: string) => {
    switch (status?.charAt(0).toUpperCase() + status?.slice(1)) {
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
      default:
        return '#000000';
    }
  };

  const navigation = useNavigation<OrderNavigationProps['navigation']>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.item_main}
      onPress={() => navigation.navigate('OrderItem', {orderItem: item})}>
      <View
        style={{
          height: '100%',
          width: 107,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.card,
          borderRadius: 10,
          marginRight: 8,
        }}>
        <FastImage
          source={{uri: item?.orderDetail[0]?.product?.productImage}}
          style={{height: 70, width: 70}}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <MyText
          text={item?.orderDetail[0]?.product?.name}
          size={14}
          weight="600"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText text={'Order No: ' + item.orderNumber} size={12} />
          <MyText text={'Tax: €' + 'N/A'} size={12} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyText text={'Qty: ' + item?.orderDetail[0]?.quantity} size={12} />
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
          <MyText
            text={moment(item?.orderStatus?.scheduledDate).format(
              'DD MMM, YY HH:MM',
            )}
            size={10}
          />
          <View
            style={{
              width: 100,
              paddingVertical: 8,
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: handleColor(item?.orderState) + '22',
            }}>
            <MyText
              text={item?.orderState}
              textColor={handleColor(item?.orderState)}
              size={12}
              weight="500"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
