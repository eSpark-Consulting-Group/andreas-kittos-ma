import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage, {Source} from 'react-native-fast-image';

import {
  GapView,
  MyView,
  MySearchBar,
  MyText,
  OverlayLoader,
} from '../../components';
import {MyTheme, OrderStatus} from '../../types';
import {OrderTick} from '../../assets';
import {WINDOW_WIDTH, historyItems} from '../../constants';
import {BottomTabParamsList, D1ParamsList} from '../../types/navigationParams';
import {GetOrderList, GetOrderStatus} from './utils';
import moment from 'moment';

type OrderNavigationProps = NativeStackScreenProps<
  BottomTabParamsList & D1ParamsList,
  'OrderHistory'
>;

interface TabFilter {
  id: number;
  title: 'All' | string;
  selected: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  orderStatus: ItemStatus;
  total: string;
  subTotal: string;
  shippingType: 'normal' | 'express';
  deliveryCharges: string;
  note: string;
  deliveryDate: Date;
  orderState: string;
  orderDetail: OrderDetail[];
  payment: Payment;
  user: User;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
}
interface Payment {
  paymentType: 'COD' | 'CARD';
  paymentStatus: 'success' | 'failed' | 'pending';
  transactionId?: string | null;
}

interface ItemStatus {
  icon?: React.ReactNode;
  scheduled: boolean;
  scheduledDate: Date;
  picked: boolean;
  pickedDate: Date;
  washing: boolean;
  washingDate: Date;
  delivered: boolean;
  deliveredDate: Date;
  label: string;
  done?: boolean;
  date?: Date;
}

interface OrderDetail {
  id: string;
  quantity: number;
  product: Product;
}

interface Product {
  id: string;
  name: string;
  price: string;
  productImage?: string;
  category: Category[];
}

interface Category {
  id: string;
  category: {id: string; name: string};
}

