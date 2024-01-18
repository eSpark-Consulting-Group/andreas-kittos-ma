import {ImageURISource, ScrollView, View} from 'react-native';
import {GapView, MyText, MyView} from '../../components';
import {memo} from 'react';
import {
  OrderTick,
  Status_Deliver,
  Status_Pickup,
  Status_Schedule,
  Status_Wash,
} from '../../assets';
import {WINDOW_WIDTH} from '../../constants';
import {MyTheme, OrderStatus} from '../../types';
import {useTheme} from '@react-navigation/native';

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

interface ItemStatus {
  icon?: React.ReactNode;
  type: 'Schedule' | 'Pickup' | 'Wash' | 'Deliver';
  label: string;
  done?: boolean;
  date?: Date;
}

interface OrderDetails {
  title: string;
  product: Product[];
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

interface ItemStatus {
  icon?: React.ReactNode;
  type: 'Schedule' | 'Pickup' | 'Wash' | 'Deliver';
  label: string;
  done?: boolean;
  date?: Date;
}

interface OrderDetails {
  title: string;
  product: Product[];
}

interface Product {
  label: string;
  qty: number;
  price: number;
}

const OrderItem = () => {
  const theme = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <MyView topPad={30}>
        <MyText
          text="Order # 123456"
          size={18}
          weight="600"
          style={{alignSelf: 'center'}}
        />
        <View style={{marginVertical: 30}}>
          <MyText text={'Status'} size={16} weight="500" />
          <GapView length={20} />
          <ItemStatus
            theme={theme}
            data={{
              label: 'Scheduled',
              type: 'Schedule',
              icon: <Status_Schedule />,
              date: new Date('2023-12-15'),
              done: true,
            }}
          />
          <ItemStatus
            theme={theme}
            data={{
              label: 'Picked up',
              type: 'Pickup',
              icon: <Status_Pickup />,
              date: new Date('2023-12-15'),
              done: true,
            }}
          />
          <ItemStatus
            theme={theme}
            data={{
              label: 'Washing',
              type: 'Wash',
              icon: <Status_Wash />,
              date: new Date('2023-12-15'),
              done: true,
            }}
          />
          <ItemStatus
            theme={theme}
            data={{
              label: 'Delivered',
              type: 'Deliver',
              icon: <Status_Deliver />,
              date: new Date('2023-12-15'),
              done: true,
            }}
          />
        </View>
        <View style={{marginTop: 18}}>
          <MyText text="Order Details" size={16} weight="500" />
          <OrderDetails
            theme={theme}
            data={[
              {
                title: 'Laundry',
                product: [
                  {
                    label: '5 Kg - Laundry - Dry - Ironing',
                    price: 99.0,
                    qty: 1,
                  },
                ],
              },
              {
                title: 'Ironing',
                product: [
                  {label: 'Double Bed Sheet - Iron', price: 8.0, qty: 2},
                ],
              },
              {
                title: 'Dry Cleaning',
                product: [
                  {label: 'Jeans - Dry Cleaning', price: 7.0, qty: 1},
                  {label: 'Trousers-Dry Cleaning', price: 8.0, qty: 1},
                ],
              },
            ]}
          />
        </View>
      </MyView>
      <CostBox theme={theme} />
    </ScrollView>
  );
};

const OrderDetails = ({
  data,
  theme,
}: {
  data: OrderDetails[];
  theme: MyTheme;
}) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      {data.map((item, index) => (
        <View key={index}>
          <MyText
            text={item.title}
            size={14}
            weight="500"
            style={{marginBottom: 4, opacity: 0.5}}
          />
          {item.product.map((item2, index) => (
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
                    text={item2.qty + 'x'}
                    size={12}
                    weight="600"
                    style={{marginRight: 10}}
                  />
                  <MyText text={item2.label} />
                </View>
                <MyText text={'€ ' + item2.price} />
              </View>
              {index < item.product.length - 1 && <GapView />}
            </View>
          ))}
          <GapView />
        </View>
      ))}
    </View>
  );
};

const ItemStatus = ({data, theme}: {data: ItemStatus; theme: MyTheme}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {data.icon}
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
            <MyText text={data?.date?.toDateString()} weight="300" size={12} />
            <GapView length={5} />
            <MyText text={data.label} weight="500" size={12} />
          </View>
          {data.done ? (
            <>
              <MyText
                text="- - - - - - - - - -"
                textColor={theme.colors.border}
              />
              <OrderTick />
            </>
          ) : (
            <MyText
              text="In process"
              weight="500"
              size={12}
              textColor="#FFAF00"
            />
          )}
        </View>
      </View>
      {data.type !== 'Deliver' && (
        <View
          style={{
            left: 40 / 2,
            width: 2,
            height: 30,
            backgroundColor: theme.colors.primary,
          }}
        />
      )}
    </View>
  );
};

const CostBox = ({theme}: {theme: MyTheme}) => {
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
          <MyText text="€ 113.00" size={14} weight="500" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <MyText text="Delivery" size={14} weight="500" />
          <MyText text="€ 25.00" size={14} weight="500" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MyText text="Total" size={16} weight="500" />
          <MyText
            text="€ 138.00"
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
