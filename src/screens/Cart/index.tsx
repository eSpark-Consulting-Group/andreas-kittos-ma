import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Theme,
  useIsFocused,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  GapView,
  MyCatalog,
  MyInput,
  MyPopup,
  MyText,
  OverlayLoader,
} from '../../components';
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
import {catalogItemProps} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites} from '../../features/product/productSlice';
import {
  getWishlistIds,
  handleGetFavourites,
  toggleFavourite,
} from '../../utils';
import FastImage from 'react-native-fast-image';
import {getCartData, handleClearCart, handleRemoveCartItem} from './utils';
import {handleUpdateCartItem} from '../Category/utils';
import Toast from 'react-native-toast-message';
import {
  setCheckoutNote,
  setShipAddress,
  setShipAddressId,
} from '../../features/checkout/checkoutSlice';

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

export default function Cart() {
  const theme = useTheme();
  const timerRef = useRef<NodeJS.Timeout>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const Wishlist = useSelector((store: any) => store.product.favorites);
  const cartItems: {
    id: string;
    quantity: number;
    product: catalogItemProps;
  }[] = useSelector((store: any) => store.cart.cartItems);
  const cartId: string = useSelector((store: any) => store.cart.cartId);
  const cartTotal: number = useSelector((store: any) => store.cart.cartTotal);
  const navigation = useNavigation<CartNavigationProps['navigation']>();

  const [visible, setVisible] = useState(false);
  const [resetC, setResetC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useState<
    {
      id: string;
      product: catalogItemProps;
    }[]
  >([]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getFavouriteData();
      getCartData();
    }
  }, [isFocused]);

  const getFavouriteData = async () => {
    const res: {status: boolean; data?: []} = await handleGetFavourites();
    if (res.status) {
      setLoading(false);
      setWishList(res?.data as []);
    } else {
      setLoading(false);
    }
  };

  const addOrRemoveFavourite = async (id: string, add: boolean) => {
    let favItems = [...Wishlist];
    if (!add) {
      favItems.push(id);
    } else {
      favItems = favItems.filter(fav => fav !== id);
    }
    setLoading(true);
    dispatch(setFavorites(favItems));
    const res: {status: boolean; data?: []} = await toggleFavourite(id);
    if (res.status) {
      getFavouriteData();
      dispatch(setFavorites(await getWishlistIds()));
    }
  };

  const removeItemm = async (id: string) => {
    setLoading(true);
    const res = await handleRemoveCartItem(id);
    if (res.status) {
      getCartData();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // console.log('cartData', cartItems);
  const clearTimer = () => {
    clearTimeout(timerRef.current);
  };

  const getUpdatedData = () => {
    timerRef.current = setTimeout(async () => {
      await getCartData();
      setResetC(!resetC);
    }, 3000);
  };

  const clearCart = async () => {
    setLoading(true);
    const res = await handleClearCart(cartId);
    if (res.status) {
      await getCartData();
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const getTotalProducts = () => {
    let total = 0;
    cartItems?.map(item => (total = total + item.quantity));
    return total;
  };
  const getTotalAmount = () => {
    let total = 0;
    cartItems?.map(
      item => (total = total + item.quantity * Number(item.product.price)),
    );
    return total;
  };

  return (
    <>
      <OverlayLoader isShow={loading} />
      {cartItems?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CartHeader
            totalProducts={getTotalProducts()}
            theme={theme}
            onClear={() => setVisible(true)}
          />
          <FlatList
            data={cartItems}
            scrollEnabled={false}
            renderItem={({item}) => (
              <CartItems
                theme={theme}
                productInfo={item}
                onItemRemove={() => removeItemm(item.id)}
                clearTimer={clearTimer}
                getData={getUpdatedData}
                resetCount={resetC}
              />
            )}
          />
          <GapView length={40} />
          {/* <CouponContainer theme={theme} /> */}
          <CostBox
            totalAmount={cartTotal}
            totalProducts={getTotalProducts()}
            theme={theme}
          />
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
                  clearCart();
                  setVisible(false);
                },
              },
            ]}
            visible={visible}
          />
          {wishList.length > 0 && (
            <View style={{marginTop: 30, marginBottom: 10}}>
              <MyCatalog
                catalogName="My wishlist"
                catalogItems={wishList}
                onSeeAllPress={() =>
                  navigation.navigate('D1Nav', {screen: 'WishList'})
                }
                favorites={Wishlist}
                onFavPress={(id, add) => addOrRemoveFavourite(id, add)}
                listEmptyText="No Favourites found"
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

const CostBox = ({
  theme,
  totalProducts,
  totalAmount,
}: {
  theme: Theme;
  totalProducts: number;
  totalAmount: number;
}) => {
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
          <MyText text={'x' + totalProducts} weight="400" size={12} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <MyText text="Total:" weight="500" size={16} />
          <MyText text={'€' + totalAmount.toFixed(2)} weight="500" size={16} />
        </View>
      </View>
    </View>
  );
};

const CartItems = ({
  theme,
  onItemRemove,
  productInfo,
  clearTimer,
  getData,
  resetCount,
}: {
  theme: Theme;
  onItemRemove: () => void;
  productInfo: {id: string; quantity: number; product: catalogItemProps};
  clearTimer: () => void;
  getData: () => void;
  resetCount: boolean;
}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const timerRef = useRef<NodeJS.Timeout>();
  const cartId: string = useSelector((store: any) => store.cart.cartId);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [isFocused, resetCount]);
  useEffect(() => {
    if (isFocused) {
      clearAll();
    }
  }, [isFocused]);

  const clearAll = () => {
    dispatch(setCheckoutNote(''));
    dispatch(setShipAddressId(null));
    dispatch(setShipAddress(null));
  };

  const updateCartItem = async (num: number) => {
    if (num == -1 && productInfo.quantity + count == 1) {
      return;
    } else if (num == 1 && productInfo.quantity + count == 10) {
      Toast.show({
        text1: 'You can only purchase 10 for this product! ',
        type: 'error',
        topOffset: 0,
      });
      return;
    }
    clearTimer();
    setCount(count + num);
    const res = await handleUpdateCartItem(
      cartId,
      productInfo.product.id as string,
      productInfo.quantity + count + num,
    );
    if (res.status) {
      getData();
    }
  };

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
      <FastImage
        source={{uri: productInfo.product.productImage as string}}
        style={{width: 70, height: 70}}
      />
      <View>
        <MyText text={productInfo.product.name} />
        <MyText
          text={'€' + Number(productInfo.product.price).toFixed(2)}
          style={{marginVertical: 10}}
        />
        <Counter
          qty={productInfo.quantity + count}
          updateQty={num => updateCartItem(num)}
          theme={theme}
        />
      </View>
    </View>
  );
};

const Counter = ({
  theme,
  qty,
  updateQty,
}: {
  theme: Theme;
  qty: number;
  updateQty: (num: number) => void;
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => updateQty(-1)}
        disabled={qty == 1}
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
        <AntDesign
          name="minus"
          color={qty == 1 ? 'lightgrey' : theme.colors.text}
        />
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
        <MyText text={qty.toString()} textColor={theme.colors.text} />
      </View>
      <TouchableOpacity
        onPress={() => updateQty(1)}
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

const CartHeader = ({
  theme,
  totalProducts,
  onClear,
}: {
  theme: Theme;
  totalProducts: number;
  onClear: () => void;
}) => {
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
          text={totalProducts + ' items'}
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
