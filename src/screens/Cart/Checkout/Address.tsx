import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

import {CheckoutFooter} from '.';
import {GapView, MyButton, MyInput, MyText} from '../../../components';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../../types/navigationParams';
import {AddressSchema} from '../../../constants/validations/schema';
import {handleGetCities, handleGetStates, handleSaveAddress} from './utils';
import {MyTheme, UserInfoAddr} from '../../../types';
import {User} from '../../../features/user/userSlice';
import {
  setShipAddress,
  setShipAddressId,
} from '../../../features/checkout/checkoutSlice';

type CartNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Cart'
>;

export default function Address({
  setIndex,
  mapLocation,
}: {
  setIndex: (num: number) => void;
  mapLocation: string;
}) {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const navigation = useNavigation<CartNavigationProps['navigation']>();
  const userData: User = useSelector((store: any) => store.user.userData);
  const shipAddr: UserInfoAddr = useSelector(
    (store: any) => store.checkout.shipAddress,
  );
  const shipAddrId: UserInfoAddr = useSelector(
    (store: any) => store.checkout.addressId,
  );

  const personalInfo = [
    {
      key: 'firstName',
      label: 'First Name',
      text: '',
      placeholder: 'Enter first name',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      text: '',
      placeholder: 'Enter last name',
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      text: '',
      placeholder: 'Enter phone number',
    },
    {
      key: 'email',
      label: 'Email',
      text: '',
      placeholder: 'Enter email',
    },
  ];

  const addressInfo = [
    {
      key: 'country',
      label: 'Country',
      text: 'Cyprus',
      placeholder: 'Enter country',
    },
    {
      key: 'state',
      label: 'State / Province',
      text: '',
      placeholder: 'Enter state / province',
    },
    {key: 'city', label: 'City', text: '', placeholder: 'Enter city'},
    {
      key: 'zipCode',
      label: 'Zip-code',
      text: '',
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
      text: '',
      placeholder: 'Enter street name',
    },
  ];

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [state, setState] = useState<string | null>(shipAddr?.state ?? null);
  const [city, setCity] = useState(shipAddr?.city ?? null);
  const [info, setInfo] = useState<UserInfoAddr | null>(null);
  const [address, setAddress] = useState<UserInfoAddr | null>(null);
  const [save, setSave] = useState(false);
  const [continueShip, setContinueShip] = useState(false);
  const [dirt, setDirt] = useState(false);
  const value = (values: object, key: string) => {
    //@ts-ignore
    return values[key];
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if ((address && info && save) || (address && info && continueShip)) {
      saveAddress({...info, ...address});
    }
  }, [address, info, setSave, setContinueShip]);

  const getStates = async () => {
    const countryStates = await handleGetStates();
    setStates(countryStates as []);
    if (shipAddr?.state) {
      console.log('shipAddr?.state', shipAddr?.state + ' ' + 'District');
      setState('Limassol District');
    }
  };

  const onStateSelect = (value: string) => {
    getCities(value);
  };

  const getCities = async (state: string) => {
    const stateCities = await handleGetCities(state);
    setCities(stateCities as []);
    if (shipAddr) {
      setCity(shipAddr?.city);
    }
  };

  const saveAddress = async (addressInformation: UserInfoAddr) => {
    console.log('cahal', addressInformation);
    await handleSaveAddress(addressInformation, save);
    if (continueShip && !shipAddrId) {
      dispatch(
        setShipAddress({
          firstName: addressInformation.firstName,
          lastName: addressInformation.lastName,
          email: addressInformation.email,
          phoneNumber: addressInformation.phoneNumber,
          apartment: addressInformation.apartment,
          block: addressInformation.block,
          city: addressInformation?.city,
          country: addressInformation?.country,
          state: addressInformation?.state,
          street: addressInformation?.street,
          zipCode: addressInformation?.zipCode,
          distanceOut: shipAddr.distanceOut,
        }),
      );
      setContinueShip(false);
      setIndex(1);
    } else {
      dispatch(setShipAddress(null));
      setSave(false);
    }
  };

  const checkAddress = () => {
    if (shipAddrId) {
      setIndex(1);
    } else if (dirt) {
      Toast.show({
        text1: `Please select saved address from Select Address & don't Edit it`,
        type: 'error',
        topOffset: 0,
      });
    } else {
      Toast.show({
        text1: 'Please select saved address from Select Address',
        type: 'error',
        topOffset: 0,
      });
    }
  };

  const formikRef1 = useRef<any>(null);
  const formikRef2 = useRef<any>(null);

  const handleExternalSubmit = () => {
    if (formikRef1.current && formikRef2.current) {
      formikRef1.current.handleSubmit();
      formikRef2.current.handleSubmit();
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{flex: 1}}>
        <Formik
          innerRef={formikRef1}
          enableReinitialize
          initialValues={{
            firstName: shipAddr?.firstName ?? userData.firstName,
            lastName: shipAddr?.lastName ?? userData.lastName,
            phoneNumber: shipAddr?.phoneNumber ?? userData.phoneNumber,
            email: shipAddr?.email ?? userData.email,
          }}
          validationSchema={AddressSchema.personelInfo}
          onSubmit={(vals, func) => {
            if (!mapLocation) {
              Toast.show({
                text1: 'Please select your location from Search Address',
                type: 'error',
                topOffset: 0,
              });
            } else {
              const personalInformation = {
                ...vals,
                latitude: mapLocation?.split(',')[0],
                longitude: mapLocation?.split(',')[1],
              };
              setInfo(
                state => ({...state, ...personalInformation} as UserInfoAddr),
              );
              // func.resetForm();
            }
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldValue,
            touched,
            setTouched,
            dirty,
          }) => {
            if (dirty && !dirt && shipAddrId) {
              dispatch(setShipAddressId(null));
              setDirt(true);
            }
            return (
              <>
                {personalInfo.map((item, index) => (
                  <View key={index}>
                    <GapView />
                    <MyInput
                      label={item.label}
                      text={value(values, item.key)}
                      placeholder={item.placeholder}
                      keyboardType={
                        item.key == 'phoneNumber' ? 'phone-pad' : 'default'
                      }
                      inputStyle={{color: '#424242'}}
                      style={{paddingTop: 5}}
                      onChange={handleChange(item.key)}
                    />
                    {errors.firstName && touched.firstName && index == 0 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.firstName} />
                      </>
                    )}
                    {errors.lastName && touched.lastName && index == 1 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.lastName} />
                      </>
                    )}
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      index == 2 && (
                        <>
                          <GapView />
                          <MyText
                            textColor="#F50000"
                            text={errors.phoneNumber}
                          />
                        </>
                      )}
                    {errors.email && touched.email && index == 3 && (
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
                      onPress={() => {
                        navigation.navigate('D1Nav', {
                          screen:
                            index == 0 ? 'SearchAddress' : 'SelectAddress',
                        });
                        if (index == 1) {
                          dispatch(setShipAddress(null));
                          setDirt(false);
                        }
                      }}
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
              </>
            );
          }}
        </Formik>
        <Formik
          innerRef={formikRef2}
          initialValues={{
            country: shipAddr?.country ?? 'Cyprus',
            city: shipAddr?.city ?? null,
            state: shipAddr?.state ? shipAddr?.state : state,
            apartment: shipAddr?.apartment ?? '',
            block: shipAddr?.block ?? '',
            street: shipAddr?.street ?? '',
            zipCode: shipAddr?.zipCode ?? '',
          }}
          enableReinitialize
          validationSchema={AddressSchema.addressInfo}
          onSubmit={(vals, func) => {
            if (!mapLocation) {
              Toast.show({
                text1: 'Please select your location from Search Address',
                type: 'error',
                topOffset: 0,
              });
            } else {
              console.log('ye chal');

              const addressInformation = {
                ...vals,
                latitude: mapLocation?.split(',')[0],
                longitude: mapLocation?.split(',')[1],
              };
              setAddress(
                state => ({...state, ...addressInformation} as UserInfoAddr),
              );
              // func.resetForm();
            }
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldValue,
            touched,
            setTouched,
            dirty,
          }) => {
            if (dirty && !dirt && shipAddrId) {
              dispatch(setShipAddressId(null));
              setDirt(true);
            }
            return (
              <>
                {addressInfo.map((item, index) => (
                  <View key={index}>
                    <GapView />
                    {index != 1 && index != 2 && (
                      <MyInput
                        label={item.label}
                        editable={item.key == 'country' ? false : true}
                        text={value(values, item.key)}
                        placeholder={item.placeholder}
                        inputStyle={{color: '#424242'}}
                        keyboardType={
                          item.key == 'zipCode' ? 'number-pad' : 'default'
                        }
                        style={{paddingTop: 5}}
                        onChange={handleChange(item.key)}
                      />
                    )}
                    {errors.country && touched.country && index == 0 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.country} />
                      </>
                    )}
                    {index == 1 && (
                      <>
                        <MyText
                          text="State"
                          style={{paddingLeft: 14}}
                          textColor={theme.colors.placeholder}
                        />
                        <DropDownPicker
                          open={openState}
                          value={values.state}
                          setValue={setState}
                          items={states}
                          setOpen={val => {
                            setOpenState(val);
                            setOpenCity(false);
                          }}
                          onChangeValue={val => {
                            if (val != null) {
                              console.log('calla', val);
                              setFieldValue(item.key, val);
                              onStateSelect(val);
                            }
                            console.log('calla out', val);
                          }}
                          schema={{label: 'name', value: 'name'}}
                          placeholder={'Select state / province'}
                          listMode="SCROLLVIEW"
                          scrollViewProps={{nestedScrollEnabled: true}}
                          placeholderStyle={{color: theme.colors.placeholder}}
                          dropDownContainerStyle={{
                            backgroundColor: theme.colors.background,
                            borderWidth: 1,
                            borderColor: theme.colors.border,
                          }}
                          textStyle={{
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                            color: theme.colors.text,
                          }}
                          style={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderRadius: 0,
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.background,
                            zIndex: 1,
                            paddingLeft: 14,
                            minHeight: 0,
                            paddingVertical: 10,
                          }}
                        />
                      </>
                    )}
                    {index == 2 && (
                      <>
                        <MyText
                          text="City"
                          style={{paddingLeft: 14}}
                          textColor={theme.colors.placeholder}
                        />
                        <DropDownPicker
                          open={openCity}
                          value={city}
                          setValue={setCity}
                          items={cities}
                          setOpen={val => {
                            setOpenCity(val);
                            setOpenState(false);
                          }}
                          onChangeValue={val => {
                            if (val != null) {
                              setFieldValue(item.key, val);
                            }
                          }}
                          schema={{label: 'name', value: 'name'}}
                          placeholder={'Select city'}
                          listMode="SCROLLVIEW"
                          scrollViewProps={{nestedScrollEnabled: true}}
                          dropDownContainerStyle={{
                            backgroundColor: theme.colors.background,
                            borderWidth: 1,
                            borderColor: theme.colors.border,
                          }}
                          placeholderStyle={{color: theme.colors.placeholder}}
                          textStyle={{
                            fontSize: 14,
                            fontFamily: 'Inter-Regular',
                            color: theme.colors.text,
                          }}
                          style={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.background,
                            borderRadius: 0,
                            zIndex: 2,
                            paddingLeft: 14,
                            minHeight: 0,
                            paddingVertical: 10,
                          }}
                        />
                      </>
                    )}

                    {errors.state && touched.state && index == 1 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.state} />
                      </>
                    )}
                    {errors.city && touched.city && index == 2 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.city} />
                      </>
                    )}
                    {errors.zipCode && touched.zipCode && index == 3 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.zipCode} />
                      </>
                    )}
                    {errors.street && touched.street && index == 6 && (
                      <>
                        <GapView />
                        <MyText textColor="#F50000" text={errors.street} />
                      </>
                    )}
                  </View>
                ))}
              </>
            );
          }}
        </Formik>
      </ScrollView>
      <CheckoutFooter
        priButtonLabel="Continue to shipping"
        secButtonLabel="Save address"
        priButtonPress={() => {
          // checkAddress();
          if (shipAddrId) {
            setIndex(1);
          } else {
            handleExternalSubmit();
            setContinueShip(true);
          }
        }}
        secButtonPress={() => {
          handleExternalSubmit();
          setSave(true);
        }}
      />
    </>
  );
}
