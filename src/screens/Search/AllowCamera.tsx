import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {MyButton, MyText} from '../../components';
import {Camera} from '../../assets';
import {MyTheme} from '../../types';

export default function AllowCamera() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation();

  return (
    <View style={styles({theme}).main}>
      <View style={styles({}).camera}>
        <Camera />
      </View>
      <View style={styles({theme}).container}>
        <View style={styles({}).text}>
          <MyText text="Allow Camera access?" weight="600" size={18} />
          <MyText text="We need camera access to scan for QR code or Bar code." />
        </View>
        <View style={styles({}).buttons}>
          <MyButton label="Allow" />
          <MyButton
            label="Decline"
            style={styles({theme}).button}
            textColor={theme.colors.negative}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = ({theme}: {theme?: MyTheme}) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme?.colors.background,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    camera: {marginTop: 195},
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '45%',
      backgroundColor: theme?.dark ? theme.colors.card : '#FAFAFA',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 21,
    },
    text: {alignItems: 'center', gap: 10},
    buttons: {gap: 10, width: 320},
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme?.colors.border,
    },
  });
