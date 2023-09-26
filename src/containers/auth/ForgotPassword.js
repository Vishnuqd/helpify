import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import {useSelector} from 'react-redux';
import {
  Email_Icon,
  ForgotPassword_Dark,
  ForgotPassword_Light,
  Sms_Icon,
} from '../../assets/svgs';
import {getHeight, moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';

const ForgotPassword = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [isSelected, setIsSelected] = useState('sms');

  const onPressSms = () => {
    setIsSelected(isSelected === 'sms' ? '' : 'sms');
  };

  const onPressEmail = () => {
    setIsSelected(isSelected === 'email' ? '' : 'email');
  };

  const onPressPinContinue = () =>
    navigation.navigate(StackNav.ForgotPasswordOtp);

  const RenderMode = memo(({title, icon, msgId, onPress, isActive}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          localStyles.mainContainer,
          {
            borderColor: isActive ? colors.primary : colors.bColor,
          },
        ]}>
        {icon}
        <View style={[styles.ml20, styles.flex]}>
          <CText type={'m14'} color={colors.grayScale6}>
            {title}
          </CText>
          <CText style={styles.mt10} type={'b16'}>
            {msgId}
          </CText>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <CSafeAreaView>
      <CHeader title={strings.forgotPswd} />
      <ScrollView bounces={false} contentContainerStyle={localStyles.root}>
        <View style={[styles.mv20, styles.selfCenter]}>
          {colors.dark ? (
            <ForgotPassword_Dark
              width={moderateScale(240)}
              height={getHeight(240)}
            />
          ) : (
            <ForgotPassword_Light
              width={moderateScale(240)}
              height={getHeight(240)}
            />
          )}
        </View>
        <View>
          <CText type={'m18'} style={styles.mt30}>
            {strings.forgotPasswordDesc}
          </CText>
          <RenderMode
            title={strings.viaSms}
            icon={<Sms_Icon />}
            msgId="+1 233 456 78 90"
            onPress={() => onPressSms()}
            isActive={isSelected === 'sms'}
          />
          <RenderMode
            title={strings.viaEmail}
            icon={<Email_Icon />}
            msgId="qweew********1233@gmai.com"
            onPress={() => onPressEmail()}
            isActive={isSelected === 'email'}
          />
        </View>
      </ScrollView>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={onPressPinContinue}
        containerStyle={styles.m20}
      />
    </CSafeAreaView>
  );
};

export default ForgotPassword;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.justifyEnd,
    ...styles.flex,
  },
  mainContainer: {
    ...styles.p15,
    ...styles.flexRow,
    ...styles.mt20,
    ...styles.itemsCenter,
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(30),
  },
});
