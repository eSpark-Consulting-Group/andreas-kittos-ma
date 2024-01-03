import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryView from '../screens/Category/CategoryView';
import {BubbleIcon, MyHeader} from '../components';
import {Dots} from '../assets';

const Stack = createNativeStackNavigator();

function D1Nav() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="CategoryView"
          component={CategoryView}
          options={{
            header: () => (
              <MyHeader
                center="searchBar"
                lefticon="back"
                right={
                  <BubbleIcon>
                    <Dots />
                  </BubbleIcon>
                }
                searchBarStyle={{marginHorizontal: 15}}
                onPressLeft={() => navigation.goBack()}
              />
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default D1Nav;
