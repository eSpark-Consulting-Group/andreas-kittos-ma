import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Back, Key} from '../../assets';
import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function ResetPassword() {
  const navigation = useNavigation();
  return (
    <View style={[styles.main, {gap: 20}]}>
      <Pressable
        style={{top: 10, left: 20, position: 'absolute'}}
        onPress={() => navigation.navigate('SignIn')}>
        <BubbleIcon>
          <Back />
        </BubbleIcon>
      </Pressable>
      <MyText
        text="Reset Your Password"
        size={25}
        textColor="#49ACE1"
        weight="500"
        style={{marginTop: 219, marginBottom: 20}}
      />
      <Key />
      <MyInput placeholder="Your username or email" />
      <MyButton label="Get password link" />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
    backgroundColor: '#fff',
  },
});
