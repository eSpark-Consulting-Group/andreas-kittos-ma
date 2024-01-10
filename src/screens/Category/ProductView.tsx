import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
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
      <View
        style={{
          zIndex: 1,
          width: '100%',
          position: 'absolute',
        }}>
        <GapView length={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <BubbleIcon
            onPress={() => navigation.goBack()}
            children={<Close />}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BubbleIcon children={<Heart />} />
            <GapView mode="horizontal" />
            <BubbleIcon children={<Dots />} />
          </View>
        </View>
        <GapView length={5} />
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
        style={{
          flex: 1,
          zIndex: 2,
        }}>
        <GapView length={300} />
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
                  borderWidth: 1,
                  elevation: 0,
                  backgroundColor: '#FAFAFA',
                }}
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
                  borderWidth: 1,
                  elevation: 0,
                  backgroundColor: '#FAFAFA',
                }}
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
            <>
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
            </>
          ))}

          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setOpenDropdown(!openDropdown)}
            style={styles.dropDown}>
            <MyText weight="500" text="Description" />
            <EntypoIcon
              name={openDropdown ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={14}
              color={'black'}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          <View
            style={{width: '100%', display: openDropdown ? 'flex' : 'none'}}>
            <GapView />
            <MyText weight="600" text="*Notes" />
            <GapView />
            <View style={{flexDirection: 'row'}}>
              <EntypoIcon name="dot-single" size={20} color={'black'} />
              <MyText text="Lorem ipsum dolor sit" />
            </View>
            <GapView />
            <View style={{flexDirection: 'row'}}>
              <EntypoIcon name="dot-single" size={20} color={'black'} />
              <MyText
                text="Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod"
                style={{width: '95%'}}
              />
            </View>
          </View>
          <View
            style={{width: '100%', display: openDropdown ? 'flex' : 'none'}}>
            <GapView length={20} />
            <MyText weight="600" text="How it works" />
            <GapView />

            <View style={{flexDirection: 'row'}}>
              <MyText weight="500" text="Step 1: " />
              <MyText text="Simply place the order" />
            </View>
            <GapView />
            <View style={{flexDirection: 'row'}}>
              <MyText weight="500" text="Step 2: " />
              <MyText
                text="Driver calls you to confirm pick up"
                style={{width: '95%'}}
              />
            </View>
            <GapView />
            <View style={{flexDirection: 'row'}}>
              <MyText weight="500" text="Step 3: " />
              <MyText
                text="We deliver back to you within 6-48 hours"
                style={{width: '95%'}}
              />
            </View>
            <GapView length={20} />
            <MyText
              text="If you need assistance or prefer to order via phone call - please call or message us via 
              Whatsapp - +123456789"
            />
          </View>
          <GapView length={30} />
          <TouchableOpacity activeOpacity={0.6} style={styles.dropDown}>
            <MyText weight="500" text="Categories" />
            <EntypoIcon
              name="chevron-thin-up"
              size={14}
              color={'black'}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          <View style={{margin: 20, flexDirection: 'row'}}>
            <MyText weight="500" text="Ironing" textColor="#49ACE1" />
            <GapView length={20} mode="horizontal" />
            <MyText weight="500" text="Laundry" textColor="#49ACE1" />
          </View>
          <GapView length={10} />
          <TouchableOpacity activeOpacity={0.6} style={styles.dropDown}>
            <MyText weight="500" text="Tags" />
            <EntypoIcon
              name="chevron-thin-up"
              size={14}
              color={'black'}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          <View style={{margin: 20, flexDirection: 'row'}}>
            <MyText weight="500" text="#Ironing" textColor="#49ACE1" />
            <GapView length={20} mode="horizontal" />
            <MyText weight="500" text="#Laundry" textColor="#49ACE1" />
            <GapView length={20} mode="horizontal" />
            <MyText weight="500" text="#Dry" textColor="#49ACE1" />
            <GapView length={20} mode="horizontal" />
            <MyText weight="500" text="#Wash" textColor="#49ACE1" />
          </View> */}
          <GapView length={10} />
          <MyText size={18} text="You might also like" />
          <GapView />
          <ScrollView horizontal>
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <>
                <MyCatalogItem
                  item={{
                    name: 'Laundry',
                    image: WashingMachine,
                    price: '€9.00',
                    fav: false,
                  }}
                />
                <GapView length={15} mode="horizontal" />
              </>
            ))}
            {/* <MyCatalogItem
              item={{name: 'Laundry', image: WashingMachine, price: '€9.00'}}
            />
            <GapView length={15} mode="horizontal" />
            <MyCatalogItem
              item={{name: 'Laundry', image: WashingMachine, price: '€9.00'}}
            />
            <GapView length={15} mode="horizontal" />
            <MyCatalogItem
              item={{name: 'Laundry', image: WashingMachine, price: '€9.00'}}
            />
            <GapView length={15} mode="horizontal" />
            <MyCatalogItem
              item={{name: 'Laundry', image: WashingMachine, price: '€9.00'}}
            />
            <GapView length={15} mode="horizontal" />
            <MyCatalogItem
              item={{name: 'Laundry', image: WashingMachine, price: '€9.00'}}
            /> */}
          </ScrollView>
          <GapView />
        </View>
      </ScrollView>
    </View>
  );
}

const DescriptionData = () => {
  return (
    <View style={{width: '100%'}}>
      <GapView />
      <MyText weight="600" text="*Notes" />
      <GapView />
      {[1, 2].map(() => (
        <>
          <View style={{flexDirection: 'row'}}>
            <EntypoIcon name="dot-single" size={20} color={'black'} />
            <MyText text="Lorem ipsum dolor sit" />
          </View>
          <GapView />
        </>
      ))}
      <GapView length={20} />
      <MyText weight="600" text="How it works" />
      <GapView />
      {[1, 2, 3].map(() => (
        <>
          <View style={{flexDirection: 'row'}}>
            <MyText weight="500" text="Step 1: " />
            <MyText text="Simply place the order" />
          </View>
          {/* <GapView /> */}
        </>
      ))}
    </View>
  );
};

const CategoriesData = () => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 20, flexDirection: 'row'}}>
      {[1, 2].map(() => (
        <>
          <MyText weight="500" text="Ironing" textColor="#49ACE1" />
          <GapView length={20} mode="horizontal" />
        </>
      ))}
    </View>
  );
};

const TagsData = () => {
  return (
    <View style={{marginHorizontal: 20, marginTop: 20, flexDirection: 'row'}}>
      {[1, 2, 3, 4].map(() => (
        <>
          <MyText weight="500" text="#Ironing" textColor="#49ACE1" />
          <GapView length={20} mode="horizontal" />
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
