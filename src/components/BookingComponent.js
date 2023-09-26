import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CText from './common/CText';
import {commonColor, styles} from './../themes';
import {deviceWidth, moderateScale} from './../common/constants';
import {Email_Icon} from './../assets/svgs';
import strings from './../i18n/strings';
import CDivider from './common/CDivider';
import CButton from './common/CButton';
import images from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../navigation/NavigationKeys';

const BookingComponent = props => {
  const {
    item,
    isCompleted = true,
    isComplete = false,
    title,
    textColor,
    btnText,
    onPressBtn,
  } = props;
  const colors = useSelector(state => state.theme.theme);
  const [isShow, setIsShow] = React.useState(false);
  const navigation = useNavigation();

  const onPressViewETicket = () => navigation.navigate(StackNav.EReceipt);
  const onPressChat = () =>
    navigation.navigate(StackNav.CustomerService, {title: item?.name});

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
          <TouchableOpacity style={styles.ml5} onPress={onPressChat}>
            <Email_Icon width={moderateScale(60)} height={moderateScale(60)} />
          </TouchableOpacity>
        </View>
      </View>
      <CDivider style={styles.mv15} />
      {isShow && (
        <View>
          <View style={localStyles.dateContainer}>
            <CText
              type={'S14'}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
              {strings.dateAndTime}
            </CText>
            <CText type={'S14'} color={colors.grayScale9}>
              {item?.time}
            </CText>
          </View>
          <View style={localStyles.dateContainer}>
            <CText
              type={'S14'}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
              {strings.location}
            </CText>
            <CText type={'S14'}>{item?.address}</CText>
          </View>
          <Image
            source={colors.dark ? images.mapDark : images.mapLight}
            style={localStyles.mapStyle}
          />
          {!isCompleted && (
            <View>
              <View style={localStyles.btnContainer}>
                <CButton
                  title={btnText}
                  type={'S14'}
                  color={colors.primary}
                  containerStyle={localStyles.skipBtnContainer}
                  bgColor={colors.tranparent}
                  onPress={onPressBtn}
                />
                <CButton
                  title={strings.viewEReceipt}
                  type={'S14'}
                  color={colors.white}
                  onPress={onPressViewETicket}
                  containerStyle={localStyles.skipBtnContainer}
                />
              </View>
            </View>
          )}
          {isComplete && (
            <CButton
              title={strings.viewEReceipt}
              type={'S14'}
              color={colors.white}
              onPress={onPressViewETicket}
              containerStyle={localStyles.viewETicketBtn}
            />
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={() => setIsShow(!isShow)}
        style={localStyles.isShowContainer}>
        <Ionicons
          name={isShow ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={moderateScale(20)}
          color={colors.primary}
          style={styles.selfCenter}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(BookingComponent);

const localStyles = StyleSheet.create({
  root: {
    ...styles.p10,
    ...styles.shadowStyle,
    width: deviceWidth - moderateScale(40),
    ...styles.mt15,
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
  locationSubContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  locationContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
    ...styles.mb5,
  },
  freeContainer: {
    height: moderateScale(22),
    width: moderateScale(36),
    borderRadius: moderateScale(8),
    ...styles.selfEnd,
    ...styles.center,
    backgroundColor: commonColor.primary5,
    right: moderateScale(10),
    top: moderateScale(10),
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
  skipBtnContainer: {
    width: '45%',
    height: moderateScale(35),
    borderRadius: moderateScale(17),
    borderWidth: moderateScale(1),
    borderColor: commonColor.primary,
  },
  isShowContainer: {
    width: '100%',
    ...styles.center,
  },
  mapStyle: {
    width: '96%',
    height: moderateScale(150),
    borderRadius: moderateScale(20),
    ...styles.mv10,
    ...styles.mb15,
    ...styles.selfCenter,
    resizeMode: 'cover',
  },
  dateContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mb10,
    ...styles.mh5,
  },
  viewETicketBtn: {
    width: '96%',
    height: moderateScale(35),
    borderRadius: moderateScale(17),
    borderWidth: moderateScale(1),
    borderColor: commonColor.primary,
    ...styles.selfCenter,
    ...styles.mb10,
  },
});
