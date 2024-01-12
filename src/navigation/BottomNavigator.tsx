import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
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
import {BubbleIcon, MyButton, MyHeader, MyText} from '../components';
import {MyTheme} from '../types';
import {
  BottomTabParamsList,
  RootStackParamsList,
} from '../types/navigationParams';

const Tab = createBottomTabNavigator();

type SearchNavigationProps = NativeStackScreenProps<
  RootStackParamsList & BottomTabParamsList,
  'Search'
>;

function BottomNavigator() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation<SearchNavigationProps['navigation']>();
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
                bottom: Platform.OS == 'android' ? 10 : undefined,
                color: focused ? '#0F5D9F' : theme.colors.primary,
              }}
            />
          );
        },
        tabBarStyle: {
          height: Platform.OS == 'android' ? 65 : 80,
          paddingTop: Platform.OS == 'ios' ? 10 : undefined,
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
                  onPress={() => props.navigation.navigate('Search')}
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
                  onPress={() => props.navigation.navigate('Search')}
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
          header: props => (
            <MyHeader
              center="searchBar"
              lefticon="back"
              right={<Scan />}
              searchBarStyle={{marginHorizontal: 15}}
              bottomBorder={true}
              onPressRight={() =>
                props.navigation.navigate('D1Nav', {screen: 'AllowCamera'})
              }
              onBlur={() =>
                props.navigation.navigate('D1Nav', {screen: 'SearchList'})
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
              right={
                <MyButton
                  onPress={() =>
                    props.navigation.navigate('D1Nav', {screen: 'Checkout'})
                  }
                  backgroundColor={theme.colors.primary}
                  chevron={true}
                  label="Checkout"
                  labelStyle={{width: 'auto'}}
                  style={{width: 125}}
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
  );
}

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
