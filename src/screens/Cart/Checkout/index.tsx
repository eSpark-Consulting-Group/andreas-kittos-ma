import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import {MyButton, MyText, MyView} from '../../../components';
import Address from './Address';
import Shipping from './Shipping';
import Preview from './Preview';
import Payment from './Payment';

const checkoutTabs = ['Address', 'Shipping', 'Preview', 'Payment'];

export default function Checkout() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(1);

  const checkoutScreens = [
    <Address setIndex={setActiveIndex} />,
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
          <MyText size={12} weight="500" text={item} />
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
});
