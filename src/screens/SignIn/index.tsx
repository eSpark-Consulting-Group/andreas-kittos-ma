import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {Google, MLSlogo, Phone} from '../../assets';

export default function SignIn() {
  return (
    <>
      <View style={styles.main}>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput placeholder="Username" />
          <MyInput placeholder="Password" password />
        </View>
        <TouchableOpacity style={styles.rstPwd}>
          <MyText
            textColor="#49ACE1"
            style={styles.decoration}
            text="Reset Password"
            weight="500"
          />
        </TouchableOpacity>
        <MyButton label="Sign In" style={styles.rstPwd} />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <MyText style={styles.or} text="OR" textColor="#888888" />
          <View style={styles.line} />
        </View>
        <View style={styles.bubbles}>
          <BubbleIcon size={40} plain>
            <Google />
          </BubbleIcon>
          <BubbleIcon size={40} plain>
            <Phone />
          </BubbleIcon>
        </View>
        <View style={styles.rowText}>
          <MyText text="Don’t have an account?" />
          <TouchableOpacity onPress={() => console.log('navigate to sign Up')}>
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

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
    backgroundColor: '#fff',
  },
  line: {
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
    width: '25%',
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {width: 20, height: 17},
  bubbles: {flexDirection: 'row', gap: 20, marginVertical: 30},
  rowText: {flexDirection: 'row', gap: 5},
});
