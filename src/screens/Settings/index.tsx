import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

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
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';

type SettingNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

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
  const navigation = useNavigation<SettingNavigationProps['navigation']>();

  const handlePress = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('D1Nav', {screen: 'WishList'});
        break;
      case 1:
        navigation.navigate('D1Nav', {screen: 'Notifications'});
      case 2:
        navigation.navigate('D1Nav', {screen: 'Languages'});
        break;
      default:
        break;
    }
  };

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
          <BubbleIcon
            plain
            size={40}
            onPress={() => navigation.navigate('D1Nav', {screen: 'Profile'})}>
            <EditBubble />
          </BubbleIcon>
        </View>
        <GapView length={20} />
        <Item
          label="Logout"
          leftIcon={<SettingLogout />}
          theme={theme}
          onPress={() => console.log('Logout')}
        />
        <GapView length={30} />
        <MyText
          text="General Settings"
          size={18}
          weight="600"
          style={{marginBottom: 10}}
        />
        {listData.map((item, index) => (
          <View key={index}>
            {index > 0 && <GapView length={5} />}
            <Item
              label={item.label}
              leftIcon={item.leftIcon}
              theme={theme}
              right={item.right}
              onPress={() => handlePress(index)}
            />
          </View>
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
  onPress,
}: {
  leftIcon?: React.ReactNode;
  label?: string;
  right?: React.ReactNode;
  theme: Theme;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
});
