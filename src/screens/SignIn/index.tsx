import React, {useState} from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {MyButton, MyInput, MyText} from '../../components';

import {Back, EyeClosed, Google, MLSlogo, Pencil, Phone} from '../../assets';
import {useTheme} from '@react-navigation/native';

export default function SignIn() {
  return (
    <>
      <View style={styles.main}>
        <MLSlogo />
        <View>
          <MyInput placeholder="Username" />
          <MyInput placeholder="Password" password />
        </View>
        <TouchableOpacity>
          <MyText
            textColor="#49ACE1"
            style={styles.decoration}
            text="Reset Password"
          />
        </TouchableOpacity>
        <MyButton label="Sign In" style={{}} />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <MyText style={styles.or} text="OR" textColor="#888888" />
          <View style={styles.line} />
        </View>
        <View style={{flexDirection: 'row', gap: 20}}>
          <IconButton google />
          <IconButton phone />
        </View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <MyText text="Don’t have an account?" />
          <TouchableOpacity>
            <MyText
              text="Sign up"
              textColor="#49ACE1"
              weight="500"
              style={{textDecorationLine: 'underline'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

//temporary

interface IconButtonProps {
  google?: boolean;
  phone?: boolean;
  pencil?: boolean;
  back?: boolean;
}

function IconButton({google, back, phone, pencil}: IconButtonProps) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderColor: '#E4E4E4',
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {back && <Back />}
      {google && <Google />}
      {phone && <Phone />}
      {pencil && <Pencil />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 30,
    flex: 1,
  },
  line: {
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
    width: '25%',
  },
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {width: 20, height: 17},
});
