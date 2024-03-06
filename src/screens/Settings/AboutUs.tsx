import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {MyText} from '../../components';
import {useSelector} from 'react-redux';

export default function AboutUs() {
  const aboutUs: string = useSelector((store: any) => store.static.aboutUs);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {aboutUs && (
        <View style={styles.container}>
          <MyText style={styles.lineSpacing}>{aboutUs}</MyText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lineSpacing: {lineHeight: 30, marginBottom: 30},
  container: {marginHorizontal: 20, marginTop: 18},
});
