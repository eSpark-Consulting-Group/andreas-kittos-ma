import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {GapView, MyCatalog, MyInput, MyPopup, MyText} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {
  Leaves,
  Minus,
  SearchCart,
  TickCoupon,
  WashingMachine,
} from '../../assets';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

const laundryCatalog = [
  {
    name: 'Laundry Wash and Fold',
    image: WashingMachine,
    price: '€9.00',
    fav: true,
  },
  {
    name: 'Bath Mat - Wash & Iron',
    image: WashingMachine,
    price: '€6.00',
    fav: true,
  },
  {
    name: 'Big Size Towel - Cleaning',
    image: WashingMachine,
    price: '€4.00',
    fav: true,
  },
  {
    name: 'Feather Duvet King',
    image: WashingMachine,
    price: '€26.00',
    fav: true,
  },
  {
    name: 'Medium Size Towel - Cleaning',
    image: WashingMachine,
    price: '€3.00',
    fav: true,
  },
  {
    name: 'Table Cloth - Cleaning',
    image: WashingMachine,
    price: '€8.00',
    fav: true,
  },
];
const wishlist = true;

export default function Cart() {
  const theme = useTheme();
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const [visible, setVisible] = useState(false);
  const [clear, setClear] = useState(false);
  return (
    <>
      {!clear ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartHeader theme={theme} onClear={() => setVisible(true)} />
          <FlatList
            data={['a']}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <CartItems theme={theme} onItemRemove={() => setVisible(true)} />
            )}
          />
          <CouponContainer theme={theme} />
          <CostBox theme={theme} />
          <MyPopup
            title="Clear Cart"
            message1="Are you sure you want to clear your cart?"
            buttons={[
              {
                id: 1,
                label: 'Keep',
                backgroundColor: 'transparent',
                textColor: theme.colors.primary,
                onPress: () => setVisible(false),
              },
              {
                id: 2,
                label: 'Clear',
                backgroundColor: 'transparent',
                textColor: '#FD0D1B',
                onPress: () => {
                  setClear(true);
                  setVisible(false);
                },
              },
            ]}
            visible={visible}
          />
          {wishlist && (
            <View style={{marginTop: 30, marginBottom: 10}}>
              <MyCatalog
                catalogName="My wishlist"
                catalogItems={laundryCatalog}
                onSeeAllPress={() =>
                  navigation.navigate('D1Nav', {screen: 'WishList'})
                }
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Leaves />
            <GapView length={20} />
            <MyText
              text="Looks like you haven’t added any items to the bag yet. Start shopping to fill it in."
              style={{textAlign: 'center'}}
            />
          </View>
        </View>
      )}
    </>
  );
}

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

const CouponContainer = ({theme}: {theme: Theme}) => {
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 50,
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{flex: 0.9}}
        // onPress={() => {
        //   navigation.navigate('D1Nav', {screen: 'CouponList'});
        // }}
      >
        <MyInput
          leftchild={<SearchCart color={theme.colors.primary} />}
          placeholder="Coupon code"
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.card,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <TickCoupon />
        <MyText
          text="Apply"
          textColor={theme.colors.primary}
          style={{marginLeft: 8}}
        />
      </View>
    </View>
  );
};

const CostBox = ({theme}: {theme: Theme}) => {
  return (
    <View style={{paddingHorizontal: 20, marginBottom: 10}}>
      <View
        style={{
          backgroundColor: theme.colors.card,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyText text="Products" weight="400" size={12} />
          <MyText text="x8" weight="400" size={12} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <MyText text="Total:" weight="500" size={16} />
          <MyText text="$72.00" weight="500" size={16} />
        </View>
      </View>
    </View>
  );
};

const CartItems = ({
  theme,
  onItemRemove,
}: {
  theme: Theme;
  onItemRemove: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity onPress={onItemRemove}>
        <Minus />
      </TouchableOpacity>
      <Image source={WashingMachine} style={{width: 70, height: 70}} />
      <View>
        <MyText text={'Laundry - Dry - Ironing (per kilo)'} />
        <MyText text={'$9.00'} style={{marginVertical: 10}} />
        <Counter theme={theme} />
      </View>
    </View>
  );
};

const Counter = ({theme}: {theme: Theme}) => {
  const [count, setCount] = useState(1);
  const updateCount = (val: number) => {
    if (count + val == 0) {
      return;
    }
    setCount(count + val);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => updateCount(-1)}
        activeOpacity={0.6}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          width: 30,
          height: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="minus" color={theme.colors.text} />
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          height: 30,
          width: 100,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 10,
        }}>
        <MyText text={count.toString()} textColor={theme.colors.text} />
      </View>
      <TouchableOpacity
        onPress={() => updateCount(1)}
        activeOpacity={0.6}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          width: 30,
          height: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="plus" color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const CartHeader = ({theme, onClear}: {theme: Theme; onClear: () => void}) => {
  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingVertical: 17,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MyText
          text="TOTAL"
          size={14}
          weight="600"
          textColor={theme.colors.text}
        />
        <MyText
          text="8 items"
          size={12}
          weight="400"
          textColor={theme.colors.text}
          style={{marginLeft: 10}}
        />
      </View>
      <TouchableOpacity onPress={onClear}>
        <MyText text="CLEAR CART" size={12} weight="400" textColor="#E54252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = ({theme}: {theme: Theme}) => StyleSheet.create({});
