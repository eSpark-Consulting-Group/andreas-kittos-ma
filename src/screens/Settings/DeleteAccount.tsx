import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyButton, MyInput, MyPopup, MyText} from '../../components';
import {MyTheme} from '../../types';

export default function DeleteAccount() {
  const theme = useTheme() as MyTheme;
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    {
      description:
        'Are you sure you want to delete your account? Please read how account deletion will affect',
    },
    {
      title: 'Account',
      description:
        'Deleting your account removes personal information from our database.',
    },
    {
      title: 'Email Subscription',
      description:
        'Deleting your account will unsubscribe you from all mailings lists.',
    },
    {
      title: 'Confirm Account Deletion',
      description: 'Enter PERMANENTLY DELETE to confirm:',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              description={section.description}
            />
          ))}

          <MyInput width={'100%'} style={styles.input} />
        </View>
        <MyButton label="Delete" onPress={() => setIsVisible(true)} />
      </View>
      <MyPopup
        title="Account Deleted"
        message1="Account deleted successfully. Your session has been expired."
        buttons={[
          {
            id: 1,
            label: 'Okay',
            backgroundColor: 'transparent',
            textColor: theme.colors.primary,
            onPress: () => setIsVisible(false),
          },
        ]}
        visible={isVisible}
      />
    </ScrollView>
  );
}

const Section = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => (
  <View style={{marginBottom: 20}}>
    <MyText weight="600" size={16} style={styles.lineSpacing}>
      {title}
    </MyText>
    <MyText style={styles.lineSpacing}>{description}</MyText>
  </View>
);

const styles = StyleSheet.create({
  lineSpacing: {lineHeight: 30},
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {height: 50, borderWidth: 1, borderRadius: 10},
});
