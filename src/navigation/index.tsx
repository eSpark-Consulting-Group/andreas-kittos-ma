import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  LinkingOptions,
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import BottomNavigator from './BottomNavigator';
import {
  CartTab,
  CategoryTab,
  DrawMenu,
  Error,
  HLogo,
  HLogo2,
  HomeTab,
  Logout,
  SettingsTab,
  Success,
} from '../assets';
import {BubbleIcon, GapView, MyPopup, MyText} from '../components';
import {D1ParamsList, RootStackParamsList} from '../types/navigationParams';
import {DarkTheme, LightTheme, colors} from '../theme';
import D1Nav from './D1Nav';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/VerificationScreen';
import GetNotified from '../screens/GetNotified';
import WithPhone from '../screens/WithPhone';
import EnterName from '../screens/EnterName';
import {MyTheme, catalogItemProps, categoryProps} from '../types';
import {useDeepLink, useInitialURL} from '../hooks';
import {storage} from '../app/mmkv';
import {setUserData, setUserToken} from '../features/user/userSlice';
import {UserObject} from '../screens/SignIn/utils';
import {api} from '../api';
import {handleGetCategories} from '../screens/Category/utils';
import {setCategories} from '../features/category/categorySlice';
import {
  getCartTotal,
  getWishlistIds,
  handleGetCart,
  handleGetStatics,
} from '../utils';
import {setFavorites} from '../features/product/productSlice';
import {setAboutUs, setPolicy} from '../features/statics/staticSlice';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../features/cart/cartSlice';
import EnterPassword from '../screens/EnterPassword';
import PrivacyPolicy from '../screens/Settings/PrivacyPolicy';
import {setTheme} from '../features/theme/themeSlice';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Drawer = createDrawerNavigator();

const toastConfig = {
  success: ({text1}: {text1?: string}) => (
    <View style={[{backgroundColor: '#62C640'}, styles.toast]}>
      <Success />
      <MyText textColor="white" weight="500" style={{width: '90%'}}>
        {text1}
      </MyText>
    </View>
  ),

  error: ({text1}: {text1?: string}) => (
    <View style={[styles.toast, {backgroundColor: '#F50000'}]}>
      <Error />
      <MyText textColor="white" weight="500" style={{width: '90%'}}>
        {text1}
      </MyText>
    </View>
  ),
};

type DrawerNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'Draw'
>;

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {index} = props.state;
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<DrawerNavigationProps['navigation']>();

  const dispatch = useDispatch();
  const categoriesData = useSelector((store: any) => store.category.categories);
  // console.log('🚀 ~ DrawerContent ~ categoriesData:', categoriesData);

  const [isOpen, setIsOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const toValue = !isOpen ? 0 : 1;

  Animated.timing(rotation, {
    toValue: toValue,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const rotateChevron = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const renderDropdownItems = () => {
    return (
      <View>
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
                dispatch(setTheme(true));
                storage.set('userToken', '');
                setVisible(false);
              },
            },
          ]}
          visible={visible}
        />
        {categoriesData?.map((item: categoryProps) => (
          <DrawerItem
            key={item.id}
            label={() => (
              <MyText
                text={item?.name?.toString()}
                size={16}
                weight="400"
                textColor={theme.colors.textSec}
              />
            )}
            pressColor="transparent"
            activeBackgroundColor={'#ffffff1a'}
            icon={({color, size, focused}) => (
              <View style={{opacity: 0}}>
                <CategoryTab style={{color: '#595959'}} />
              </View>
            )}
            onPress={() => {
              navigation.navigate('D1Nav', {
                screen: 'CategoryView',
                params: {categoryId: item?.id, categoryName: item?.name},
              });
              props.navigation.closeDrawer();
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <View style={styles.header}>
        <View style={styles.h_left} />
        <View style={styles.h_center}>
          {theme.dark ? <HLogo2 /> : <HLogo />}
        </View>
        <View style={styles.h_right}>
          <BubbleIcon onPress={() => props.navigation.closeDrawer()}>
            <DrawMenu
              color={theme.dark ? theme.colors.negative : theme.colors.primary}
            />
          </BubbleIcon>
        </View>
      </View>
      <View style={styles.content}>
        <DrawerItem
          label={() => (
            <MyText
              text="Home"
              size={16}
              weight="400"
              textColor={theme.colors.textSec}
            />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <HomeTab style={{color: theme.colors.textSec}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Home'});
          }}
        />
        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <DrawerItem
            style={{flex: 0.94}}
            label={() => (
              <MyText
                text="Categories"
                size={16}
                weight={isOpen ? '500' : '400'}
                textColor={theme.colors.textSec}
              />
            )}
            pressColor="transparent"
            activeBackgroundColor={'#ffffff1a'}
            icon={({color, size, focused}) => (
              <CategoryTab style={{color: theme.colors.textSec}} />
            )}
            onPress={toggleDropdown}
          />
          <Animated.View style={{transform: [{rotate: rotateChevron}]}}>
            <Ionicons
              onPress={toggleDropdown}
              name="chevron-down"
              color={theme.colors.text}
            />
          </Animated.View>
        </View>
        {isOpen && renderDropdownItems()}
        <DrawerItem
          label={() => (
            <MyText
              text="Cart"
              size={16}
              weight="400"
              textColor={theme.colors.textSec}
            />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <CartTab style={{color: theme.colors.textSec}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Cart'});
          }}
        />
        <DrawerItem
          label={() => (
            <MyText
              text="Settings"
              size={16}
              weight="400"
              textColor={theme.colors.textSec}
            />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <SettingsTab style={{color: theme.colors.textSec}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Settings'});
          }}
        />
      </View>
      <View style={[styles.footer, {borderColor: theme.colors.border}]}>
        <DrawerItem
          label={() => (
            <MyText
              text="Logout"
              size={16}
              weight="400"
              textColor={theme.colors.textSec}
            />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <Logout style={{color: theme.colors.textSec}} />
          )}
          onPress={() => setVisible(true)}
        />
      </View>
      {Platform.OS == 'ios' && <GapView />}
    </View>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'transparent',
        drawerInactiveTintColor: 'transparent',
        headerShown: false,
        drawerStyle: {width: '85%'},
      }}>
      <Drawer.Screen name="BottomTab" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const {url: initialUrl} = useInitialURL();
  const {url: ongoingUrl} = useDeepLink();
  const dispatch = useDispatch();
  // const urlFetched = useCallback(() => {
  //   if (initialUrl) return initialUrl;
  //   if (ongoingUrl) return ongoingUrl;
  // }, [initialUrl, ongoingUrl]);
  const insets = useSafeAreaInsets();
  const lightTheme = useSelector((store: any) => store.theme.lightTheme);
  const token: string = useSelector((store: any) => store.user.token);

  useEffect(() => {
    console.log('initialUrl', initialUrl);
    console.log('ongoing', ongoingUrl);
    getStatics();
  }, [initialUrl, ongoingUrl]);

  useEffect(() => {
    const userToken = storage.getString('userToken');
    const jsonUser = storage.getString('userData');
    console.log('userToken', userToken);
    getStatics();
    if (userToken) {
      api.setHeader('Authorization', 'Bearer ' + userToken);
      getCategoriesData();
      getWishlist();
      getCart();
      dispatch(setUserToken(userToken));
    }
    if (jsonUser) {
      const userObject = JSON.parse(jsonUser);
      dispatch(setUserData(userObject as UserObject));
    }
    getStatics();
  }, []);

  const getCategoriesData = async () => {
    const res: {status: boolean; data?: []} = await handleGetCategories();
    if (res?.data) {
      dispatch(setCategories(res?.data));
    }
  };

  const getStatics = async () => {
    const res: {
      status: boolean;
      data?: {id: string; key: string; value: string}[];
    } = await handleGetStatics();
    console.log('res statics', res.data);

    if (res?.data) {
      res?.data.map(item => {
        if (item.key == 'about-us') {
          dispatch(setAboutUs(item.value));
        } else if (item.key == 'privacy-policy') {
          dispatch(setPolicy(item.value));
        }
      });
    }
  };

  const getWishlist = async () => {
    dispatch(setFavorites(await getWishlistIds()));
  };

  const getCart = async () => {
    const cartRes = await handleGetCart();
    if (cartRes.status) {
      dispatch(setCartId(cartRes.data?.id));
      dispatch(setCartItems(cartRes.data?.items));
      dispatch(setCartTotal(getCartTotal(cartRes.data?.items as [])));
    }
  };

  const linking: LinkingOptions<ReactNavigation.RootParamList> | undefined = {
    prefixes: ['https://www.andreaskittos.com', 'com.mls://'],
    config: {
      screens: {
        ResetPassword: {
          path: 'reset-password',
          parse: {
            token: (token: string) => token,
          },
        },
      },
    },
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <NavigationContainer
          linking={linking}
          theme={lightTheme ? LightTheme : DarkTheme}>
          {Platform.OS == 'ios' && (
            <View
              style={{
                backgroundColor: lightTheme
                  ? colors.light.statusBar
                  : colors.dark.statusBar,
                height: insets.top,
              }}
            />
          )}
          <StatusBar
            backgroundColor={
              lightTheme ? colors.light.statusBar : colors.dark.statusBar
            }
            barStyle={'light-content'}
          />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {token ? (
              <>
                <Stack.Screen name="Draw" component={MyDrawer} />
                <Stack.Group
                  screenOptions={{
                    animation: 'slide_from_bottom',
                  }}>
                  <Stack.Screen name="D1Nav" component={D1Nav} />
                  <Stack.Screen name="GetNotified" component={GetNotified} />
                </Stack.Group>
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="WithPhone" component={WithPhone} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="VerificationScreen"
                  component={VerificationScreen}
                />
                <Stack.Screen name="EnterName" component={EnterName} />
                <Stack.Screen name="EnterPassword" component={EnterPassword} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              </>
            )}
          </Stack.Navigator>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: insets.top,
            }}>
            <Toast topOffset={0} autoHide config={toastConfig} />
          </View>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h_left: {flex: 0.1},
  h_center: {flex: 0.8, alignItems: 'center'},
  h_right: {
    flex: 0.1,
    alignItems: 'flex-end',
    height: '65%',
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
  },
  toast: {
    minHeight: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});
