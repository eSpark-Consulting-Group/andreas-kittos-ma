import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {
  CartThin,
  Close,
  Dots,
  Heart,
  HeartFill,
  HeartThin,
  ShareThin,
  WashingMachine,
  WashingMachineLarge,
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
  GapView,
  MyButton,
  MyText,
} from '../../components';
import MyDropDown from '../../components/MyDropDown';
import {MyTheme} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites} from '../../features/product/productSlice';
import {getWishlistIds, toggleFavourite} from '../../utils';

type ProductViewNavigationProps = NativeStackScreenProps<
  D1ParamsList & BottomTabParamsList & RootStackParamsList,
  'ProductView'
>;

export default function ProductView() {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const Wishlist: string[] = useSelector(
    (store: any) => store.product.favorites,
  );
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();
  const route = useRoute<ProductViewNavigationProps['route']>();
  const [visible, setVisible] = useState(false);

  const productInfo = route?.params?.produtInfo;
  const tags = productInfo?.tags?.split(', ');
  const desc = productInfo?.description?.split(', ');

  console.log('desc', desc);

  const descNotes = [
    'Lorem ipsum dolor sit',
    'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod',
  ];

  const staticTags = ['Ironing', 'Laundry', 'Dry', 'Wash'];

  const [dropDownList, setDropDownList] = useState([
    {
      name: 'Description',
      open: true,
      children: <DescriptionData descNotes={(desc as string[]) ?? descNotes} />,
    },
    {name: 'Categories', open: true, children: <CategoriesData />},
    {
      name: 'Tags',
      open: true,
      children: <TagsData tags={(tags as string[]) ?? staticTags} />,
    },
  ]);

  const addOrRemoveFavourite = async (id: string, add: boolean) => {
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
  };

  return (
    <View style={{flex: 1}}>
      <BSheetModal
        theme={theme}
        visible={visible}
        onClose={val => setVisible(val)}>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              navigation.navigate('Cart');
            }}
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingLeft: 40,
              alignItems: 'center',
            }}>
            <CartThin />
            <MyText
              text="My Cart"
              size={16}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              navigation.navigate('D1Nav', {screen: 'WishList'});
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
            <HeartThin />
            <MyText
              text="My WishList"
              size={16}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingLeft: 40,
              paddingTop: 25,
              alignItems: 'center',
            }}>
            <ShareThin />
            <MyText
              text="Share"
              size={16}
              style={{marginLeft: 10, opacity: 0.6}}
            />
          </View>
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
          <Image
            source={
              productInfo?.productImage
                ? {uri: productInfo?.productImage as string}
                : WashingMachineLarge
            }
            style={{height: 200, width: 200}}
          />
        </View>
      </View>
      <ScrollView
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
          <MyText
            style={{textAlign: 'center'}}
            text={productInfo?.name ?? 'Laundry - Dry - Ironing (per kilo)'}
          />
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
              text={'€' + productInfo?.price + '.00' ?? '€9.00'}
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
                style={{
                  backgroundColor: '#FAFAFA',
                }}
                plain
                children={<AntIcon name="minus" color={'black'} />}
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
                <MyText text="1" />
              </View>
              <GapView mode="horizontal" />
              <BubbleIcon
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
            <MyButton label="Buy Now" style={{width: '40%'}} />
            <MyButton
              label="Add to Cart"
              textColor="black"
              style={{
                width: '50%',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#e4e4e4',
              }}
            />
          </View>
          {dropDownList.map((item, index) => (
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
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <GapView length={20} mode="horizontal" />
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              <MyCatalogItem
                item={{
                  name: 'Laundry',
                  productImage: WashingMachine,
                  price: '9',
                  fav: false,
                }}
                fav={false}
              />
              <GapView length={15} mode="horizontal" />
            </View>
          ))}
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
      {descNotes.map((item, index) => (
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
      {descHIW.map((item, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <MyText weight="500" text={`Step ${index + 1}: `} />
          <MyText text={item} />
        </View>
      ))}
    </View>
  );
};

const CategoriesData = () => {
  const cats = ['Ironing', 'Laundry'];
  return (
    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      {cats.map((item, index) => (
        <MyText
          key={index}
          style={{marginRight: 20}}
          weight="500"
          text={item}
          textColor="#49ACE1"
        />
      ))}
    </View>
  );
};

const TagsData = ({tags}: {tags: string[]}) => {
  return (
    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      {tags.map((item, index) => (
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
