import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  ScrollViewProps,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {FloatingAction} from 'react-native-floating-action';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {
  CartThin,
  Close,
  Dots,
  Heart,
  HeartFill,
  HeartThin,
  Leaves,
  ShareThin,
} from '../../assets';
import MyCatalogItem from '../../components/MyCatalogItem';
import {
  BottomTabParamsList,
  D1ParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {
  BSheetModal,
  BubbleIcon,
  FAB,
  GapView,
  MyButton,
  MyText,
  OverlayLoader,
} from '../../components';
import MyDropDown from '../../components/MyDropDown';
import {MyTheme, catalogItemProps} from '../../types';
import {setFavorites} from '../../features/product/productSlice';
import {getWishlistIds, toggleFavourite} from '../../utils';
import {handleAddItemToCart, handleGetProducts} from './utils';
import {handleClearCart} from '../Cart/utils';

type DrawViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'D1Nav'
>;

type ProductViewRouteProps = NativeStackScreenProps<
  D1ParamsList,
  'ProductView'
>;

export default function ProductView() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<DrawViewNavigationProps['navigation']>();
  const route = useRoute<ProductViewRouteProps['route']>();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const dispatch = useDispatch();
  const Wishlist: string[] = useSelector(
    (store: any) => store.product.favorites,
  );
  const cartId: string = useSelector((store: any) => store.cart.cartId);
  const cartItems: {
    id: string;
    quantity: number;
    product: catalogItemProps;
  }[] = useSelector((store: any) => store.cart.cartItems);
  const token: string = useSelector((store: any) => store.user.token);
  const categories = useSelector((store: any) => store.category.categories);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<
    {id: string; product: catalogItemProps}[]
  >([]);
  const [qty, setQty] = useState(1);

  const productInfo = route?.params?.produtInfo;
  const tags = productInfo?.tags?.split(', ');
  const desc = productInfo?.description?.split(', ');

  useEffect(() => {
    getCategoryProducts();
  }, [route.params.produtInfo]);

  const getCategoryProducts = async () => {
    setLoading(true);
    const productsRes: {status: boolean; data?: any} = await handleGetProducts(
      route?.params?.categoryId as string,
    );
    if (productsRes.status) {
      const categoryProduct = productsRes.data?.items[0]?.categoryProduct;
      setCategoryProducts(
        categoryProduct.filter(
          (item: {id: string; product: catalogItemProps}) =>
            item?.product?.id != route?.params?.produtInfo.id,
        ),
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        setVisible(false);
        return true;
      } else {
        backHandler.remove();
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [visible]);

  const [dropDownList, setDropDownList] = useState([
    {
      name: 'Description',
      open: true,
      children: <DescriptionData descNotes={desc as string[]} />,
    },
    {
      name: 'Categories',
      open: true,
      children: <CategoriesData categoryName={route?.params?.categoryName} />,
    },
    {
      name: 'Tags',
      open: true,
      children: <TagsData tags={tags as string[]} />,
    },
  ]);

  const addOrRemoveFavourite = async (id: string, add: boolean) => {
    if (token) {
      let favItems = [...Wishlist];
      if (!add) {
        favItems.push(id);
      } else {
        favItems = favItems.filter(fav => fav !== id);
      }
      dispatch(setFavorites(favItems));
      const res: {status: boolean; data?: []} = await toggleFavourite(id);
      if (res.status) {
        dispatch(setFavorites(await getWishlistIds()));
      }
    } else {
      Toast.show({
        text1: 'Please log in before adding products to favourites.',
        text2: 'Tap to login',
        type: 'error',
        topOffset: 0,
        onPress: () => {
          Toast.hide();
          navigation.navigate('SignIn');
        },
      });
    }
  };

  const updateQty = (val: number) => {
    if (qty + val == 0) {
      return;
    }
    setQty(qty + val);
  };

  const addToCart = async () => {
    if (token) {
      setLoading(true);
      const exist = cartItems?.some(item => item.product.id == productInfo.id);
      if (exist) {
        Toast.show({
          text1: 'This product already exist in your cart',
          type: 'error',
          topOffset: 0,
        });
        setLoading(false);
      } else if (qty > 10) {
        Toast.show({
          text1: 'You can only purchase 10 for this product! ',
          type: 'error',
          topOffset: 0,
        });
        setLoading(false);
      } else {
        await handleAddItemToCart(productInfo?.id as string, qty);
        setLoading(false);
      }
    } else {
      Toast.show({
        text1: 'Please log in before adding products to the cart.',
        text2: 'Tap to login',
        type: 'error',
        topOffset: 0,
        onPress: () => {
          Toast.hide();
          navigation.navigate('SignIn');
        },
      });
    }
  };

  const buyNow = async () => {
    if (token) {
      setLoading(true);
      if (qty > 10) {
        Toast.show({
          text1: 'You can only purchase 10 for this product! ',
          type: 'error',
          topOffset: 0,
        });
        setLoading(false);
      } else if (cartId) {
        const clearRes = await handleClearCart(cartId);
        if (clearRes.status) {
          await handleAddItemToCart(productInfo?.id as string, qty, true);
          navigation.navigate('D1Nav', {
            screen: 'Checkout',
            params: {latLong: undefined},
          });
          setLoading(false);
        }
      } else {
        await handleAddItemToCart(productInfo?.id as string, qty, true);
        navigation.navigate('D1Nav', {
          screen: 'Checkout',
          params: {latLong: undefined},
        });
        setLoading(false);
      }
    } else {
      Toast.show({
        text1: 'Please log in first to buy products.',
        text2: 'Tap to login',
        type: 'error',
        topOffset: 0,
        onPress: () => {
          Toast.hide();
          navigation.navigate('SignIn');
        },
      });
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'MPOUGADA LAUNDRY SERVICE',
        message:
          "Hey There I'am using MPOUGADA LAUNDRY SERVICE for my laundry, Its Great",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FAB
        quantity={cartItems?.length}
        onPress={() => {
          if (token) {
            navigation.navigate('Cart');
          } else {
            navigation.navigate('SignIn');
          }
        }}
      />
      <OverlayLoader isShow={loading} />
      <BSheetModal
        theme={theme}
        visible={visible}
        onClose={val => setVisible(val)}>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              if (token) {
                setVisible(false);
                navigation.navigate('Cart');
              } else {
                setVisible(false);
                navigation.navigate('SignIn');
              }
            }}
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingLeft: 40,
              alignItems: 'center',
            }}>
            <CartThin color={theme.colors.text} />
            <MyText
              text="My Cart"
              size={16}
              textColor={theme.colors.text}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (token) {
                setVisible(false);
                navigation.navigate('D1Nav', {screen: 'WishList'});
              } else {
                setVisible(false);
                navigation.navigate('SignIn');
              }
            }}
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingLeft: 40,
              paddingTop: 25,
              alignItems: 'center',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
            }}>
            <HeartThin color={theme.colors.text} />
            <MyText
              text="My WishList"
              size={16}
              textColor={theme.colors.text}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingLeft: 40,
              paddingTop: 25,
              alignItems: 'center',
            }}>
            <ShareThin color={theme.colors.text} />
            <MyText
              text="Share"
              size={16}
              textColor={theme.colors.text}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </TouchableOpacity>
        </View>
      </BSheetModal>
      <View style={styles.headerContainer}>
        <BubbleIcon onPress={() => navigation.goBack()} children={<Close />} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BubbleIcon
            onPress={() =>
              addOrRemoveFavourite(
                productInfo?.id as string,
                Wishlist.some(fav => fav == productInfo.id),
              )
            }
            children={
              Wishlist.some(fav => fav == productInfo.id) ? (
                <HeartFill />
              ) : (
                <Heart color={theme.colors.placeholder} />
              )
            }
          />
          <GapView mode="horizontal" />
          <BubbleIcon children={<Dots />} onPress={() => setVisible(true)} />
        </View>
      </View>
      <View style={styles.hiddenView}>
        <GapView length={50} />
        <View
          style={{
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: productInfo?.productImage as string}}
            style={{height: 200, width: 200}}
          />
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          zIndex: 2,
        }}>
        <TouchableOpacity
          style={{zIndex: 2}}
          onPress={() =>
            navigation.navigate('D1Nav', {
              screen: 'ProductImage',
              params: {image: productInfo?.productImage as string},
            })
          }>
          <GapView length={250} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
          }}>
          <GapView length={30} />
          <MyText size={16} text={productInfo?.name ?? 'N/A'} />
          <GapView length={20} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <MyText
              weight="600"
              text={
                productInfo?.price2
                  ? '€' +
                    Number(productInfo?.price1).toFixed(2) +
                    ' - €' +
                    Number(productInfo?.price2).toFixed(2)
                  : '€' + Number(productInfo?.price1).toFixed(2)
              }
            />
            <MyText weight="500" textColor="#49ACE1" text="In stock" />
          </View>
          <GapView length={20} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <MyText text="Quantity" />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BubbleIcon
                onPress={() => updateQty(-1)}
                style={{
                  backgroundColor: '#FAFAFA',
                }}
                plain
                children={
                  <AntIcon
                    name="minus"
                    color={qty == 1 ? 'lightgrey' : 'black'}
                  />
                }
              />
              <GapView mode="horizontal" />
              <View
                style={{
                  width: 100,
                  height: 30,
                  borderWidth: 1,
                  borderColor: '#e4e4e4',
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MyText text={qty.toString()} />
              </View>
              <GapView mode="horizontal" />
              <BubbleIcon
                onPress={() => updateQty(1)}
                style={{
                  backgroundColor: '#FAFAFA',
                }}
                plain
                children={<AntIcon name="plus" color={'black'} />}
              />
            </View>
          </View>
          <GapView length={20} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <MyButton label="Buy Now" onPress={buyNow} style={{width: '40%'}} />
            <MyButton
              label="Add to Cart"
              textColor="black"
              style={{
                width: '50%',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#e4e4e4',
              }}
              onPress={addToCart}
            />
          </View>
          {dropDownList?.map((item, index) => (
            <View key={index}>
              <GapView length={30} />
              <MyDropDown
                title={item.name}
                open={item.open}
                children={item.children}
                onPress={() => {
                  let list = [...dropDownList];
                  list[index].open = !list[index].open;
                  setDropDownList(list);
                }}
              />
            </View>
          ))}
          <GapView length={20} />
          <MyText size={18} text="You might also like" />
          <GapView />
        </View>
        <ScrollView
          style={{backgroundColor: theme.colors.background}}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <GapView length={20} mode="horizontal" />
          {categoryProducts.length > 0 ? (
            categoryProducts?.map((item, index) => (
              <View style={{flexDirection: 'row'}} key={index}>
                <MyCatalogItem
                  item={item?.product}
                  index={index}
                  onFav={(id, add) => addOrRemoveFavourite(id, add)}
                  categoryId={route.params.categoryId}
                  categoryName={route.params.categoryName}
                  fav={Wishlist?.some(fav => fav == item.product.id)}
                  onPress={() => scrollViewRef.current?.scrollTo({y: 0})}
                />
                <GapView length={15} mode="horizontal" />
              </View>
            ))
          ) : (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 20,
                width: '100%',
                alignItems: 'center',
                gap: 10,
              }}>
              <Leaves width={100} />
              <MyText
                size={12}
                style={{width: '60%'}}
                text="No Other Products in the Category"
              />
            </View>
          )}
        </ScrollView>
        <GapView length={20} />
      </ScrollView>
    </View>
  );
}

