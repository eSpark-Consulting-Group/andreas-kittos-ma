import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, DrawerActions, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Category from '../screens/Category';
import Cart from '../screens/Cart';
import Settings from '../screens/Settings';
import {
  CartTab,
  CategoryTab,
  HomeTab,
  Scan,
  SearchIcon,
  SearchTab,
  SettingsTab,
} from '../assets';
import {WINDOW_WIDTH} from '../constants';
import {
  BubbleIcon,
  MyButton,
  MyHeader,
  MyText,
  OverlayLoader,
} from '../components';
import {MyTheme} from '../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../types/navigationParams';
import {useSelector} from 'react-redux';
import {handleGetSearchItems} from '../utils';
import store from '../app/store';
import {setSearchItems, setSearchText} from '../features/search/searchSlice';

const Tab = createBottomTabNavigator();

type SearchNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Search'
>;

function BottomNavigator() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<SearchNavigationProps['navigation']>();

  const cartItems: [] = useSelector((store: any) => store.cart.cartItems);
  const token: string = useSelector((store: any) => store.user.token);

  const [loading, setLoading] = useState(false);

  const TabIcon = (screen: string, isFocused: boolean) => {
    switch (screen) {
      case 'Home':
        return (
          <View style={{alignItems: 'center'}}>
            <HomeTab
              color={
                isFocused
                  ? theme.colors.focused
                  : theme.dark
                  ? theme.colors.negative
                  : theme.colors.primary
              }
            />
          </View>
        );
      case 'Category':
        return (
          <View style={{alignItems: 'center'}}>
            <CategoryTab
              color={
                isFocused
                  ? theme.colors.focused
                  : theme.dark
                  ? theme.colors.negative
                  : theme.colors.primary
              }
            />
          </View>
        );
      case 'Search':
        return (
          <View style={{alignItems: 'center'}}>
            <SearchTab
              color={
                isFocused
                  ? theme.colors.focused
                  : theme.dark
                  ? theme.colors.negative
                  : theme.colors.primary
              }
            />
          </View>
        );
      case 'Cart':
        return (
          <View style={{alignItems: 'center'}}>
            <CartTab
              color={
                isFocused
                  ? theme.colors.focused
                  : theme.dark
                  ? theme.colors.negative
                  : theme.colors.primary
              }
            />
          </View>
        );
      case 'Settings':
        return (
          <View style={{alignItems: 'center'}}>
            <SettingsTab
              color={
                isFocused
                  ? theme.colors.focused
                  : theme.dark
                  ? theme.colors.negative
                  : theme.colors.primary
              }
            />
          </View>
        );
      default:
        break;
    }
  };

  const getSearchItems = async (text: string) => {
    setLoading(true);
    const searchRes = await handleGetSearchItems(text);
    if (searchRes.status) {
      setLoading(false);
    }
  };

  return (
    <>
      <OverlayLoader isShow={loading} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={({state, navigation}) => (
          <View
            style={{
              height: Platform.OS == 'android' ? 65 : 80,
              width: WINDOW_WIDTH,
              backgroundColor: theme.colors.background,
              flexDirection: 'row',
            }}>
            {state.routes?.map((route, index) => {
              const focused = state.index === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (
                      (route.name == 'Cart' || route.name == 'Settings') &&
                      !token
                    ) {
                      navigation.navigate('SignIn');
                    } else {
                      navigation.navigate(route.name, route.params);
                    }
                  }}>
                  {focused ? (
                    <View
                      style={{
                        ...styles.tabIcon,
                        borderColor: theme.colors.focused,
                        backgroundColor: theme.colors.focused,
                      }}
                    />
                  ) : null}
                  {TabIcon(route.name, focused)}
                  <MyText
                    size={12}
                    text={route.name}
                    weight={focused ? '600' : '400'}
                    style={{
                      color: focused
                        ? theme.colors.focused
                        : theme.dark
                        ? theme.colors.negative
                        : theme.colors.primary,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        screenOptions={({route, navigation}) => ({
          // headerShown: false,
          tabBarIcon: ({focused}) => {
            return TabIcon(route.name, focused);
          },
          tabBarLabel: ({focused}) => {
            return (
              <MyText
                size={12}
                text={route.name}
                weight={focused ? '600' : '400'}
                style={{
                  bottom: Platform.OS == 'android' ? 10 : undefined,
                  color: focused
                    ? theme.colors.focused
                    : theme.dark
                    ? theme.colors.negative
                    : theme.colors.primary,
                }}
              />
            );
          },
          tabBarStyle: {
            height: Platform.OS == 'android' ? 65 : 80,
            paddingTop: Platform.OS == 'ios' ? 10 : undefined,
            width: WINDOW_WIDTH,
            backgroundColor: theme.colors.background,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            header: props => (
              <MyHeader
                center="logo"
                onPressLeft={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                lefticon="menu"
                right={
                  <BubbleIcon
                    onPress={() => props.navigation.navigate('Search')}
                    size={30}
                    children={
                      <SearchIcon
                        color={
                          theme.dark
                            ? theme.colors.negative
                            : theme.colors.primary
                        }
                      />
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            header: props => (
              <MyHeader
                center="logo"
                onPressLeft={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                lefticon="menu"
                right={
                  <BubbleIcon
                    onPress={() => props.navigation.navigate('Search')}
                    size={30}
                    children={
                      <SearchIcon
                        color={
                          theme.dark
                            ? theme.colors.negative
                            : theme.colors.primary
                        }
                      />
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            header: props => (
              <MyHeader
                center="searchBar"
                lefticon="back"
                // right={<Scan color={theme.colors.textSec} />}
                searchBarStyle={{marginHorizontal: 15}}
                bottomBorder={true}
                onPressLeft={() => {
                  store.dispatch(setSearchText(''));
                  store.dispatch(setSearchItems([]));
                  props.navigation.navigate('Home');
                }}
                // onPressRight={() =>
                //   props.navigation.navigate('D1Nav', {screen: 'AllowCamera'})
                // }
                onSubmit={e => {
                  store.dispatch(setSearchText(e.nativeEvent.text));
                  getSearchItems(e.nativeEvent.text);
                }}
                onClear={() => {
                  store.dispatch(setSearchText(''));
                  store.dispatch(setSearchItems([]));
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            header: props => (
              <MyHeader
                label="My Cart"
                lefticon="menu"
                onPressLeft={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                right={
                  <MyButton
                    onPress={() =>
                      cartItems?.length > 0
                        ? props.navigation.navigate('D1Nav', {
                            screen: 'Checkout',
                          })
                        : props.navigation.navigate('Home')
                    }
                    backgroundColor={theme.colors.primary}
                    chevron={true}
                    label={
                      cartItems?.length > 0 ? 'Checkout' : 'Start Shopping'
                    }
                    labelStyle={{width: 'auto'}}
                    style={{width: undefined, paddingHorizontal: 20}}
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            header: props => (
              <MyHeader
                label="Settings"
                onPressLeft={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                lefticon="menu"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    borderWidth: 2,
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
    top: 0,
  },
});

export default BottomNavigator;
