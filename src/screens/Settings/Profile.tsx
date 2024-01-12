import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  GapView,
  MyAvatar,
  MyButton,
  MyInput,
  MyText,
  MyView,
} from '../../components';
import {MyTheme} from '../../types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const listData = [
  {label: 'Display Name', placeholder: 'Jimmy Neutron'},
  {label: 'First Name', placeholder: 'Jimmy'},
  {label: 'Last Name', placeholder: 'Neutron'},
  {label: 'Email', placeholder: 'Enter Email'},
  {label: 'Phone Number', placeholder: '0123456789'},
];

type ProfileNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function Profile() {
  const theme = useTheme();
  const navigation = useNavigation<ProfileNavigationProps['navigation']>();

  return (
    <ScrollView>
      <MyView style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyAvatar
            edit
            size={60}
            source={{uri: 'https://i.pravatar.cc/160?img=13'}}
          />
          <View style={{marginLeft: 21, marginBottom: 10}}>
            <MyText text="Display Name" textColor="#888888" size={12} />
            <GapView />
            <MyText text={listData[0].placeholder} size={16} />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          {listData.map((item, index) => (
            <View key={index}>
              <Field
                label={item.label}
                placeholder={item.placeholder}
                theme={theme}
              />
              {index < listData.length - 1 && <GapView />}
            </View>
          ))}
        </View>
        <View style={{alignSelf: 'center', marginTop: 130}}>
          <MyButton
            label="Update"
            style={{width: 120}}
            labelStyle={{flex: 1}}
            onPress={() =>
              navigation.navigate('D1Nav', {screen: 'EnterPassword'})
            }
          />
        </View>
      </MyView>
    </ScrollView>
  );
}

const Field = ({
  label,
  placeholder,
  theme,
}: {
  label: string;
  placeholder: string;
  theme: MyTheme;
}) => {
  return (
    <View>
      <MyInput
        label={label}
        placeholder={placeholder}
        style={{paddingHorizontal: 0, borderBottomWidth: 0}}
        inputStyle={{
          paddingLeft: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginTop: 15,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
