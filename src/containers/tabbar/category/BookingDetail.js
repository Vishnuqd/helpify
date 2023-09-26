import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import CText from '../../../components/common/CText';
import CounterComponent from '../../../components/homeComponent/CounterComponent';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import {deviceWidth, moderateScale} from '../../../common/constants';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import {timeData} from '../../../api/constant';
import CInput from '../../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';

export default function BookingDetail({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [selectedDate, setSelectedDate] = useState('');

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const [promoCode, setPromoCode] = useState('');
  const [chatStyle, setChatStyle] = useState(BlurredStyle);

  const onFocusInput = () => setChatStyle(FocusedStyle);

  const onBlurInput = () => setChatStyle(BlurredStyle);

  const onChangePromo = text => setPromoCode(text);

  const onPressContinue = () =>
    navigation.navigate(StackNav.Address, {
      item: strings.shippingAddress,
    });

  const onPressAddPromo = () => navigation.navigate(StackNav.AddPromo);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.bookingDetails} rightIcon={<RightIcon />} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <CText type={'B16'} style={styles.mb15}>
          {strings.selectDate}
        </CText>
        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          theme={{
            backgroundColor: colors.primaryTransparent,
            calendarBackground: colors.dark
              ? colors.dark3
              : colors.primaryTransparent,
            textSectionTitleColor: colors.textColor,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.primary,
            dayTextColor: colors.dark ? colors.white : colors.grayScale8,
            textDisabledColor: colors.textColor,
            dotColor: colors.primary,
            selectedDotColor: colors.primary,
            arrowColor: colors.primary,
            disabledArrowColor: colors.textColor,
            monthTextColor: colors.textColor,
            indicatorColor: colors.primary,
            textDayFontFamily: 'Urbanist-Regular',
            textMonthFontFamily: 'Urbanist-Bold',
            textDayHeaderFontFamily: 'Urbanist-Semibold',
            textMonthFontSize: 18,
          }}
          style={localStyles.calendarStyle}
          hideExtraDays={true}
        />
        <CounterComponent title2={strings.bookingDesc} />
        <CText type={'B16'} style={styles.mb15}>
          {strings.chooseStartTime}
        </CText>
        <View style={styles.mb15}>
          <MostPopularCategory chipsData={timeData} />
        </View>
        <CText type={'b18'}>{strings.promoCode}</CText>
        <View style={styles.rowCenter}>
          <CInput
            placeHolder={strings.enterPromoCode}
            keyBoardType={'default'}
            _value={promoCode}
            autoCapitalize={'none'}
            toGetTextFieldValue={onChangePromo}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              chatStyle,
            ]}
            _onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
          <TouchableOpacity
            onPress={onPressAddPromo}
            style={[
              localStyles.sendBtn,
              {
                backgroundColor: colors.dark
                  ? colors.dark3
                  : colors.primaryTransparent,
              },
            ]}>
            <Ionicons
              name={'add-sharp'}
              size={moderateScale(26)}
              color={colors.dark ? colors.white : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </KeyBoardAvoidWrapper>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={onPressContinue}
        containerStyle={localStyles.btnContainerStyle}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
  calendarStyle: {
    borderRadius: moderateScale(10),
    ...styles.mb20,
  },
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.ph15,
    ...styles.flexGrow1,
    width: deviceWidth - moderateScale(100),
  },
  sendBtn: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    ...styles.rowCenter,
    ...styles.ml10,
  },
});
