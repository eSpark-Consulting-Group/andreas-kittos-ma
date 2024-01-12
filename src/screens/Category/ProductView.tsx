import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {
  Close,
  Dots,
  Heart,
  WashingMachine,
  WashingMachineLarge,
} from '../../assets';
import MyCatalogItem from '../../components/MyCatalogItem';
import {RootStackParamsList} from '../../types/navigationParams';
import {BubbleIcon, GapView, MyButton, MyText} from '../../components';
import MyDropDown from '../../components/MyDropDown';

type ProductViewNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'D1Nav'
>;

export default function ProductView() {
  const navigation = useNavigation<ProductViewNavigationProps['navigation']>();

  const [dropDownList, setDropDownList] = useState([
    {name: 'Description', open: true, children: <DescriptionData />},
    {name: 'Categories', open: true, children: <CategoriesData />},
    {name: 'Tags', open: true, children: <TagsData />},
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <BubbleIcon onPress={() => navigation.goBack()} children={<Close />} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BubbleIcon children={<Heart />} />
          <GapView mode="horizontal" />
          <BubbleIcon children={<Dots />} />
        </View>
      </View>
      <View style={styles.hiddenView}>
        <GapView length={50} />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={WashingMachineLarge}
            style={{height: 200, width: 200}}
          />
          <GapView length={50} />
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
            navigation.navigate('D1Nav', {screen: 'ProductImage'})
          }>
          <GapView length={250} />
        </TouchableOpacity>
        <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
          <GapView length={30} />
          <MyText
            style={{textAlign: 'center'}}
            text={'Laundry - Dry - Ironing (per kilo)'}
          />
          <GapView length={20} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <MyText weight="600" text="€9.00" />
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
                  image: WashingMachine,
                  price: '€9.00',
                  fav: false,
                }}
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

const DescriptionData = () => {
  const descNotes = [
    'Lorem ipsum dolor sit',
    'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod',
  ];

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

const TagsData = () => {
  const tags = ['Ironing', 'Laundry', 'Dry', 'Wash'];
  return (
    <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
      {tags.map((item, index) => (
        <MyText
          key={index}
          style={{marginRight: 20}}
          weight="500"
          text={`#${item}`}
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
