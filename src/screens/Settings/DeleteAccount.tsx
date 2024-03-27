import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {
  MyButton,
  MyInput,
  MyPopup,
  MyText,
  OverlayLoader,
} from '../../components';
import {MyTheme} from '../../types';
import {DeleteUserAccount} from './utils';
import {setUserData, setUserToken} from '../../features/user/userSlice';
import {storage} from '../../app/mmkv';
import {setTheme} from '../../features/theme/themeSlice';

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

export default function DeleteAccount() {
  const theme = useTheme() as MyTheme;
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [deleteText, setDeleteText] = useState('');

  const handleDeleteAccount = async () => {
    setLoading(true);
    const res = await DeleteUserAccount();
    if (res.status) {
      dispatch(setUserToken(''));
      dispatch(setUserData(null));
      dispatch(setTheme(true));
      storage.set('userToken', '');
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <OverlayLoader isShow={loading} />
      <View style={styles.container}>
        <View>
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              description={section.description}
            />
          ))}

          <MyInput
            width={'100%'}
            text={deleteText}
            onChange={val => setDeleteText(val)}
            style={styles.input}
          />
        </View>
        <MyButton
          style={{alignSelf: 'flex-end'}}
          label="Delete"
          disabled={deleteText !== 'PERMANENTLY DELETE'}
          backgroundColor={
            deleteText == 'PERMANENTLY DELETE'
              ? theme.colors.primary
              : '#d4d4d4'
          }
          onPress={handleDeleteAccount}
        />
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
    height: '100%',
    gap: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {height: 50, borderWidth: 1, borderRadius: 10},
});
