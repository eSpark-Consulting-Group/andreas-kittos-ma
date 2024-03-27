import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import {
  BubbleIcon,
  GapView,
  MyButton,
  MyInput,
  MyText,
  OverlayLoader,
} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {ChangePassword} from './utils';

type EnterPasswordNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function EnterPassword() {
  const navigation =
    useNavigation<EnterPasswordNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;
  const [loading, setLoading] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');

  const handleChangePass = async () => {
    if (pass.length > 5) {
      if (pass === conPass) {
        setLoading(true);
        const res = await ChangePassword({
          newPassword: pass,
          oldPassword: oldPass,
        });
        if (res.status) {
          navigation.goBack();
        }
        setLoading(false);
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Passwords do not match',
          topOffset: 0,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Password Must be at least 6 characters',
        topOffset: 0,
      });
    }
  };
  return (
    <ScrollView>
      <OverlayLoader isShow={loading} />
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
            placeholder="Old Password"
            password
            text={oldPass}
            onChange={val => setOldPass(val)}
          />
          <MyInput
            placeholder="Password"
            password
            text={pass}
            onChange={val => setPass(val)}
          />
          <MyInput
            placeholder="Confirm Password"
            password
            text={conPass}
            onChange={val => setConPass(val)}
          />
        </View>
        <GapView length={65} />
        <MyButton
          label="Submit"
          style={styles.rstPwd}
          onPress={handleChangePass}
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