interface OrderListParams {
  page?: string;
  take?: string;
  orderState?: string;
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

// const dummyItems: OrderItem[] = [
//   {
//     title: 'Product A',
//     image: {uri: 'https://picsum.photos/200/300'},
//     orderNo: 'ORD123456',
//     tax: 5.0,
//     total: 50.0,
//     qty: 2,
//     date: new Date('2023-12-15'),
//     status: 'Completed',
//   },
//   {
//     title: 'Product B',
//     image: {uri: 'https://picsum.photos/200/301'},
//     orderNo: 'ORD789012',
//     tax: 3.5,
//     total: 40.0,
//     qty: 1,
//     date: new Date('2023-11-28'),
//     status: 'Pending',
//   },
//   // Add 8 more dummy entries using picsum.photos API
//   {
//     title: 'Product C',
//     image: {uri: 'https://picsum.photos/200/302'},
//     orderNo: 'ORD345678',
//     tax: 4.0,
//     total: 30.0,
//     qty: 3,
//     date: new Date('2023-10-20'),
//     status: 'Processing',
//   },
//   {
//     title: 'Product D',
//     image: {uri: 'https://picsum.photos/200/303'},
//     orderNo: 'ORD901234',
//     tax: 2.0,
//     total: 20.0,
//     qty: 4,
//     date: new Date('2023-09-18'),
//     status: 'Cancelled',
//   },
//   {
//     title: 'Product E',
//     image: {uri: 'https://picsum.photos/200/304'},
//     orderNo: 'ORD567890',
//     tax: 3.0,
//     total: 60.0,
//     qty: 1,
//     date: new Date('2023-08-10'),
//     status: 'On-hold',
//   },
//   {
//     title: 'Product F',
//     image: {uri: 'https://picsum.photos/200/305'},
//     orderNo: 'ORD123890',
//     tax: 5.5,
//     total: 70.0,
//     qty: 2,
//     date: new Date('2023-07-05'),
//     status: 'Refunded',
//   },
//   {
//     title: 'Product G',
//     image: {uri: 'https://picsum.photos/200/306'},
//     orderNo: 'ORD456789',
//     tax: 4.0,
//     total: 25.0,
//     qty: 5,
//     date: new Date('2023-06-03'),
//     status: 'Failed',
//   },
//   {
//     title: 'Product H',
//     image: {uri: 'https://picsum.photos/200/307'},
//     orderNo: 'ORD987654',
//     tax: 2.5,
//     total: 35.0,
//     qty: 3,
//     date: new Date('2023-05-12'),
//     status: 'Completed',
//   },
//   {
//     title: 'Product I',
//     image: {uri: 'https://picsum.photos/200/308'},
//     orderNo: 'ORD234567',
//     tax: 3.0,
//     total: 45.0,
//     qty: 2,
//     date: new Date('2023-04-08'),
//     status: 'Pending',
//   },
//   // Add 1 more entry to make a total of 10 if needed
// ];

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
          <MyText text={'Tax: €' + '0.00'} size={12} />
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
            text={moment(item?.deliveryDate).format('DD MMM, YYYY')}
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

// const ItemStatus = ({data, theme}: {data: ItemStatus; theme: MyTheme}) => {
//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         {data.icon}
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           <View
//             style={{
//               maxHeight: 40,
//               marginLeft: 20,
//             }}>
//             <MyText text={data?.date?.toDateString()} weight="300" size={12} />
//             <GapView length={5} />
//             <MyText text={data.label} weight="500" size={12} />
//           </View>
//           {data.done ? (
//             <>
//               <MyText
//                 text="- - - - - - - - - -"
//                 textColor={theme.colors.border}
//               />
//               <OrderTick />
//             </>
//           ) : (
//             <MyText
//               text="In process"
//               weight="500"
//               size={12}
//               textColor="#FFAF00"
//             />
//           )}
//         </View>
//       </View>
//       {data.type !== 'Deliver' && (
//         <View
//           style={{
//             left: 40 / 2,
//             width: 2,
//             height: 30,
//             backgroundColor: theme.colors.primary,
//           }}
//         />
//       )}
//     </View>
//   );
// };

// const CostBox = ({theme}: {theme: MyTheme}) => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         width: WINDOW_WIDTH,
//         paddingVertical: 20,
//         paddingHorizontal: 20,
//         borderTopWidth: 1,
//         borderColor: theme.colors.border,
//         borderStyle: 'dashed',
//       }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginBottom: 10,
//         }}>
//         <MyText text="Subtotal" size={14} weight="500" />
//         <MyText text="€ 113.00" size={14} weight="500" />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginBottom: 10,
//         }}>
//         <MyText text="Delivery" size={14} weight="500" />
//         <MyText text="€ 25.00" size={14} weight="500" />
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <MyText text="Total" size={16} weight="500" />
//         <MyText
//           text="€ 138.00"
//           size={16}
//           weight="500"
//           textColor={theme.colors.primary}
//         />
//       </View>
//     </View>
//   );
// };

// const OrderDetails = ({
//   data,
//   theme,
// }: {
//   data: OrderDetails[];
//   theme: MyTheme;
// }) => {
//   return (
//     <View style={{marginTop: 10, marginBottom: 20}}>
//       {data.map((item, index) => (
//         <View key={index}>
//           <MyText
//             text={item.title}
//             size={14}
//             weight="500"
//             style={{marginBottom: 4, opacity: 0.5}}
//           />
//           {item.product.map((item2, index) => (
//             <View key={index}>
//               <View
//                 style={{
//                   paddingHorizontal: 5,
//                   paddingVertical: 17,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   borderBottomWidth: 1,
//                   borderColor: theme.colors.border,
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}>
//                   <MyText
//                     text={item2.qty + 'x'}
//                     size={12}
//                     weight="600"
//                     style={{marginRight: 10}}
//                   />
//                   <MyText text={item2.label} />
//                 </View>
//                 <MyText text={'€ ' + item2.price} />
//               </View>
//               {index < item.product.length - 1 && <GapView />}
//             </View>
//           ))}
//           <GapView />
//         </View>
//       ))}
//     </View>
//   );
// };

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
