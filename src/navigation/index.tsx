import React from 'react';
<<<<<<< HEAD
import {StatusBar} from 'react-native';
=======
>>>>>>> 164e1f9 (Header done Drawer wip)
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
<<<<<<< HEAD
      <StatusBar backgroundColor={'#49ACE1'} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTab" component={BottomNavigator} />
=======
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Draw" component={MyDrawer} />
>>>>>>> 164e1f9 (Header done Drawer wip)
      </Stack.Navigator>
    </NavigationContainer>
  );
}
