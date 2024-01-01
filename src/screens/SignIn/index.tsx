import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {Google, MLSlogo, Pencil, Phone} from '../../assets';

export default function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      showToast('Please fill all fields', 'error');
    } else if (username !== password) {
      showToast('Warning: Inavlid username or password', 'error');
    }
  };

  const showToast = (message: string, type?: 'success' | 'error') => {
    Toast.show({
      type: type,
      position: 'top',
      text1: message,
      topOffset: 0,
    });
  };

  return (
    <>
      <View style={styles.main}>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput
            placeholder="Username"
            value={username}
            onChange={text => {
              setUsername(text);
              console.log(username);
            }}
          />
          <MyInput
            placeholder="Password"
            password
            value={password}
            onChange={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.rstPwd}
          onPress={() => navigation.navigate('ResetPassword')}>
          <MyText
            textColor="#49ACE1"
            style={styles.decoration}
            text="Reset Password"
            weight="500"
          />
        </TouchableOpacity>
        <MyButton
          label="Sign In"
          style={styles.rstPwd}
          onPress={handleSignIn}
        />
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
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
