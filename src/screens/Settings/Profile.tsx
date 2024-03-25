import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {
  GapView,
  MyAvatar,
  MyButton,
  MyInput,
  MyPopup,
  MyText,
  MyView,
  OverlayLoader,
} from '../../components';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  D1ParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {CloseBtn, SearchGrey} from '../../assets';
import {countryCodes} from '../../constants';
import {ProifleSchema} from '../../constants/validations/schema';
import {User, setUserData} from '../../features/user/userSlice';
import {storage} from '../../app/mmkv';
import {UpdateProfile, UpdateProfileImage} from './utils';
import {getUserProfile} from '../../utils';

interface ProfileData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
}

const listData = [
  {
    key: 'displayName',
    label: 'Display Name',
    placeholder: 'Enter Display Name',
  },
  {key: 'firstName', label: 'First Name', placeholder: 'Enter First Name'},
  {key: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name'},
  {key: 'email', label: 'Email', placeholder: 'Enter Email'},
];

type ProfileNavigationProps = NativeStackScreenProps<
  BottomTabParamsList & D1ParamsList,
  'Settings'
>;

export default function Profile() {
  const theme = useTheme() as MyTheme;
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileNavigationProps['navigation']>();
  const [isVisible, setisVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData: User = useSelector((store: any) => store.user.userData);

  const [previewData, setPreviewData] = useState<ProfileData>({
    displayName:
      userData?.displayName ?? userData?.firstName + ' ' + userData?.lastName,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData.email,
    phoneNumber: userData?.phoneNumber ?? '',
    profileImage: userData.profileImage,
  });
  const [selected, setSelected] = useState<{
    name?: string;
    code?: string;
    flagCode?: string;
  }>({
    name: previewData?.phoneNumber?.slice(0, 3)
      ? countryCodes.find(
          item => item.code === previewData.phoneNumber.slice(0, 3),
        )?.name
      : 'Greece',
    code: previewData?.phoneNumber?.slice(0, 3)
      ? previewData.phoneNumber.slice(0, 3)
      : '+30',
    flagCode: previewData?.phoneNumber?.slice(0, 3)
      ? countryCodes.find(
          item => item.code === previewData.phoneNumber.slice(0, 3),
        )?.flagCode
      : 'GR',
  });

  const renderCountryItem = ({
    item,
    theme,
  }: {
    item: {name: string; code: string; flagCode: string};
    theme?: MyTheme;
  }) => (
    <Pressable
      style={styles.bar}
      onPress={() => {
        setSelected(item);
        setisVisible(false);
      }}>
      <View style={styles.row}>
        <FastImage
          source={{uri: `https://flagsapi.com/${item.flagCode}/flat/64.png`}}
          style={styles.flag}
        />
        <MyText size={14}>{item.name}</MyText>
      </View>
    </Pressable>
  );

  const value = (values: object, key: string) => {
    // @ts-ignore
    return values[key];
  };

  const getUserData = async () => {
    const res = await getUserProfile();
    if (res.status) {
      console.log('userData', JSON.stringify(res.data));
      storage.set('userData', JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      setLoading(false);
      navigation.goBack();
    }
  };

  const handleUpdateProfile = async (data: ProfileData) => {
    const {profileImage: userProfileImage} = userData;
    const {profileImage: previewProfileImage, ...restPreviewData} = previewData;
    console.log('xxx', JSON.stringify(restPreviewData), JSON.stringify(data));
    console.log('chala ha update profile');
    setLoading(true);
    const emailDisable = restPreviewData.email === data.email; //if a phone no is being added
    const phoneDisable = restPreviewData.phoneNumber === data.phoneNumber; // if an email is being added
    const {profileImage, ...restData} = data;
    const {email, ...noEmailData} = restData;
    const {phoneNumber, ...noPhoneData} = restData;
    const {email: em, phoneNumber: pn, ...simpleData} = restData;
    console.log('phone no dalne ki koshish', emailDisable);
    console.log('email dalne ki koshish', phoneDisable);
    console.log(
      'konsa gaya ha =======>>>>>',
      emailDisable && phoneDisable
        ? simpleData
        : emailDisable
        ? noEmailData
        : phoneDisable
        ? noPhoneData
        : restData,
    );
    const res = await UpdateProfile(restData);
    if (res.status) {
      if (res.message == 'otp') {
        // navigation.navigate('VerificationScreen');
        navigation.navigate('VerificationScreen', {
          otphash: (res?.data as {otphash: string}).otphash,
          type: emailDisable ? 'phone' : 'email',
          email: phoneDisable ? noPhoneData.email : undefined,
          phone: emailDisable ? noEmailData.phoneNumber : undefined,
          fromProfile: true,
        });
      } else {
        if (
          Boolean(previewProfileImage) &&
          previewProfileImage == userProfileImage
        )
          await getUserData();
      }
    }
    if (
      Boolean(previewProfileImage) &&
      previewProfileImage !== userProfileImage
    ) {
      await UpdateProfileImage(previewProfileImage);
      if (res.status) {
        await getUserData();
      }
    }
    setLoading(false);
  };

  const handleEditable = (key: string) => {
    if (key == 'email' && Boolean(userData.email)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MyPopup height={'83%'} width={'80%'} visible={isVisible}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => setisVisible(false)}>
          <CloseBtn />
        </TouchableOpacity>
        <MyInput
          placeholder="Search here"
          inputStyle={{fontSize: 14}}
          style={{marginVertical: 20}}
          leftchild={<SearchGrey />}
        />
        <FlatList
          data={countryCodes}
          keyExtractor={item => item.code}
          renderItem={({item}) => renderCountryItem({item})}
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
        />
      </MyPopup>
      <OverlayLoader isShow={loading} />
      <MyView style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyAvatar
            edit
            size={60}
            source={{uri: previewData.profileImage}}
            getImage={image =>
              setPreviewData(state => ({...state, profileImage: image!}))
            }
          />
          <View style={{marginLeft: 21, marginBottom: 10}}>
            <MyText text="Display Name" textColor="#888888" size={12} />
            <GapView />
            <MyText
              text={
                previewData?.displayName ??
                previewData?.firstName + ' ' + previewData?.lastName
              }
              size={16}
            />
          </View>
        </View>
        <Formik
          initialValues={
            Boolean(previewData?.phoneNumber)
              ? {
                  ...previewData,
                  phoneNumber: previewData?.phoneNumber?.slice(3),
                }
              : previewData
          }
          validationSchema={ProifleSchema.profile}
          onSubmit={(values: ProfileData) => {
            const {phoneNumber, ...restValues} = values;
            if (Boolean(phoneNumber)) {
              console.log('phone is filled correct');

              handleUpdateProfile({
                phoneNumber: selected.code + phoneNumber,
                ...restValues,
              });
            } else {
              console.log('phone is empty');
              handleUpdateProfile({phoneNumber: '', ...restValues});
            }
            console.log('values', {
              phoneNumber: selected.code + phoneNumber,
              ...restValues,
            });
          }}>
          {({handleSubmit, handleChange, errors, values}) => {
            return (
              <>
                <View style={{marginTop: 15, marginBottom: 50}}>
                  {listData.map((item, index) => (
                    <View key={index}>
                      <Field
                        label={item.label}
                        editable={handleEditable(item.key)}
                        text={value(values, item.key)}
                        placeholder={item.placeholder}
                        theme={theme}
                        onChange={handleChange(item.key)}
                      />
                      {index < listData.length - 1 && <GapView />}
                      {errors.displayName && index == 0 && (
                        <>
                          <MyText
                            textColor="#F50000"
                            text={errors.displayName}
                          />
                        </>
                      )}
                      {errors.firstName && index == 1 && (
                        <>
                          <MyText textColor="#F50000" text={errors.firstName} />
                        </>
                      )}
                      {errors.lastName && index == 2 && (
                        <>
                          <MyText textColor="#F50000" text={errors.lastName} />
                        </>
                      )}
                      {errors.email && index == 3 && (
                        <>
                          <MyText textColor="#F50000" text={errors.email} />
                        </>
                      )}
                    </View>
                  ))}
                  <MyText
                    text="Phone Number"
                    style={{paddingLeft: 4, paddingVertical: 8}}
                    textColor={theme.colors.placeholder}
                  />
                  <View style={styles.middle}>
                    <Pressable
                      style={[
                        styles.left,
                        {
                          borderColor: theme.colors.border,
                        },
                      ]}
                      onPress={() => setisVisible(true)}>
                      <FastImage
                        source={{
                          uri: `https://flagsapi.com/${selected.flagCode}/flat/64.png`,
                        }}
                        style={styles.flag}
                      />
                      <MyText size={16}>{selected.code}</MyText>
                    </Pressable>
                    <MyInput
                      placeholder={'Enter Phone No'}
                      text={values.phoneNumber}
                      editable={Boolean(userData?.phoneNumber) ? false : true}
                      onChange={handleChange('phoneNumber')}
                      style={{width: '88%', marginBottom: 10}}
                    />
                  </View>
                  {errors.phoneNumber && (
                    <>
                      <MyText textColor="#F50000" text={errors.phoneNumber} />
                    </>
                  )}
                </View>
                <View style={{alignSelf: 'center', gap: 10}}>
                  <MyButton
                    label="Change Password"
                    style={{borderWidth: 1, borderColor: theme.colors.primary}}
                    textColor={theme.colors.primary}
                    backgroundColor={theme.colors.background}
                    labelStyle={{flex: 1}}
                    onPress={() => navigation.navigate('EnterPassword')}
                  />
                  <MyButton
                    label="Update"
                    labelStyle={{flex: 1}}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </MyView>
    </ScrollView>
  );
}

const Field = ({
  label,
  placeholder,
  theme,
  text,
  editable,
  onChange,
}: {
  label: string;
  text?: string;
  placeholder: string;
  theme: MyTheme;
  editable: boolean | undefined;
  onChange?: (text: string) => void;
}) => {
  return (
    <View>
      <MyInput
        label={label}
        placeholder={placeholder}
        editable={editable}
        style={{paddingHorizontal: 0, borderBottomWidth: 0}}
        text={text}
        onChange={onChange}
        inputStyle={{
          paddingLeft: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginTop: 15,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  middle: {
    flexDirection: 'row',
    width: '80%',
    gap: 10,
  },
  left: {
    width: 100,
    height: 50,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {width: 40, height: 28.57, borderRadius: 10, marginRight: 20},
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
