import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTab" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Draw" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
