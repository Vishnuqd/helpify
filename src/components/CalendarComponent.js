import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CText from './common/CText';
import {styles} from '../themes';
import {deviceWidth, moderateScale} from '../common/constants';
import {Email_Icon} from '../assets/svgs';
import strings from '../i18n/strings';

const CalendarComponent = props => {
  const {
    item,
    isCompleted = true,
    isComplete = false,
    title,
    textColor,
  } = props;
  const colors = useSelector(state => state.theme.theme);

  return (
    <View
      style={[
        localStyles.root,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
      <View style={localStyles.innerContainer}>
        <ImageBackground
          source={item?.productImage}
          style={localStyles.imageStyle}
          imageStyle={{borderRadius: moderateScale(20)}}></ImageBackground>
        <View style={localStyles.rightContainer}>
          <View style={[styles.flex, styles.itemsStart, styles.justifyEvenly]}>
            <CText type={'b16'} numberOfLines={1} style={localStyles.textStyle}>
              {item?.category}
            </CText>
            <CText
              type={'S14'}
              numberOfLines={1}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}
              style={localStyles.textStyle}>
              {item?.name}
            </CText>
            <TouchableOpacity
              style={[
                localStyles.btnTextContainer,
                {
                  backgroundColor:
                    isCompleted && !isComplete ? colors.redColor : textColor,
                },
              ]}>
              <CText
                type={'S12'}
                color={colors.white}
                numberOfLines={1}
                style={styles.mh5}>
                {isCompleted && !isComplete ? strings.canceled : title}
              </CText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.ml5}>
            <Email_Icon width={moderateScale(60)} height={moderateScale(60)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(CalendarComponent);

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph10,
    ...styles.pv15,
    ...styles.shadowStyle,
    width: deviceWidth - moderateScale(40),
    ...styles.mb15,
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
  },
  innerContainer: {
    ...styles.justifyCenter,
    ...styles.flexRow,
  },
  imageStyle: {
    width: moderateScale(90),
    height: moderateScale(90),
    resizeMode: 'cover',
  },
  textStyle: {
    ...styles.flex,
  },
  rightContainer: {
    ...styles.flex,
    ...styles.rowSpaceBetween,
    ...styles.ml10,
  },
  btnTextContainer: {
    ...styles.p5,
    ...styles.center,
    ...styles.justifyCenter,
    borderRadius: moderateScale(8),
  },
  btnContainer: {
    ...styles.pb5,
    ...styles.rowSpaceAround,
  },
});
