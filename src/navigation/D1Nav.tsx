import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryView from '../screens/Category/CategoryView';
import {BubbleIcon, MyHeader} from '../components';
import {Dots, DotsHorizontal} from '../assets';

function D1Nav() {
  const RootStack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="CategoryView"
          component={CategoryView}
          options={{
            header: () => (
              <MyHeader
                center="searchBar"
                lefticon="back"
                right={
                  <BubbleIcon>
                    <DotsHorizontal />
                  </BubbleIcon>
                }
                searchBarStyle={{marginHorizontal: 15}}
                onPressLeft={() => navigation.goBack()}
              />
            ),
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default D1Nav;
