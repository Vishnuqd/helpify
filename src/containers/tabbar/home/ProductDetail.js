import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {deviceHeight, moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  LocationIcon,
  RatingIcon,
  SaveIcon,
  UnSaveIcon,
} from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import CDivider from '../../../components/common/CDivider';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import Reviews from './Reviews';
import SubHeader from '../../../components/SubHeader';

const RenderImageSample = React.memo(item => {
  return (
    <View>
      <View style={localStyles.imageSample}>
        <Image source={item?.item[0]} style={localStyles.imageContainer} />
        <View style={{width: '48%'}}>
          <Image
            source={item?.item[1]}
            style={[localStyles.imageHorizontal, styles.mb10]}
          />
          <Image source={item?.item[2]} style={localStyles.imageHorizontal} />
        </View>
      </View>
      <View style={[localStyles.imageSample, styles.mt10]}>
        <View style={{width: '48%'}}>
          <Image
            source={item?.item[4]}
            style={[localStyles.imageHorizontal, styles.mb10]}
          />
          <Image source={item?.item[5]} style={localStyles.imageHorizontal} />
        </View>
        <Image source={item?.item[3]} style={localStyles.imageContainer} />
      </View>
    </View>
  );
});

export default function ProductDetail({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);
  const [isLiked, setIsLiked] = useState(false);

  const onPressLike = () => setIsLiked(!isLiked);

  const onPressReview = () => navigation.navigate(StackNav.Reviews);

  const navigationMap = {
    [strings.cleaning]: StackNav.Cleaning,
    [strings.repairing]: StackNav.Repairing,
    [strings.painting]: StackNav.Painting,
    [strings.laundry]: StackNav.Laundry,
    [strings.appliance]: StackNav.Appliance,
    [strings.plumbing]: StackNav.Plumbing,
    [strings.shifting]: StackNav.Shifting,
  };

  const onPressBookNow = itm => {
    const navigationKey = navigationMap[itm];
    if (navigationKey) {
      navigation.navigate(navigationKey, {
        item: item?.category,
      });
    } else {
      navigation.navigate(StackNav.BookingDetail);
    }
  };

  const onPressMessage = () => {
    navigation.navigate(StackNav.CustomerService, {
      title: item?.name,
    });
  };
  return (
    <CSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={item?.productImage}
          style={[
            localStyles.root,
            {backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1},
          ]}>
          <CHeader title={item?.title} />
        </ImageBackground>
        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <CText style={styles.flex} numberOfLines={1} type={'b26'}>
              {item?.category}
            </CText>
            <TouchableOpacity onPress={onPressLike}>
              {isLiked ? (
                <SaveIcon
                  width={moderateScale(26)}
                  height={moderateScale(26)}
                />
              ) : (
                <UnSaveIcon
                  width={moderateScale(26)}
                  height={moderateScale(26)}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={localStyles.subItemStyle}>
            <CText
              type={'B20'}
              numberOfLines={1}
              style={{maxWidth: '50%'}}
              color={colors.primary}>
              {item?.name}
            </CText>
            <RatingIcon
              width={moderateScale(22)}
              height={moderateScale(22)}
              style={styles.ml10}
            />
            <TouchableOpacity style={styles.ml5} onPress={onPressReview}>
              <CText
                type={'s14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
                {item?.rating}
                {' (' + item?.sold + ' ' + strings.reviews + ')'}
              </CText>
            </TouchableOpacity>
          </View>
          <View style={localStyles.subItemStyle}>
            <View
              style={[
                localStyles.paidContainer,
                {backgroundColor: colors.dark3},
              ]}>
              <CText type={'s12'} color={colors.primary}>
                {item?.header}
              </CText>
            </View>
            <LocationIcon
              width={moderateScale(22)}
              height={moderateScale(22)}
              style={[styles.ml10, styles.mr5]}
            />
            <CText
              type={'s14'}
              style={styles.flex}
              numberOfLines={1}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
              {item?.address}
            </CText>
          </View>
          <View style={[styles.mt15, styles.rowStart]}>
            <CText type={'b32'} color={colors.primary}>
              {'$20'}
            </CText>
            <CText style={styles.ml10} color={colors.grayScale5}>
              {'(Floor price)'}
            </CText>
          </View>
          <CDivider style={styles.mt20} />
          <CText numberOfLines={1} style={styles.mt5} type={'b18'}>
            {strings.aboutMe}
          </CText>
          <CText style={styles.mt5} type={'r14'}>
            {strings.descText}
          </CText>
          {!!item?.sample && (
            <View>
              <SubHeader
                title1={strings.photosAndVideos}
                // onPressSeeAll={onPressReview}
                title2={strings.seeAll}
              />
              <RenderImageSample item={item?.sample} />
            </View>
          )}
          <SubHeader
            title1={
              item?.rating + ' (' + item?.sold + ' ' + strings.reviews + ')'
            }
            onPressSeeAll={onPressReview}
            title2={strings.seeAll}
          />
        </View>
        <Reviews isComponent={true} navigation={navigation} />
      </ScrollView>
      <View style={styles.ph20}>
        <View style={localStyles.bottomContainer}>
          <CButton
            title={strings.message}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            color={colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            onPress={onPressMessage}
          />
          <CButton
            title={strings.bookNow}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            onPress={() => onPressBookNow(item?.header)}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    height: deviceHeight / 2 - moderateScale(50),
    width: '100%',
    resizeMode: 'contain',
  },
  productText: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
  },
  subItemStyle: {
    ...styles.mt10,
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  imageSample: {
    ...styles.rowSpaceBetween,
  },
  imageContainer: {
    width: '48%',
    height: moderateScale(240),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
  },
  imageHorizontal: {
    width: '100%',
    height: moderateScale(115),
    borderRadius: moderateScale(20),
    resizeMode: 'cover',
  },
});
