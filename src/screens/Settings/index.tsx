import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {
  BubbleIcon,
  GapView,
  MyAvatar,
  MyBanner,
  MyText,
  MyView,
} from '../../components';
import {
  EditBubble,
  SettingBanner,
  SettingBell,
  SettingDelete,
  SettingFile,
  SettingGlobe,
  SettingHeart,
  SettingInfo,
  SettingLogout,
  SettingStar,
  SettingTheme,
  SettingTime,
} from '../../assets';
import {colors} from '../../theme';

const listData = [
  {
    leftIcon: <SettingHeart />,
    label: 'My WishList',
    right: <Feather name="chevron-right" size={14} />,
  },
  {
    leftIcon: <SettingBell />,
    label: 'Get Notifications',
    right: null,
  },
  {
    leftIcon: <SettingGlobe />,
    label: 'Languages',
    right: (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MyText text="English" textColor={colors.light.primary} />
        <GapView mode="horizontal" />
        <Feather name="chevron-right" size={14} />
      </View>
    ),
  },
  {
    leftIcon: <SettingTheme />,
    label: 'Appearance',
    right: <MyText text="Light Theme" style={{opacity: 0.7}} />,
  },
  {
    leftIcon: <SettingTime />,
    label: 'Order History',
    right: <Feather name="chevron-right" size={14} />,
  },
  {
    leftIcon: <SettingStar />,
    label: 'Rate the app',
    right: <Feather name="chevron-right" size={14} />,
  },
  {
    leftIcon: <SettingFile />,
    label: 'Privacy Policy',
    right: <Feather name="chevron-right" size={14} />,
  },
  {
    leftIcon: <SettingInfo />,
    label: 'About US',
    right: <Feather name="chevron-right" size={14} />,
  },
  {
    leftIcon: <SettingDelete />,
    label: 'Delete Account',
    right: null,
  },
];

export default function Settings() {
  const theme = useTheme();

  return (
    <ScrollView style={{flex: 1}}>
      <MyView>
        <MyBanner
          background={SettingBanner}
          title1="Effortless Laundry Solutions!"
          title2="Doorstep Delivery Services"
        />
        <GapView length={20} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyAvatar
              size={60}
              edit
              source={{uri: 'https://i.pravatar.cc/160?img=13'}}
            />
            <View style={{marginLeft: 10}}>
              <MyText text="Jimmy Neutron" size={16} weight="500" />
              <MyText text="jimmyneutron123@gmail.com" size={14} weight="400" />
            </View>
          </View>
          <BubbleIcon plain size={40}>
            <EditBubble />
          </BubbleIcon>
        </View>
        <GapView length={20} />
        <Item label="Logout" leftIcon={<SettingLogout />} theme={theme} />
        <GapView length={30} />
        <MyText text="General Settings" size={18} weight="600" />
        {listData.map((item, index) => (
          <Item
            label={item.label}
            leftIcon={item.leftIcon}
            theme={theme}
            right={item.right}
          />
        ))}
      </MyView>
    </ScrollView>
  );
}

const Item = ({
  leftIcon,
  label,
  right,
  theme,
}: {
  leftIcon?: React.ReactNode;
  label?: string;
  right?: React.ReactNode;
  theme: Theme;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon}
        <GapView mode="horizontal" length={25} />
        <MyText text={label} size={14} weight="400" />
      </View>
      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});
