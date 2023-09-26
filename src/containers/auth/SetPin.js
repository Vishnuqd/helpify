// Library import
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';
import typography from '../../themes/typography';
import SuccessModal from '../../components/models/SuccessModal';
import {RefundSuccessfullIcon} from '../../assets/svgs';

const SetPin = ({navigation, route}) => {
  const colors = useSelector(state => state.theme.theme);
  const title = route.params?.title;
  const isRefund = route.params?.isRefund;
  const [pin, setPin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onPressModalClose = () => setModalVisible(false);

  const onPinChange = code => setPin(code);
  const onPressPinContinue = () => {
    if (!!title) {
      setModalVisible(true);
    } else {
      navigation.navigate(StackNav.SetSecure);
    }
  };

  const onPressERiceipt = () => {
    setModalVisible(false);
    navigation.navigate(StackNav.EReceipt, {item: ''});
  };

  const onPressChat = () => {
    setModalVisible(false);
    navigation.navigate(StackNav.CustomerService, {title: 'Lucy'});
  };
  const onPressOk = () => {
    setModalVisible(false);
    navigation.navigate(TabNav.BookingsTab);
  };

  return (
    <CSafeAreaView>
      <CHeader title={!!title ? title : strings.createNewPin} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <CText type={'r18'} align={'center'}>
            {!!title ? strings.enterPINPayment : strings.pinDesc}
          </CText>
          <OTPInputView
            pinCount={4}
            code={pin}
            onCodeChanged={onPinChange}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[
              localStyles.pinInputStyle,
              {
                color: colors.textColor,
                backgroundColor: colors.inputBg,
                borderColor: colors.borderColor,
              },
            ]}
            codeInputHighlightStyle={{
              borderColor: colors.textColor,
            }}
            style={localStyles.inputStyle}
            secureTextEntry={true}
          />
        </View>
        <CButton
          type={'S16'}
          title={strings.continue}
          onPress={onPressPinContinue}
          containerStyle={localStyles.btnContainerStyle}
        />
        <SuccessModal
          visible={modalVisible}
          onPressModalClose={onPressModalClose}
          itemImage={<RefundSuccessfullIcon style={styles.selfCenter} />}
          headerTitle={
            isRefund
              ? strings.cancelBookingSuccessful
              : strings.bookingSuccessful
          }
          subTitle={
            isRefund ? strings.cancelBookingSucDesc : strings.bookingSucDesc
          }
          btnText1={isRefund ? strings.ok : strings.viewEReceipt}
          btnText2={isRefund ? '' : strings.messageWorkers}
          onPressBtn1={isRefund ? onPressOk : onPressERiceipt}
          onPressBtn2={isRefund ? () => {} : onPressChat}
        />
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default SetPin;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph30,
    ...styles.justifyCenter,
    ...styles.flex,
  },
  pinInputStyle: {
    height: getHeight(60),
    width: moderateScale(75),
    borderRadius: moderateScale(15),
    ...typography.fontSizes.f36,
    ...typography.fontWeights.SemiBold,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  inputStyle: {
    height: getHeight(60),
    ...styles.mv30,
  },
});
