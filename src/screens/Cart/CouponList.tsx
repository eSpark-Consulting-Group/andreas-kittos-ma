import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {MyTheme} from '../../types';
import {GapView, MyText} from '../../components';
import {ButtonChevronBlack} from '../../assets';

export default function CouponList() {
  const theme = useTheme() as MyTheme;
  const navigation = useNavigation();

  const couponData = [
    {id: '1', percent: 10, name: 'Java'},
    {id: '2', percent: 15, name: 'React'},
    {id: '3', percent: 20, name: 'Native'},
    {id: '4', percent: 25, name: 'Python'},
    {id: '5', percent: 30, name: 'Angular'},
    {id: '6', percent: 12, name: 'Vue.js'},
    {id: '7', percent: 18, name: 'CPP'},
    {id: '8', percent: 22, name: 'Node.js'},
    {id: '9', percent: 28, name: 'CSS'},
    {id: '10', percent: 35, name: 'HTML'},
  ];

  return (
    <View style={styles({theme}).main}>
      <FlatList
        data={couponData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CouponCard
            theme={theme}
            percent={item.percent}
            name={item.name}
            onPress={() => navigation.goBack()}
          />
        )}
        ItemSeparatorComponent={() => <GapView length={20} />}
        ListHeaderComponent={<GapView length={30} />}
        ListFooterComponent={<GapView length={20} />}
        contentContainerStyle={{width: '90%'}}
      />
    </View>
  );
}

const CouponCard = ({
  theme,
  percent,
  name,
  onPress,
}: {
  theme: MyTheme;
  percent: number;
  name: string;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles({theme}).card} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <View style={styles({theme}).couple}>
          <MyText text="Discount" size={10} textColor={theme.colors.positive} />
          <MyText size={12} textColor={theme.colors.positive}>
            {percent}%
          </MyText>
          <MyText text={name} size={8} style={styles({theme}).label} />
        </View>
        <MyText weight="600" size={16}>
          {percent}% Discount
        </MyText>
      </View>
      <View style={styles({theme}).svg}>
        <ButtonChevronBlack />
      </View>
    </Pressable>
  );
};

const styles = ({theme}: {theme?: MyTheme}) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme?.colors.background,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    card: {
      width: '100%',
      height: 80,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme?.colors.border,
      elevation: 2,
      backgroundColor: theme?.colors.positive,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    couple: {
      backgroundColor: theme?.colors.primary,
      width: 50,
      height: 50,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      backgroundColor: theme?.colors.card,
      width: 40,
      borderRadius: 10,
      textAlign: 'center',
    },
    svg: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
