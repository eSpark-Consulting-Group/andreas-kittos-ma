import React, {memo, useCallback, useEffect, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {MyTheme} from '../../types';
import GapView from '../GapView';

const BSheetModal = ({
  visible,
  onClose,
  theme,
}: {
  visible: boolean;
  onClose: (val: boolean) => void;
  theme: MyTheme;
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks

  useEffect(() => {
    if (visible == true) {
      handlePresentModal();
    } else {
      handleHideModal();
    }
  }, [visible]);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleHideModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['75%']}
      style={{
        paddingTop: 30,
        paddingHorizontal: 25,
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      handleComponent={() => <GapView length={1} />}
      backdropComponent={() => (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: '#00000088',
          }}>
          <TouchableOpacity style={{flex: 1}} onPress={() => onClose(false)} />
        </View>
      )}
      onDismiss={() => onClose(false)}
      enableDismissOnClose
      onChange={handleSheetChanges}>
      <GapView length={60} />
    </BottomSheetModal>
  );
};

export default memo(BSheetModal);
