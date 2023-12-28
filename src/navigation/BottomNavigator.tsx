import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';

import Home from '../screens/Home';
import Category from '../screens/Category/Index';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Settings from '../screens/Settings';
import {
  CartActiveTab,
  CartTab,
  CategoryActiveTab,
  CategoryTab,
  HomeActiveTab,
  HomeTab,
  SearchActiveTab,
  SearchTab,
  SettingsActiveTab,
  SettingsTab,
} from '../assets';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const TabIcon = (screen: string, isFocused: boolean) => {
    switch (screen) {
      case 'Home':
        if (isFocused) {
          return <HomeActiveTab />;
        } else {
          return <HomeTab />;
        }
      case 'Category':
        if (isFocused) {
          return <CategoryActiveTab />;
        } else {
          return <CategoryTab />;
        }
      case 'Search':
        if (isFocused) {
          return <SearchActiveTab />;
        } else {
          return <SearchTab />;
        }
      case 'Cart':
        if (isFocused) {
          return <CartActiveTab />;
        } else {
          return <CartTab />;
        }
      case 'Settings':
        if (isFocused) {
          return <SettingsActiveTab />;
        } else {
          return <SettingsTab />;
        }
      default:
        break;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        // tabBarIcon: ({focused}) => {
        //   return <SearchActiveTab />;;
        // },
        tabBarStyle: {height: 60},
        tabBarItemStyle: {
          borderTopWidth: 4,
          borderTopColor: navigation.isFocused() ? '#0F5D9F' : 'transparent',
          borderRadius: 5,
        },
        tabBarActiveTintColor: '#0F5D9F',
        tabBarInactiveTintColor: '#49ACE1',
        tabBarLabelStyle: {bottom: 10},
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
