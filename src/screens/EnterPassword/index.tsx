import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';

import {BubbleIcon, GapView, MyButton, MyInput, MyText} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import Toast from 'react-native-toast-message';

type EnterPassNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'EnterPassword'
>;

export default function EnterPassword() {
  const navigation = useNavigation<EnterPassNavigationProps['navigation']>();
  const route = useRoute<EnterPassNavigationProps['route']>();
  const theme = useTheme() as MyTheme;
  const {phoneNumber} = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScrollView>
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.goBack()}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />

        <View style={styles.inputs}>
          <MyText
            text="Please enter your password!"
            style={{textAlign: 'center', marginBottom: 15}}
            size={16}
          />
          <MyInput
            placeholder="Password"
            password
            onChange={e => setPassword(e)}
          />
          <MyInput
            placeholder="Confirm Password"
            password
            onChange={e => setConfirmPassword(e)}
          />
        </View>
        <GapView length={65} />
        <MyButton
          label="Submit"
          style={styles.rstPwd}
          onPress={() => {
            if (password.length < 6) {
              Toast.show({
                text1:
                  password.length < 6
                    ? 'Password must be greater than 5 characters'
                    : 'Passwords do not match',
                type: 'error',
              });
            } else if (password === confirmPassword) {
              navigation.navigate('EnterName', {phoneNumber, password});
            } else {
              Toast.show({
                text1: 'Passwords not match',
                type: 'error',
              });
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingVertical: 54,
    paddingHorizontal: 32,
    flex: 1,
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
});
