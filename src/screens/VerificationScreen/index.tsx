import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {MyButton, MyText} from '../../components';
import {MLSlogo} from '../../assets';
import {useNavigation, useTheme} from '@react-navigation/native';
import {MyTheme} from '../../types';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const theme = useTheme() as MyTheme;
  return (
    <>
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <MLSlogo />
        <View style={styles.middle}>
          {/*dark theme color needed*/}
          <MyText text="Verification Code" size={20} textColor="#666666" />
          <MyText
            text="Please enter the code we have sent to the email Muh**********@gmail.com"
            size={12}
            textColor={theme.colors.placeholder}
          />
          <View style={styles.boxes}>
            <BoxInput />
            <BoxInput />
            <BoxInput />
            <BoxInput />
          </View>
        </View>
        <View style={styles.bottom}>
          <MyButton
            label="Submit"
            onPress={() => navigation.navigate('GetNotified')}
          />
          <TouchableOpacity>
            <MyText
              text="Resend Code"
              size={10}
              style={{textDecorationLine: 'underline'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const BoxInput = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="-"
        placeholderTextColor={'#126FAA'}
        style={styles.input}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        maxLength={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    borderWidth: 1,
    borderColor: '#49ACE1',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    paddingBottom: 120,
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    color: '#49ACE1',
  },
  boxes: {flexDirection: 'row', gap: 15},
  bottom: {
    alignItems: 'center',
    alignContent: 'center',
    gap: 13,
    width: '100%',
  },
});
