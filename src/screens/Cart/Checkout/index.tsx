import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {Theme, useRoute, useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';

import {GapView, MyButton, MyText, MyView} from '../../../components';
import Address from './Address';
import Shipping from './Shipping';
import Preview from './Preview';
import Payment from './Payment';
import {MyTheme} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {D1ParamsList} from '../../../types/navigationParams';

const checkoutTabs = ['Address', 'Shipping', 'Preview', 'Payment'];

type CheckoutNavigationProps = NativeStackScreenProps<D1ParamsList, 'Checkout'>;

export default function Checkout() {
  const theme = useTheme() as MyTheme;
  const route = useRoute<CheckoutNavigationProps['route']>();
  const [activeIndex, setActiveIndex] = useState(0);

  console.log('LatLong', route.params?.latLong);

  const checkoutScreens = [
    <Address
      setIndex={setActiveIndex}
      mapLocation={route.params?.latLong as string}
    />,
    <Shipping setIndex={setActiveIndex} />,
    <Preview setIndex={setActiveIndex} />,
    <Payment setIndex={setActiveIndex} />,
  ];

  return (
    <View style={{flex: 1}}>
      <CheckoutTabBar activeIndex={activeIndex} theme={theme} />
      {checkoutScreens.map(
        (item, index) =>
          activeIndex == index && (
            <MyView
              key={index}
              topPad={10}
              botPad={0}
              style={styles.screenContainer}
              children={item}
            />
          ),
      )}
    </View>
  );
}

const CheckoutTabBar = ({
  activeIndex,
  theme,
}: {
  activeIndex: number;
  theme: Theme;
}) => {
  const {colors} = theme;
  return (
    <View
      style={{
        ...styles.tabsContainer,
        borderColor: colors.border,
      }}>
      {checkoutTabs.map((item: string, index: number) => (
        <View key={index} style={styles.tab}>
          <MyText
            size={12}
            weight="500"
            textColor={activeIndex == index ? colors.primary : colors.text}
            text={item}
          />
          {activeIndex >= index && (
            <View
              style={{
                ...styles.tabBorder,
                backgroundColor: colors.primary,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export const CheckoutFooter = ({
  priButtonLabel,
  secButtonLabel,
  priButtonPress,
  secButtonPress,
}: {
  priButtonLabel: string;
  secButtonLabel: string;
  priButtonPress: () => void;
  secButtonPress: () => void;
}) => {
  return (
    <>
      <View style={styles.footerContainer}>
        <MyButton
          label={secButtonLabel}
          textColor="black"
          style={styles.secButton}
          onPress={secButtonPress}
        />
        <MyButton
          label={priButtonLabel}
          style={{width: '60%'}}
          onPress={priButtonPress}
        />
      </View>
      {Platform.OS == 'ios' && <GapView />}
    </>
  );
};

export const RadioMethodSeletor = ({
  item,
  index,
  onPress,
  activeIndex,
  theme,
}: {
  item: {title: string; subTitle: string};
  index: number;
  onPress: () => void;
  activeIndex: number;
  theme: MyTheme;
}) => {
  return (
    <>
      <GapView length={10} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor:
            activeIndex == index
              ? theme.dark
                ? theme.colors.card
                : '#F5F5F5'
              : undefined,
          ...styles.methodSelectorContainer,
        }}>
        <MIcons
          name={activeIndex == index ? 'radio-button-on' : 'radio-button-off'}
          size={20}
          color={theme.colors.textSec}
          style={{marginHorizontal: 20}}
        />
        <View>
          <MyText
            weight="500"
            textColor={theme.colors.textSec}
            text={item.title}
          />
          <MyText
            weight="400"
            textColor={theme.colors.textSec}
            size={12}
            text={item.subTitle}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  tab: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  tabBorder: {height: 2, width: '100%', position: 'absolute', bottom: '1%'},
  screenContainer: {flex: 1, justifyContent: 'space-between'},
  footerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  secButton: {
    width: '35%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e4e4e4',
  },
  methodSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
});
