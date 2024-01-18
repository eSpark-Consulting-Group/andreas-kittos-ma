import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CheckoutFooter} from '.';
import {GapView, MyButton, MyInput, MyText} from '../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';
import {Formik} from 'formik';
import {AddressSchema} from '../../../constants/validations/schema';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Address({setIndex}: {setIndex: (num: number) => void}) {
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const personalInfo = [
    {
      key: 'firstName',
      label: 'First Name',
      text: 'Muhammad',
      placeholder: 'Enter first name',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      text: 'Muhammad',
      placeholder: 'Enter last name',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      text: '',
      placeholder: 'Enter phone number',
    },
    {
      key: 'email',
      label: 'Email',
      text: '123@abc.com',
      placeholder: 'Enter email',
    },
  ];

  const addressInfo = [
    {key: 'country', label: 'Country', text: '', placeholder: 'Enter country'},
    {
      key: 'state',
      label: 'State / Province',
      text: '',
      placeholder: 'Enter state / province',
    },
    {key: 'city', label: 'City', text: '', placeholder: 'Enter city'},
    {
      key: 'zip',
      label: 'Zip-code',
      text: '674538',
      placeholder: 'Enter zip-code',
    },
    {
      key: 'apartment',
      label: 'Apartment',
      text: '',
      placeholder: 'Enter apartments',
    },
    {key: 'block', label: 'Block', text: '', placeholder: 'Enter block'},
    {
      key: 'street',
      label: 'Street Name',
      text: 'Parking Limassol Marina Street',
      placeholder: 'Enter street name',
    },
  ];
  const [pInfo, setPInfo] = useState([...personalInfo]);
  const [aInfo, setAInfo] = useState([...addressInfo]);
  const value = (values: object, key: string) => {
    //@ts-ignore
    return values[key];
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: 'Muhammad',
          lastName: 'Muhammad',
          phone: '',
          email: '123@abc.com',
          country: '',
          city: '',
          state: '',
          apartment: '',
          block: '',
          street: 'Parking Limassol Marina Street',
          zip: '674538',
        }}
        validationSchema={AddressSchema.personelInfo}
        onSubmit={() => setIndex(1)}>
        {({handleChange, handleSubmit, values, errors}) => {
          return (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}>
                {pInfo.map((item, index) => (
                  <View key={index}>
                    <GapView />
                    <MyInput
                      label={item.label}
                      text={value(values, item.key)}
                      placeholder={item.placeholder}
                      inputStyle={{color: '#424242'}}
                      style={{paddingTop: 5}}
                      onChange={handleChange(item.key)}
                    />
                    {errors.firstName && index == 0 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.firstName} />
                      </>
                    )}
                    {errors.lastName && index == 1 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.lastName} />
                      </>
                    )}
                    {errors.phone && index == 2 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.phone} />
                      </>
                    )}
                    {errors.email && index == 3 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.email} />
                      </>
                    )}
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
                          screen:
                            index == 0 ? 'SearchAddress' : 'SelectAddress',
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
                {aInfo.map((item, index) => (
                  <View key={index}>
                    <GapView />
                    <MyInput
                      label={item.label}
                      text={value(values, item.key)}
                      placeholder={item.placeholder}
                      inputStyle={{color: '#424242'}}
                      style={{paddingTop: 5}}
                      onChange={handleChange(item.key)}
                    />
                    {errors.country && index == 0 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.country} />
                      </>
                    )}
                    {errors.city && index == 2 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.city} />
                      </>
                    )}
                  </View>
                ))}
              </ScrollView>
              <CheckoutFooter
                priButtonLabel="Continue to shipping"
                secButtonLabel="Save address"
                priButtonPress={handleSubmit}
                secButtonPress={() => setIndex(0)}
              />
            </>
          );
        }}
      </Formik>
    </>
  );
}
