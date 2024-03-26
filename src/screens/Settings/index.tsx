import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  Theme,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {
  BubbleIcon,
  GapView,
  MyAvatar,
  MyBanner,
  MyPopup,
  MyText,
  MyView,
  OverlayLoader,
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
  SettingList,
  SettingLogout,
  SettingTheme,
  SettingTime,
} from '../../assets';
import {colors} from '../../theme';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../../types/navigationParams';
import {setTheme} from '../../features/theme/themeSlice';
import {User, setUserData, setUserToken} from '../../features/user/userSlice';
import {storage} from '../../app/mmkv';
import {getUserProfile} from '../../utils';

type SettingNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Settings'
>;

export default function Settings() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<SettingNavigationProps['navigation']>();
  const route = useRoute<SettingNavigationProps['route']>();
  const lightTheme = useSelector((store: any) => store.theme.lightTheme);
  const userData: User = useSelector((store: any) => store.user.userData);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleTheme = () => {
    if (lightTheme) {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
  };

  const getUserData = async () => {
    setLoading(true);
    const res = await getUserProfile();
    if (res.status) {
      console.log('userData', JSON.stringify(res.data));
      storage.set('userData', JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      setLoading(false);
      navigation.setParams({getProfile: false});
    }
  };

  useEffect(() => {
    if (route?.params?.getProfile) {
      getUserData();
    }
  }, [route?.params?.getProfile]);

  const listData = [
    {
      leftIcon: <SettingHeart />,
      label: 'My WishList',
      right: (
        <Feather name="chevron-right" color={theme.colors.text} size={14} />
      ),
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
          <Feather name="chevron-right" color={theme.colors.text} size={14} />
        </View>
      ),
    },
    {
      leftIcon: <SettingTheme />,
      label: 'Appearance',
      right: (
        <MyText
          text={lightTheme ? 'Light Theme' : 'Dark Theme'}
          style={{opacity: 0.7}}
        />
      ),
    },
    {
      leftIcon: <SettingTime />,
      label: 'Order History',
      right: (
        <Feather name="chevron-right" color={theme.colors.text} size={14} />
      ),
    },
    {
      leftIcon: <SettingFile />,
      label: 'Privacy Policy',
      right: (
        <Feather name="chevron-right" color={theme.colors.text} size={14} />
      ),
    },
    {
      leftIcon: <SettingInfo />,
      label: 'About US',
      right: (
        <Feather name="chevron-right" color={theme.colors.text} size={14} />
      ),
    },
    {
      leftIcon: <SettingDelete />,
      label: 'Delete Account',
      right: null,
    },
  ];

  const handlePress = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('D1Nav', {screen: 'WishList'});
        break;
      case 2:
        navigation.navigate('D1Nav', {screen: 'Languages'});
        break;
      case 3:
        toggleTheme();
        break;
      case 4:
        navigation.navigate('D1Nav', {screen: 'OrderHistory'});
        break;
      case 5:
        navigation.navigate('D1Nav', {screen: 'PrivacyPolicy'});
        break;
      case 6:
        navigation.navigate('D1Nav', {screen: 'AboutUs'});
        break;
      case 7:
        navigation.navigate('D1Nav', {screen: 'DeleteAccount'});
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <OverlayLoader isShow={loading} />
      <MyView>
        <MyPopup
          title="Logout"
          message1="Are you sure you want to logout?"
          buttons={[
            {
              id: 1,
              label: 'Cancel',
              backgroundColor: 'transparent',
              textColor: theme.colors.text,
              onPress: () => setVisible(false),
            },
            {
              id: 2,
              label: 'Logout',
              backgroundColor: 'transparent',
              textColor: theme.colors.primary,
              onPress: () => {
                dispatch(setUserToken(''));
                dispatch(setUserData(null));
                storage.set('userToken', '');
                setVisible(false);
              },
            },
          ]}
          visible={visible}
        />
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
              source={{
                uri: userData?.profileImage,
              }}
            />
            <View style={{marginLeft: 10}}>
              <MyText
                text={
                  userData?.displayName ??
                  userData?.firstName + ' ' + userData?.lastName
                }
                size={16}
                weight="500"
              />
              <MyText text={userData?.email ?? 'N/A'} size={14} weight="400" />
            </View>
          </View>
          <BubbleIcon
            plain
            size={40}
            onPress={() => navigation.navigate('D1Nav', {screen: 'Profile'})}>
            <EditBubble
              color={theme.dark ? theme.colors.text : theme.colors.primary}
            />
          </BubbleIcon>
        </View>
        <GapView length={20} />
        <Item
          label="Logout"
          leftIcon={<SettingLogout />}
          theme={theme}
          onPress={() => setVisible(true)}
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
              right={
                index == 1 ? (
                  <Switch
                    value={showNotification}
                    trackColor={{true: theme.colors.primary, false: '#AEAEAE'}}
                    thumbColor={'#fff'}
                    onValueChange={() => setShowNotification(!showNotification)}
                  />
                ) : (
                  item.right
                )
              }
              onPress={() => handlePress(index)}
            />
            {showNotification && index == 1 && (
              <Item
                label={'Notification Messages'}
                leftIcon={<SettingList />}
                theme={theme}
                right={
                  <Feather
                    name="chevron-right"
                    color={theme.colors.text}
                    size={14}
                  />
                }
                onPress={() =>
                  navigation.navigate('D1Nav', {screen: 'Notifications'})
                }
              />
            )}
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
