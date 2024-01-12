import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import {RootStackParamsList} from '../types/navigationParams';
import {LightTheme} from '../theme';
import D1Nav from './D1Nav';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import VerificationScreen from '../screens/VerificationScreen';
import GetNotified from '../screens/GetNotified';
import WithPhone from '../screens/WithPhone';
import EnterName from '../screens/EnterName';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Drawer = createDrawerNavigator();

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

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {index} = props.state;
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current;
  const toValue = !isOpen ? 0 : 1;

  Animated.timing(rotation, {
    toValue: toValue,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const rotateChevron = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const renderDropdownItems = () => {
    return (
      <View>
        <DrawerItem
          label={() => (
            <MyText text="Laundry" size={16} weight="400" textColor="#666666" />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <View style={{opacity: 0}}>
              <CategoryTab style={{color: '#595959'}} />
            </View>
          )}
          onPress={() => {
            props.navigation.navigate('D1Nav', {screen: 'CategoryView'});
            props.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          label={() => (
            <MyText text="Ironing" size={16} weight="400" textColor="#666666" />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <View style={{opacity: 0}}>
              <CategoryTab style={{color: '#595959'}} />
            </View>
          )}
          onPress={() => {
            props.navigation.navigate('D1Nav', {screen: 'CategoryView'});
            props.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          label={() => (
            <MyText
              text="Dry Cleaning"
              size={16}
              weight="400"
              textColor="#666666"
            />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <View style={{opacity: 0}}>
              <CategoryTab style={{color: '#595959'}} />
            </View>
          )}
          onPress={() => {
            props.navigation.navigate('D1Nav', {screen: 'CategoryView'});
            props.navigation.closeDrawer();
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{...styles.container}}>
      <View style={styles.header}>
        <View style={styles.h_left} />
        <View style={styles.h_center}>
          <HLogo />
        </View>
        <View style={styles.h_right}>
          <BubbleIcon onPress={() => props.navigation.closeDrawer()}>
            <DrawMenu />
          </BubbleIcon>
        </View>
      </View>
      <View style={styles.content}>
        <DrawerItem
          label={() => (
            <MyText text="Home" size={16} weight="400" textColor="#595959" />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <HomeTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Home'});
          }}
        />
        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <DrawerItem
            style={{flex: 0.94}}
            label={() => (
              <MyText
                text="Categories"
                size={16}
                weight={isOpen ? '500' : '400'}
                textColor="#595959"
              />
            )}
            pressColor="transparent"
            activeBackgroundColor={'#ffffff1a'}
            icon={({color, size, focused}) => (
              <CategoryTab style={{color: '#595959'}} />
            )}
            onPress={toggleDropdown}
          />
          <Animated.View style={{transform: [{rotate: rotateChevron}]}}>
            <Ionicons name="chevron-down" color={theme.colors.text} />
          </Animated.View>
        </View>
        {isOpen && renderDropdownItems()}
        <DrawerItem
          label={() => (
            <MyText text="Cart" size={16} weight="400" textColor="#595959" />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <CartTab style={{color: '#595959'}} />
          )}
          onPress={() => {
            props.navigation.navigate('BottomTab', {screen: 'Cart'});
          }}
        />
        <DrawerItem
          label={() => (
            <MyText
              text="Settings"
              size={16}
              weight="400"
              textColor="#595959"
            />
          )}
          pressColor="transparent"
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
          label={() => (
            <MyText text="Logout" size={16} weight="400" textColor="#595959" />
          )}
          pressColor="transparent"
          activeBackgroundColor={'#ffffff1a'}
          icon={({color, size, focused}) => (
            <Logout style={{color: '#595959'}} />
          )}
          onPress={() => {}}
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
      <Drawer.Screen name="BottomTab" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar backgroundColor={'#49ACE1'} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="WithPhone" component={WithPhone} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen name="EnterName" component={EnterName} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="GetNotified" component={GetNotified} />
        <Stack.Screen name="Draw" component={MyDrawer} />
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}>
          <Stack.Screen name="D1Nav" component={D1Nav} />
        </Stack.Group>
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
