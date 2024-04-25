import React, {memo, useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {BackArrow, Close, Dots, DrawMenu, HLogo, HLogo2} from '../../assets';
import BubbleIcon from '../BubbleIcon';
import MySearchBar from '../MySearchBar';
import MyText from '../MyText';

interface HeaderProps {
  lefticon?: string | 'menu';
  label?: string;
  center?: 'searchBar' | 'logo';
  right?: React.ReactNode | string;
  bottomBorder?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  searchBarStyle?: ViewStyle;
  searchBarLabel?: string;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onClear?: () => void;
  defaultText?: string;
}

const renderLeftIcon = (value: string, color?: string) => {
  switch (value) {
    case 'menu':
      return <DrawMenu color={color} />;
    case 'dots':
      return <Dots color={color} />;
    case 'close':
      return <Close color={color} />;
    case 'back':
      return <BackArrow color={color} />;
    default:
      return <DrawMenu color={color} />;
  }
};

const MyHeader = ({
  lefticon,
  label,
  center,
  right,
  bottomBorder = true,
  onPressLeft,
  onPressRight,
  searchBarStyle,
  searchBarLabel,
  defaultText = '',
  onSubmit,
  onClear,
}: HeaderProps) => {
  const theme = useTheme();
  const [text, setText] = useState(defaultText);
  const clearText = () => {
    setText('');
    onClear!();
  };

  const pressLeft = () => {
    setText('');
    onPressLeft!();
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
        borderBottomWidth: bottomBorder ? 1 : 0,
      }}>
      <View style={styles.left}>
        {lefticon && (
          <BubbleIcon onPress={pressLeft}>
            {renderLeftIcon(
              lefticon,
              theme.dark ? theme.colors.text : theme.colors.primary,
            )}
          </BubbleIcon>
        )}
        {label && (
          <MyText style={{marginLeft: 20}} size={16} weight="400">
            {label}
          </MyText>
        )}
      </View>
      {center ? (
        center == 'logo' ? (
          theme.dark ? (
            <HLogo2 />
          ) : (
            <HLogo />
          )
        ) : (
          <MySearchBar
            style={searchBarStyle}
            placeholder={searchBarLabel}
            onSubmit={onSubmit}
            onClear={clearText}
            text={text}
            onChangeText={e => setText(e)}
          />
        )
      ) : (
        <View />
      )}
      <Pressable onPress={onPressRight}>{right && right}</Pressable>
    </View>
  );
};

export default memo(MyHeader);

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {flexDirection: 'row', alignItems: 'center'},
});
