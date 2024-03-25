import React, {memo, useState} from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';

import {SearchIcon} from '../../assets';
import GapView from '../GapView';
import {MyTheme} from '../../types';
import {TouchableOpacity} from 'react-native';

function MySearchBar({
  style,
  placeholder,
  onSubmit,
  onClear,
}: {
  style?: ViewStyle;
  placeholder?: string;
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onClear?: () => void;
}) {
  const {colors} = useTheme() as MyTheme;
  const [text, setText] = useState('');
  return (
    <View
      style={{
        ...styles.searchBarContainer,
        ...style,
        backgroundColor: colors.background,
      }}>
      <SearchIcon color={colors.textSec} />
      <GapView mode="horizontal" />
      <TextInput
        value={text}
        placeholderTextColor={colors.placeholder}
        placeholder={placeholder ? placeholder : 'Search'}
        style={styles.inputStyle}
        onChangeText={e => setText(e)}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      {text && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setText('');
            onClear!();
          }}>
          <MIcons name="close" size={20} color={colors.textSec} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default memo(MySearchBar);

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    paddingVertical: 5,
  },
});
