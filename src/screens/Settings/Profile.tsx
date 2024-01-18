import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  GapView,
  MyAvatar,
  MyButton,
  MyInput,
  MyPopup,
  MyText,
  MyView,
} from '../../components';
import {MyTheme} from '../../types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CloseBtn, SearchGrey} from '../../assets';
import {FlatList} from 'react-native-gesture-handler';
import {countries} from '../../constants';
import {Formik} from 'formik';
import {ProifleSchema} from '../../constants/validations/schema';

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
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function Profile() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<ProfileNavigationProps['navigation']>();
  const [isVisible, setisVisible] = useState(false);

  const renderCountryItem = ({
    item,
    theme,
  }: {
    item: {name: string; code: string; language: string};
    theme?: MyTheme;
  }) => (
    <Pressable style={styles.bar} onPress={() => setisVisible(false)}>
      <View style={styles.row}>
        <Image
          source={{uri: `https://flagsapi.com/${item.code}/flat/64.png`}}
          style={styles.flag}
        />
        <MyText size={14}>{item.name}</MyText>
      </View>
    </Pressable>
  );

  const value = (values: object, key: string) => {
    //@ts-ignore
    return values[key];
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MyView style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyAvatar
            edit
            size={60}
            source={{uri: 'https://i.pravatar.cc/160?img=13'}}
          />
          <View style={{marginLeft: 21, marginBottom: 10}}>
            <MyText text="Display Name" textColor="#888888" size={12} />
            <GapView />
            <MyText text={listData[0].placeholder} size={16} />
          </View>
        </View>
        <Formik
          initialValues={{
            displayName: 'Jimmy Neutron',
            firstName: 'Jimmy',
            lastName: 'Neutron',
            email: '',
            phone: '0123456789',
          }}
          validationSchema={ProifleSchema.profile}
          onSubmit={() =>
            navigation.navigate('D1Nav', {screen: 'EnterPassword'})
          }>
          {({handleSubmit, handleChange, errors, values}) => {
            return (
              <>
                <View style={{marginTop: 15}}>
                  {listData.map((item, index) => (
                    <View key={index}>
                      <Field
                        label={item.label}
                        text={value(values, item.key)}
                        placeholder={item.placeholder}
                        theme={theme}
                        onChange={handleChange(item.key)}
                      />
                      {index < listData.length - 1 && <GapView />}
                      {errors.displayName && index == 0 && (
                        <>
                          <GapView />
                          <MyText
                            textColor="#F50000"
                            text={errors.displayName}
                          />
                        </>
                      )}
                      {errors.firstName && index == 1 && (
                        <>
                          <GapView />
                          <MyText textColor="#F50000" text={errors.firstName} />
                        </>
                      )}
                      {errors.lastName && index == 2 && (
                        <>
                          <GapView />
                          <MyText textColor="#F50000" text={errors.lastName} />
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
                      <Image
                        source={{uri: `https://flagsapi.com/PK/flat/64.png`}}
                        style={styles.flag}
                      />
                      <MyText size={16}>+92</MyText>
                    </Pressable>
                    <MyInput placeholder="0123456789" style={{width: '88%'}} />
                  </View>
                </View>
                <View style={{alignSelf: 'center', marginTop: 85}}>
                  <MyButton
                    label="Update"
                    style={{width: 120}}
                    labelStyle={{flex: 1}}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
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
            data={countries}
            keyExtractor={item => item.code}
            renderItem={({item}) => renderCountryItem({item})}
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
          />
        </MyPopup>
      </MyView>
    </ScrollView>
  );
}

const Field = ({
  label,
  placeholder,
  theme,
  text,
  onChange,
}: {
  label: string;
  text?: string;
  placeholder: string;
  theme: MyTheme;
  onChange?: (text: string) => void;
}) => {
  return (
    <View>
      <MyInput
        label={label}
        placeholder={placeholder}
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
    marginBottom: 50,
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
