import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  BubbleIcon,
  MyButton,
  MyInput,
  MyPopup,
  MyText,
  OverlayLoader,
} from '../../components';
import {Back, CloseBtn, MLSlogo, SearchGrey} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {countryCodes} from '../../constants';
import {getPhoneOTP} from './utils';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';

type WithPhoneNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'WithPhone'
>;

export default function WithPhone() {
  const navigation = useNavigation<WithPhoneNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [selected, setSelected] = useState<{
    name: string;
    code: string;
    flagCode: string;
  }>({name: 'Cyprus', code: '+357', flagCode: 'CY'});

  const getCodeAPI = async () => {
    setIsLoading(true);
    if (
      number.length >= 8 &&
      number.length <= 10 &&
      Number(number).toString() != NaN.toString()
    ) {
      const res = await getPhoneOTP({
        phoneNumber: selected.code + number,
      });
      if (res.status) {
        navigation.navigate('VerificationScreen', {
          type: 'phone',
          otphash: res?.otphash as string,
          emailPhone: selected.code + number,
        });
      }
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        topOffset: 0,
      });
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <OverlayLoader isShow={isLoading} />
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
            <FastImage
              source={{
                uri: `https://flagsapi.com/${selected.flagCode}/flat/64.png`,
              }}
              style={styles.flag}
            />
            <MyText size={16}>{selected.code}</MyText>
          </Pressable>
          <MyInput
            placeholder="Phone Number"
            text={number}
            onChange={text => setNumber(text)}
            keyboardType="decimal-pad"
            style={{flex: 1}}
          />
        </View>
        <MyButton label="Get code" onPress={() => getCodeAPI()} />
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
          data={countryCodes}
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
    right: 20,
  },
});
