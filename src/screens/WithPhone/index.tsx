import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BubbleIcon, MyButton, MyInput, MyPopup, MyText} from '../../components';
import {Back, CloseBtn, MLSlogo, SearchGrey} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme} from '../../types';
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

  const renderCountryItem = ({
    item,
    theme,
  }: {
    item: {name: string; code: string; language: string};
    theme?: MyTheme;
  }) => (
    <Pressable style={styles.bar} onPress={() => setSelected(item.code)}>
      <View style={styles.row}>
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
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.navigate('SignIn')}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
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
          <MyInput placeholder="Phone Number" />
        </View>
        <MyButton
          label="Get code"
          onPress={() => navigation.navigate('VerificationScreen')}
        />
      </View>
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
    </>
  );
}

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
  row: {flexDirection: 'row', alignItems: 'center'},
  middle: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginTop: 77,
    marginBottom: 50,
  },
  left: {
    width: 100,
    height: 50,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 20,
    left: 280,
  },
});
