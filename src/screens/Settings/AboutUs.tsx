import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';

import {MyText} from '../../components';
import {useSelector} from 'react-redux';
import {WINDOW_WIDTH} from '../../constants';

export default function AboutUs() {
  const aboutUs: string = useSelector((store: any) => store.static.aboutUs);
  const source = {
    html: aboutUs,
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {aboutUs.length > 0 ? (
        <View style={styles.container}>
          <RenderHTML source={source} contentWidth={WINDOW_WIDTH} />
        </View>
      ) : (
        <View style={styles.container}>
          <MyText style={{textAlign: 'center'}}>No About Us added yet!</MyText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lineSpacing: {lineHeight: 30, marginBottom: 30},
  container: {marginHorizontal: 20, marginTop: 18},
});
