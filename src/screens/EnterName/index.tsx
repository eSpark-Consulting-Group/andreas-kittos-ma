import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {BubbleIcon, GapView, MyButton, MyInput, MyText} from '../../components';
import {Back, MLSlogo} from '../../assets';
import {MyTheme} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

type EnterNameNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'EnterName'
>;

export default function EnterName() {
  const navigation = useNavigation<EnterNameNavigationProps['navigation']>();
  const theme = useTheme() as MyTheme;

  return (
    <ScrollView>
      <View style={[styles.main, {backgroundColor: theme.colors.background}]}>
        <Pressable style={{top: 10, left: 20, position: 'absolute'}} disabled>
          <BubbleIcon onPress={() => navigation.navigate('WithPhone')}>
            <Back />
          </BubbleIcon>
        </Pressable>
        <MLSlogo />
        <View style={styles.inputs}>
          <MyInput placeholder="First Name" />
          <MyInput placeholder="Last Name" />
        </View>
        <GapView length={65} />
        <MyButton
          label="Submit"
          style={styles.rstPwd}
          onPress={() => navigation.navigate('GetNotified')}
        />
        <View style={styles.orContainer}>
          <View
            style={[styles.line, {borderBottomColor: theme.colors.border}]}
          />
          <MyText
            style={styles.or}
            text="OR"
            textColor={theme.colors.placeholder}
          />
          <View
            style={[styles.line, {borderBottomColor: theme.colors.border}]}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <MyText
            text="Sign in to your account"
            textColor={theme.colors.primary}
            weight="500"
            style={{textDecorationLine: 'underline', marginTop: 30}}
          />
        </TouchableOpacity>
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
  line: {
    borderBottomWidth: 1,
    flex: 1,
  },
  inputs: {gap: 15, marginTop: 72},
  rstPwd: {marginVertical: 20},
  orContainer: {flexDirection: 'row', gap: 18, height: 17},
  or: {paddingHorizontal: 20, height: 17},
});
