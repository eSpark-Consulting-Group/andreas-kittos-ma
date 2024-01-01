import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Category from '../screens/Category/Index';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Settings from '../screens/Settings';
import {CartTab, CategoryTab, HomeTab, SearchTab, SettingsTab} from '../assets';
import {WINDOW_WIDTH} from '../constants';
import {StyleSheet, View} from 'react-native';
import {MyText} from '../components';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const theme = useTheme();
  const TabIcon = (screen: string, isFocused: boolean) => {
    switch (screen) {
      case 'Home':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <HomeTab color={isFocused ? '#0F5D9F' : theme.colors.primary} />
          </View>
        );
      case 'Category':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <CategoryTab color={isFocused ? '#0F5D9F' : theme.colors.primary} />
          </View>
        );
      case 'Search':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <SearchTab color={isFocused ? '#0F5D9F' : theme.colors.primary} />
          </View>
        );
      case 'Cart':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <CartTab color={isFocused ? '#0F5D9F' : theme.colors.primary} />
          </View>
        );
      case 'Settings':
        return (
          <View style={{alignItems: 'center'}}>
            {isFocused ? <View style={styles.tabIcon} /> : null}
            <SettingsTab color={isFocused ? '#0F5D9F' : theme.colors.primary} />
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
        headerShown: false,
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
        tabBarStyle: {height: 65, width: WINDOW_WIDTH},
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Settings" component={Settings} />
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
