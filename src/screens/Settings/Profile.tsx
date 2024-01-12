import React from 'react';
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
import {useTheme} from '@react-navigation/native';

const listData = [
  {label: 'Display Name', placeholder: 'Jimmy Neutron'},
  {label: 'First Name', placeholder: 'Jimmy'},
  {label: 'Last Name', placeholder: 'Neutron'},
  {label: 'Country', placeholder: 'Cyprus'},
  {label: 'State / Province', placeholder: 'Limassol'},
  {label: 'City', placeholder: 'Limassol'},
  {label: 'Apartment', placeholder: 'Zephyt Residences Georgious A'},
  {label: 'Block', placeholder: '5'},
  {label: 'Street name', placeholder: 'Colony 1'},
  {label: 'Zip code', placeholder: '79535'},
];

export default function Profile() {
  const theme = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MyView style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyAvatar
            edit
            size={60}
            source={{uri: 'https://i.pravatar.cc/160?img=13'}}
          />
          <View style={{marginLeft: 21, marginBottom: 10}}>
            <MyText text="Email / Username" textColor="#888888" size={12} />
            <GapView />
            <MyText text="Jimmyneutron123@gmail.com" size={16} />
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
        <View style={{marginVertical: 20, alignSelf: 'center'}}>
          <MyButton
            label="Update"
            style={{width: 120}}
            labelStyle={{flex: 1}}
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
