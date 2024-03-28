import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RenderHtml, {MixedStyleDeclaration} from 'react-native-render-html';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {MyText} from '../../components';
import {WINDOW_WIDTH} from '../../constants';

export default function AboutUs() {
  const aboutUs: string = useSelector((store: any) => store.static.aboutUs);
  const theme = useTheme();
  const source = {
    html: aboutUs,
  };

  const mixedStyle:
    | Readonly<Record<string, MixedStyleDeclaration>>
    | undefined = {
    body: {
      whiteSpace: 'normal',
      color: theme.colors.text,
    },
    p: {
      color: theme.colors.text,
    },
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {aboutUs.length > 0 ? (
        <View style={styles.container}>
          <RenderHtml
            source={source}
            contentWidth={WINDOW_WIDTH}
            tagsStyles={mixedStyle}
          />
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
