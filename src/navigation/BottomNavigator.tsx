import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  useTheme,
  Theme,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../screens/Home';
import Category from '../screens/Category/Index';
import Search from '../screens/Search';
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
import {BubbleIcon, MyHeader, MyText} from '../components';
import {MyTheme} from '../types';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation();
  const TabIcon = (screen: string, isFocused: boolean) => {
    switch (screen) {
      case 'Home':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <HomeTab
              color={isFocused ? theme.colors.focused : theme.colors.primary}
            />
          </View>
        );
      case 'Category':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <CategoryTab
              color={isFocused ? theme.colors.focused : theme.colors.primary}
            />
          </View>
        );
      case 'Search':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <SearchTab
              color={isFocused ? theme.colors.focused : theme.colors.primary}
            />
          </View>
        );
      case 'Cart':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <CartTab
              color={isFocused ? theme.colors.focused : theme.colors.primary}
            />
          </View>
        );
      case 'Settings':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <SettingsTab
              color={isFocused ? theme.colors.focused : theme.colors.primary}
            />
          </View>
        );
      default:
        break;
    }
  };

  return (
    <Tab.Navigator
      // sceneContainerStyle={{marginBottom: 20}}
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
                bottom: 10,
                color: focused ? '#0F5D9F' : theme.colors.primary,
              }}
            />
          );
        },
        tabBarStyle: {
          height: 65,
          width: WINDOW_WIDTH,
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
                  size={30}
                  children={<SearchIcon color={theme.colors.primary} />}
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
                  size={30}
                  children={<SearchIcon color={theme.colors.primary} />}
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
          header: () => (
            <MyHeader
              center="searchBar"
              right={<Scan />}
              searchBarStyle={{marginRight: 15}}
              bottomBorder={false}
              onPressRight={() =>
                navigation.navigate('D1Nav', {screen: 'AllowCamera'})
              }
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
              lefticon="back"
              right={<Button theme={theme} />}
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
  );
}

const Button = ({theme}: {theme: Theme}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 11,
      }}>
      <MyText style={{color: theme.colors.background}} size={14} weight="500">
        Checkout
      </MyText>
      <Feather
        name="chevron-right"
        size={14}
        color={theme.colors.background}
        style={{textAlignVertical: 'center', marginLeft: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    borderWidth: 2,
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
    bottom: '130%',
    borderColor: '#0F5D9F',
    backgroundColor: '#0F5D9F',
  },
});

export default BottomNavigator;
