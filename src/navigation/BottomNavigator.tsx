import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Category from '../screens/Category/Index';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Settings from '../screens/Settings';
import {CartTab, CategoryTab, HomeTab, SearchTab, SettingsTab} from '../assets';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const TabIcon = (screen: string, isFocused: boolean) => {
    switch (screen) {
      case 'Home':
        return <HomeTab color={isFocused ? '#0F5D9F' : '#49ACE1'} />;
      case 'Category':
        return <CategoryTab color={isFocused ? '#0F5D9F' : '#49ACE1'} />;
      case 'Search':
        return <SearchTab color={isFocused ? '#0F5D9F' : '#49ACE1'} />;
      case 'Cart':
        return <CartTab color={isFocused ? '#0F5D9F' : '#49ACE1'} />;
      case 'Settings':
        return <SettingsTab color={isFocused ? '#0F5D9F' : '#49ACE1'} />;
      default:
        break;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return TabIcon(route.name, focused);
        },
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