const DescriptionData = ({descNotes}: {descNotes: string[]}) => {
  const descHIW = [
    'Simply place the order',
    'Driver calls you to confirm pick up',
    'We deliver back to you within 6-48 hours',
  ];

  return (
    <View style={{width: '100%'}}>
      <MyText weight="600" text="*Notes" />
      <GapView />
      {descNotes?.map((item, index) => (
        <View key={index}>
          <View style={{flexDirection: 'row'}}>
            <EntypoIcon name="dot-single" size={20} color={'black'} />
            <MyText style={{width: '95%'}} text={item} />
          </View>
          <GapView />
        </View>
      ))}
      <GapView length={20} />
      <MyText weight="600" text="How it works" />
      <GapView />
      {descHIW?.map((item, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <MyText weight="500" text={`Step ${index + 1}: `} />
          <MyText text={item} />
        </View>
      ))}
    </View>
  );
};

const CategoriesData = ({categoryName}: {categoryName?: string}) => {
  return (
    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      <MyText
        style={{marginRight: 20}}
        weight="500"
        text={categoryName}
        textColor="#49ACE1"
      />
    </View>
  );
};

const TagsData = ({tags}: {tags: string[]}) => {
  return (
    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      {tags?.map((item, index) => (
        <MyText
          key={index}
          style={{marginRight: 20}}
          weight="500"
          text={`${item}`}
          textColor="#49ACE1"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  hiddenView: {
    zIndex: 1,
    width: '100%',
    position: 'absolute',
  },
  dropDown: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});
