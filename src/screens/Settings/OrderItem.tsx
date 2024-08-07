import React, {memo} from 'react';
import {ImageURISource, ScrollView, View} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyText, MyView} from '../../components';
import {
  OrderTick,
  Status_Deliver,
  Status_Pickup,
  Status_Schedule,
  Status_Wash,
} from '../../assets';
import {MyTheme, OrderDetail, OrderItem as OrderItemType} from '../../types';
import {BottomTabParamsList, D1ParamsList} from '../../types/navigationParams';

export interface ItemStatusType {
  icon?: React.ReactNode;
  label: string;
  done?: boolean;
  date?: Date;
  inProcess?: boolean;
}

type OrderNavigationProps = NativeStackScreenProps<
  BottomTabParamsList & D1ParamsList,
  'OrderItem'
>;

const OrderItem = () => {
  const theme = useTheme() as MyTheme;
  const route = useRoute<OrderNavigationProps['route']>();
  const {
    params: {orderItem},
  } = route;

  const statusData = [
    {
      label: orderItem?.orderStatus?.scheduled ? 'Scheduled' : 'Scheduling',
      icon: <Status_Schedule />,
      date: new Date(orderItem?.orderStatus?.scheduledDate),
      done: orderItem?.orderStatus?.scheduled,
    },
    {
      label:
        orderItem?.orderStatus?.scheduled && !orderItem?.orderStatus?.picked
          ? 'Picking up'
          : 'Picked Up',
      icon: <Status_Pickup />,
      date: new Date(orderItem?.orderStatus?.pickedDate),
      done: orderItem?.orderStatus?.picked,
      inProcess:
        orderItem?.orderStatus?.scheduled && !orderItem?.orderStatus?.picked,
    },
    {
      label: 'Washing',
      icon: <Status_Wash />,
      date: new Date(orderItem?.orderStatus?.washingDate),
      done: orderItem?.orderStatus?.washing,
      inProcess:
        orderItem?.orderStatus?.picked && !orderItem?.orderStatus?.washing,
    },
    {
      label: orderItem?.orderStatus?.delivered ? 'Delivered' : 'Delivery',
      icon: <Status_Deliver />,
      date: new Date(orderItem?.orderStatus?.deliveredDate),
      done: orderItem?.orderStatus?.delivered,
      inProcess:
        orderItem?.orderStatus?.washing && !orderItem?.orderStatus?.delivered,
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <MyView topPad={30}>
        <MyText
          text={'Order # ' + orderItem?.orderNumber}
          size={18}
          weight="600"
          style={{alignSelf: 'center'}}
        />
        <View style={{marginVertical: 30}}>
          <MyText text={'Status'} size={16} weight="500" />
          <GapView length={20} />
          <ItemStatus theme={theme} data={statusData} />
        </View>
        <View style={{marginTop: 18}}>
          <MyText text="Order Details" size={16} weight="500" />
          <OrderDetails theme={theme} data={orderItem?.orderDetail} />
        </View>
      </MyView>
      <CostBox theme={theme} data={orderItem} />
    </ScrollView>
  );
};

const OrderDetails = ({data, theme}: {data: OrderDetail[]; theme: MyTheme}) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      {data?.map((item, index) => (
        <View key={index}>
          <MyText
            text={item?.product?.categoryProduct[0]?.category?.name}
            size={14}
            weight="500"
            textColor={theme.colors.placeholder}
            style={{marginBottom: 4}}
          />
          <View key={index}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 17,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MyText
                  text={item?.quantity + 'x'}
                  size={12}
                  weight="600"
                  style={{marginRight: 10}}
                />
                <MyText text={item?.product?.name} />
              </View>
              <MyText text={'€ ' + item?.product?.price} />
            </View>
            {index < data.length - 1 && <GapView />}
          </View>
          <GapView />
        </View>
      ))}
    </View>
  );
};

const ItemStatus = ({
  data,
  theme,
}: {
  data: ItemStatusType[];
  theme: MyTheme;
}) => {
  return (
    <View style={{flex: 1}}>
      {data?.map((item, index) => (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {item.icon}
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  maxHeight: 40,
                  marginLeft: 20,
                }}>
                <MyText
                  text={
                    !item.done
                      ? 'Expected: ' + new Date().toDateString()
                      : item?.date?.toDateString()
                  }
                  weight="300"
                  size={12}
                />
                <GapView length={5} />
                <MyText text={item.label} weight="500" size={12} />
              </View>
              {item?.done ? (
                <>
                  <MyText
                    text="- - - - - - - - - -"
                    textColor={theme.colors.border}
                  />
                  <OrderTick />
                </>
              ) : null}
              {item.inProcess ? (
                <MyText
                  text="In process"
                  weight="500"
                  size={12}
                  textColor="#FFAF00"
                />
              ) : null}
            </View>
          </View>
          {index < data.length - 1 ? (
            <View
              style={{
                left: 40 / 2,
                width: 2,
                height: 30,
                backgroundColor: theme.colors.primary,
              }}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
};

const CostBox = ({data, theme}: {data: OrderItemType; theme: MyTheme}) => {
  return (
    <>
      <View style={{overflow: 'hidden'}}>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: theme.colors.border,
            margin: -2,
            marginTop: 10,
          }}>
          <View style={{height: 1, width: 200}} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <MyText text="Subtotal" size={14} weight="500" />
          <MyText text={'€ ' + data?.subTotal} size={14} weight="500" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <MyText text="Delivery" size={14} weight="500" />
          <MyText text={'€ ' + data?.deliveryCharges} size={14} weight="500" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MyText text="Total" size={16} weight="500" />
          <MyText
            text={'€ ' + data?.total}
            size={16}
            weight="500"
            textColor={theme.colors.primary}
          />
        </View>
      </View>
    </>
  );
};

export default memo(OrderItem);
