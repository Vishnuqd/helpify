// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {Calendar} from 'react-native-calendars';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {styles} from '../../../themes';
import {
  AppLogoDark,
  AppLogoLight,
  CalendarNullDark,
  CalendarNullLight,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import RenderNullComponent from '../../../components/RenderNullComponent';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
import {StackNav} from '../../../navigation/NavigationKeys';
import SubHeader from '../../../components/SubHeader';
import {upcomingData} from '../../../api/constant';
import CalendarComponent from '../../../components/CalendarComponent';

export default function CalendarTab({}) {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused();
  const [selectedDate, setSelectedDate] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setExtraData(!extraData);
      selectedDate === '' &&
        setSelectedDate(new Date().toISOString().slice(0, 10));
    }
  }, [isFocused]);

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10} onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <CalendarComponent
        item={item}
        isCompleted={false}
        btnText={strings.cancelBooking}
        textColor={colors.primary}
        title={strings.upComing}
      />
    );
  };

  const RenderHeaderComponent = () => {
    return (
      <View style={localStyles.calendarContainer}>
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
        <SubHeader
          title1={
            strings.serviceBooking + ' (' + upcomingData.length.toString() + ')'
          }
          title2={strings.seeAll}
          style={styles.mt20}
        />
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.calendar}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      <View style={localStyles.root}>
        <FlashList
          data={upcomingData}
          extraData={extraData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={<RenderHeaderComponent />}
          ListEmptyComponent={
            <RenderNullComponent
              title1={strings.calendarNullHeader}
              title2={strings.calenderNullSubHeader}
              imageNull={
                colors.dark ? <CalendarNullDark /> : <CalendarNullLight />
              }
            />
          }
          estimatedItemSize={20}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.ph20,
    ...styles.rowSpaceBetween,
  },
  addToCartContainer: {
    width: deviceWidth / 2 + moderateScale(30),
    ...styles.shadowStyle,
  },
  priceContainer: {
    height: getHeight(50),
    ...styles.justifyEvenly,
  },
  calendarContainer: {
    ...styles.mh20,
    ...styles.flex,
  },
  calendarStyle: {
    borderRadius: moderateScale(10),
  },
});
