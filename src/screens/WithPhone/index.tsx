import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';

import {MyButton, MyInput, MyPopup, MyText} from '../../components';
import {CloseBtn, MLSlogo, SearchGrey} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

type WithPhoneNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'WithPhone'
>;

export default function WithPhone() {
  const navigation = useNavigation<WithPhoneNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [isVisible, setisVisible] = useState(false);
  const [selected, setSelected] = useState('GB');

  const countries = [
    {name: 'United Kingdom', code: 'GB', language: 'English'},
    {name: 'Greece', code: 'GR', language: 'Greek'},
    {name: 'India', code: 'IN', language: 'Hindi'},
    {name: 'Pakistan', code: 'PK', language: 'Urdu'},
    {name: 'Spain', code: 'ES', language: 'Spanish'},
    {name: 'United Arab Emirates', code: 'AE', language: 'Arabic'},
    {name: 'China', code: 'CN', language: 'Chinese'},
    {name: 'Russian Federation', code: 'RU', language: 'Russian'},
    {name: 'Indonesia', code: 'ID', language: 'Indonesian'},
    {name: 'Japan', code: 'JP', language: 'Japanese'},
    {name: 'Sri Lanka', code: 'LK', language: 'Sinhala'},
    {name: 'Germany', code: 'GE', language: 'German'},
    {name: 'Turkey', code: 'TR', language: 'Turkish'},
  ];

  const renderLanguageItem = ({
    item,
    theme,
  }: {
    item: {name: string; code: string; language: string};
    theme?: MyTheme;
  }) => (
    <Pressable style={styles.bar} onPress={() => setSelected(item.code)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: `https://flagsapi.com/${item.code}/flat/64.png`}}
          style={styles.flag}
        />
        <MyText size={14}>{item.name}</MyText>
      </View>
    </Pressable>
  );

  return (
    <>
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <MLSlogo />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 10,
            marginTop: 77,
            marginBottom: 50,
          }}>
          <Pressable
            style={{
              width: 100,
              height: 50,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              //   backgroundColor: 'yellow',
            }}
            onPress={() => setisVisible(true)}>
            <Image
              source={{uri: `https://flagsapi.com/IN/flat/64.png`}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                marginRight: 20,
              }}
            />
            <MyText size={16}>+92</MyText>
          </Pressable>
          <MyInput placeholder="Phone Number" />
        </View>
        <MyButton
          label="Get code"
          onPress={() => navigation.navigate('VerificationScreen')}
        />
      </View>
      <MyPopup height={'83%'} width={'80%'} visible={isVisible}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            left: 280,
          }}
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
          renderItem={({item}) => renderLanguageItem({item})}
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
        />
      </MyPopup>
    </>
  );
}

const SelectFlagModal = () => {
  return (
    <Modal visible={true} transparent>
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          borderWidth: 1,
          backgroundColor: '#00000042',
          justifyContent: 'center',
        }}>
        <MyInput placeholder="Search here" leftchild={<SearchGrey />} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
  },
  flag: {width: 40, height: 28.57, borderRadius: 10, marginRight: 20},
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 42,
    justifyContent: 'space-between',
  },
});
