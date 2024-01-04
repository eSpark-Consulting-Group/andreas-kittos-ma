import {Modal, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyText} from '..';
import {MyPopupProps, MyTheme} from '../../types';

export default function MyPopup({
  width,
  height,
  title,
  message1,
  message2,
  message3,
  visible,
  style,
  children,
}: MyPopupProps) {
  const theme = useTheme() as MyTheme;

  return (
    <Modal visible={visible} transparent>
      <View style={styles.popupStyle}>
        <View
          style={[
            styles.container,
            {
              width: width ? width : '80%',
              height: height ? height : 175,
              backgroundColor: theme.colors.background,
              ...style,
            },
          ]}>
          {title && (
            <MyText weight="600" size={16}>
              {title}
            </MyText>
          )}
          <View>
            {message1 && <MyText style={{lineHeight: 25}}>{message1}</MyText>}
            {message2 && <MyText style={{lineHeight: 25}}>{message2}</MyText>}
            {message3 && <MyText style={{lineHeight: 25}}>{message3}</MyText>}
          </View>
          <View style={styles.buttonsRow}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupStyle: {
    alignItems: 'center',
    height: '100%',
    borderWidth: 1,
    backgroundColor: '#00000042',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
