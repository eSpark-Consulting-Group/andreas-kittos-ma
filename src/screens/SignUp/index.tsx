import React, {useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {BubbleIcon, MyButton, MyInput, MyText} from '../../components';
import {Back, MLSlogo} from '../../assets';

export default function SignUp() {
  const navigation = useNavigation();

  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignUp = () => {
    if (!fName || !lName || !pw || !confirmPw || !email) {
      showToast('Please fill all fields', 'error');
    } else if (!email.includes('@')) {
      showToast('Warning: Invalid email address', 'error');
    } else if (pw !== confirmPw) {
      showToast('Warning: Passwords do not match', 'error');
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
        <Pressable
          style={{top: 10, left: 20, position: 'absolute'}}
          onPress={() => navigation.navigate('SignIn')}>
          <BubbleIcon>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput placeholder="First Name" onChange={text => setFname(text)} />
          <MyInput placeholder="Last Name" onChange={text => setLname(text)} />
          <MyInput
            placeholder="Enter your email"
            onChange={text => setEmail(text)}
          />
          <MyInput
            placeholder="Enter your Password"
            password
            onChange={text => setPw(text)}
          />
          <MyInput
            placeholder="Confirm password"
            password
            onChange={text => setConfirmPw(text)}
          />
        </View>
        <TouchableOpacity style={[styles.rstPwd, styles.prvPolicy]}>
          <MyText text="By signing up, you agree to our " size={12} />
          <MyText
            textColor="#49ACE1"
            style={styles.decoration}
            text="Privacy policy"
            size={12}
            weight="500"
          />
        </TouchableOpacity>
        <MyButton
          label="Sign Up"
          style={styles.rstPwd}
          onPress={handleSignUp}
        />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <MyText style={styles.or} text="OR" textColor="#888888" />
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.rowText}>
          <MyText
            text="Sign in to your account"
            textColor="#49ACE1"
            weight="500"
            style={{textDecorationLine: 'underline'}}
          />
        </TouchableOpacity>
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
    width: '40%',
  },
  inputs: {gap: 12, marginTop: 72},
  rstPwd: {marginVertical: 20},
  prvPolicy: {
    alignSelf: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  decoration: {textDecorationLine: 'underline'},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {width: 20, height: 17},
  rowText: {flexDirection: 'row', gap: 5, marginTop: 30},
});
