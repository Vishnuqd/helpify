// Library import
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import {useNavigation} from '@react-navigation/native';

// Local import
import {styles} from '../../themes';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import CButton from '../common/CButton';
import CDivider from '../common/CDivider';
import {StackNav} from '../../navigation/NavigationKeys';

const CancelBookingModal = props => {
  const {SheetRef} = props;
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressLogOut = () => {
    SheetRef?.current?.hide();
    navigation.navigate(StackNav.Payment, {
      title: strings.paymentMethods,
      desc: strings.cancelBookingPaymentDesc,
    });
  };

  const onPressCancel = () => {
    SheetRef?.current?.hide();
  };

  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        backgroundColor: colors.dark ? colors.dark3 : colors.grayScale3,
        ...styles.actionSheetIndicator,
      }}
      containerStyle={[
        localStyles.actionSheetContainer,
        {backgroundColor: colors.backgroundColor},
      ]}>
      <View style={localStyles.bottomContainer}>
        <CText
          type={'B22'}
          color={colors.redColor}
          style={styles.mt5}
          align={'center'}>
          {strings.cancelBooking}
        </CText>
        <CDivider style={styles.mv20} />
        <CText type={'b18'} align={'center'}>
          {strings.areYouSure}
        </CText>
        <CText type={'M16'} style={styles.mt15} align={'center'}>
          {strings.cancelBookingDesc}
        </CText>
        <View style={localStyles.btnContainer}>
          <CButton
            title={strings.cancel}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            color={colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            onPress={onPressCancel}
          />
          <CButton
            title={strings.yesCancel}
            type={'S16'}
            color={colors.white}
            containerStyle={localStyles.skipBtnContainer}
            onPress={onPressLogOut}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.ph20,
  },
  btnContainer: {
    ...styles.pv30,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  bottomContainer: {
    ...styles.pv10,
  },
});

export default CancelBookingModal;
