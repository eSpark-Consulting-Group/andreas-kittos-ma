import React, {memo, useCallback, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Platform, DimensionValue} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

import {MyTheme} from '../../types';
import {GapView, MyText} from '..';
import {ScrollView} from 'react-native-gesture-handler';

const BSheetModal = ({
  visible,
  onClose,
  theme,
  children,
  defaultHeight,
}: {
  visible: boolean;
  onClose: (val: boolean) => void;
  theme: MyTheme;
  children: React.ReactNode;
  defaultHeight?: DimensionValue;
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
      enableDynamicSizing
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      enablePanDownToClose={false}
      handleComponent={() => (
        <View style={{paddingVertical: 18, alignItems: 'center'}}>
          <View
            style={{
              height: 4,
              width: 60,
              borderRadius: 2,
              backgroundColor: '#0f5d9f',
              alignItems: 'center',
            }}
          />
        </View>
      )}
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
      enableDismissOnClose
      onChange={handleSheetChanges}>
      <BottomSheetView style={{height: defaultHeight}}>
        {children}
        {Platform.OS == 'ios' && <GapView length={20} />}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default memo(BSheetModal);
