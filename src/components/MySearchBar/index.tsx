import {View, TextInput, ViewStyle, StyleSheet} from 'react-native';
import React from 'react';
import {SearchIcon} from '../../assets';
import {GapView} from '..';

export default function MySearchBar({style}: {style?: ViewStyle}) {
  return (
    <View style={{...styles.searchBarContainer, ...style}}>
      <SearchIcon color={'#666'} />
      <GapView mode="horizontal" />
      <TextInput
        placeholderTextColor={'#666'}
        placeholder="Search"
        style={styles.inputStyle}
      />
    </View>
  );
}

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
    paddingHorizontal: 20,
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    paddingVertical: 5,
    color: '#666',
  },
});
