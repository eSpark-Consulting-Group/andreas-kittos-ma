import React from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DrawerActions,
  useTheme,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import BottomNavigator from './BottomNavigator';
import {
  CartTab,
  CategoryTab,
  DrawMenu,
  Error,
  HLogo,
  HomeTab,
  Logout,
  SettingsTab,
  Success,
} from '../assets';
import {BubbleIcon, MyText} from '../components';
import SignIn from '../screens/SignIn';
import {LightTheme} from '../theme';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/VerificationScreen';
import GetNotified from '../screens/GetNotified';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {index} = props.state;
  const theme = useTheme();

  return (
    <SafeAreaView style={{...styles.container}}>
      <View style={styles.header}>
        <View style={styles.h_left} />
        <View style={styles.h_center}>
          <HLogo />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={styles.h_right}>
          <BubbleIcon>
            <DrawMenu />
          </BubbleIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <DrawerItem
          label={'Home'}
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <HomeTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Home'});
          }}
        />
        <DrawerItem
          label={'Categories'}
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <CategoryTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Category'});
          }}
        />
        <DrawerItem
          label={'Cart'}
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <CartTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Cart'});
          }}
        />
        <DrawerItem
          label={'Settings'}
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <SettingsTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Settings'});
          }}
        />
      </View>
      <View style={[styles.footer, {borderColor: theme.colors.border}]}>
        <DrawerItem
          label={'Logout'}
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <Logout style={{color: '#595959'}} />
          )}
          onPress={() => {
            // props.navigation.navigate('BottomTab', {screen: 'Home'});
          }}
        />
      </View>
    </SafeAreaView>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'transparent',
        drawerInactiveTintColor: 'transparent',
        headerShown: false,
        drawerStyle: {width: '85%'},
      }}>
      <Stack.Screen name="BottomTab" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

const toastConfig = {
  success: ({text1}: {text1?: string}) => (
    <View style={[{backgroundColor: '#62C640'}, styles.toast]}>
      <Success />
      <MyText textColor="white" weight="500" style={{width: '90%'}}>
        {text1}
      </MyText>
    </View>
  ),

  error: ({text1}: {text1?: string}) => (
    <View style={[styles.toast, {backgroundColor: '#F50000'}]}>
      <Error />
      <MyText textColor="white" weight="500" style={{width: '90%'}}>
        {text1}
      </MyText>
    </View>
  ),
};

export default function App() {
  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar backgroundColor={'#49ACE1'} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="GetNotified" component={GetNotified} />
        <Stack.Screen name="Draw" component={MyDrawer} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h_left: {flex: 0.1},
  h_center: {flex: 0.8, alignItems: 'center'},
  h_right: {
    flex: 0.1,
    alignItems: 'flex-end',
    height: '65%',
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    height: 50,
  },
  toast: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});
