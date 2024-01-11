import React from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CheckoutFooter} from '.';
import {GapView, MyButton, MyInput} from '../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Address({setIndex}: {setIndex: (num: number) => void}) {
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const personalInfo = [
    {label: 'First Name', text: 'Muhammad', placeholder: 'Enter first name'},
    {label: 'Last Name', text: 'Muhammad', placeholder: 'Enter last name'},
    {label: 'Phone Number', text: '', placeholder: 'Enter phone number'},
    {label: 'Email', text: '123@abc.com', placeholder: 'Enter email'},
  ];

  const addressInfo = [
    {label: 'Country', text: '', placeholder: 'Enter country'},
    {
      label: 'State / Province',
      text: '',
      placeholder: 'Enter state / province',
    },
    {label: 'City', text: '', placeholder: 'Enter city'},
    {label: 'Apartment', text: '', placeholder: 'Enter apartments'},
    {label: 'Block', text: '', placeholder: 'Enter block'},
    {
      label: 'Street Name',
      text: 'Parking Limassol Marina Street',
      placeholder: 'Enter street name',
    },
    {label: 'Zip-code', text: '674538', placeholder: 'Enter zip-code'},
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {personalInfo.map((item, index) => (
          <View key={index}>
            <GapView />
            <MyInput
              label={item.label}
              text={item.text}
              placeholder={item.placeholder}
              inputStyle={{color: '#424242'}}
              style={{paddingTop: 5}}
            />
          </View>
        ))}
        {[1, 2].map((item, index) => (
          <View key={index}>
            <GapView />
            <MyButton
              label={index == 0 ? 'SEARCH ADDRESS' : 'SELECT ADDRESS'}
              labelStyle={{fontWeight: '400'}}
              textColor="#666"
              onPress={() =>
                navigation.navigate('D1Nav', {
                  screen: index == 0 ? 'SearchAddress' : 'SelectAddress',
                })
              }
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#e4e4e4',
                borderRadius: 100,
                paddingVertical: 15,
                height: 'auto',
              }}
            />
          </View>
        ))}
        {addressInfo.map((item, index) => (
          <View key={index}>
            <GapView />
            <MyInput
              label={item.label}
              text={item.text}
              placeholder={item.placeholder}
              inputStyle={{color: '#424242'}}
              style={{paddingTop: 5}}
            />
          </View>
        ))}
      </ScrollView>
      <CheckoutFooter
        priButtonLabel="Continue to shipping"
        secButtonLabel="Save address"
        priButtonPress={() => setIndex(1)}
        secButtonPress={() => setIndex(0)}
      />
    </>
  );
}
