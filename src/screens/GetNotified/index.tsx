import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyButton, MyText} from '../../components';
import {Bell, NotificationFrame, Phone} from '../../assets';

export default function GetNotified() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.main}>
        <View style={styles.container}>
          <Bell />
          <MyText
            text="Get notified!"
            size={20}
            textColor="#424242"
            weight="500"
          />
          <MyText style={styles.text} size={16} textColor="#666666">
            We will send you notifications when new products are available or
            offers are available. You can always turn it off in the settings.
          </MyText>
          <NotificationFrame />
        </View>

        <View style={styles.buttons}>
          <MyButton
            label="Skip"
            style={[styles.button, {backgroundColor: 'transparent'}]}
            textColor="#49ACE1"
            onPress={() => navigation.navigate('BottomTab')}
          />
          <MyButton
            label="I'm in"
            style={styles.button}
            onPress={() => navigation.navigate('BottomTab')}
          />
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
    justifyContent: 'space-between',
  },
  text: {textAlign: 'center'},
  buttons: {
    width: '100%',
    flexDirection: 'row',
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {width: 120},
  container: {alignItems: 'center', gap: 20},
});
