import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {BubbleIcon, GapView, MyButton, MyInput, MyText} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

type EnterPasswordNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function EnterPassword() {
  const navigation =
    useNavigation<EnterPasswordNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;

  const handleSignIn = () => {
    navigation.navigate('Draw');
  };

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
          <MyInput placeholder="Password" password />
          <MyInput placeholder="Confirm Password" password />
        </View>
        <GapView length={65} />
        <MyButton
          label="Submit"
          style={styles.rstPwd}
          onPress={() => navigation.navigate('Settings')}
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
