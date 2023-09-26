import {Image, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';

// Custom Imports
import {styles} from '../../themes';
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';

const HomeBanner = ({image}) => {
  const colors = useSelector(state => state.theme.theme);
  const renderSwiperItem = ({item}) => {
    return (
      <View style={localStyles.swiperItemContainer}>
        <Image
          resizeMode="cover"
          source={image}
          style={[
            localStyles.swiperImageStyle,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.transparentSilver,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <SwiperFlatList
      data={[1, 2, 3, 4]}
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      renderItem={renderSwiperItem}
      paginationStyleItemActive={{
        ...localStyles.paginationStyleItemActive,
        backgroundColor: colors.white,
      }}
      paginationStyleItemInactive={{
        ...localStyles.paginationStyleItemInactive,
        backgroundColor: colors.white,
      }}
      paginationStyleItem={localStyles.paginationStyleItem}
      style={localStyles.swiperStyle}
    />
  );
};

const localStyles = StyleSheet.create({
  paginationStyleItem: {
    ...styles.mh5,
    top: moderateScale(-40),
  },
  paginationStyleItemActive: {
    height: getHeight(6),
    width: moderateScale(16),
    borderRadius: moderateScale(3),
  },
  paginationStyleItemInactive: {
    height: moderateScale(6),
    width: moderateScale(6),
    borderRadius: moderateScale(3),
  },
  swiperItemContainer: {
    ...styles.mb10,
    width: deviceWidth - moderateScale(40),
    height: getHeight(160),
  },
  swiperStyle: {
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  swiperImageStyle: {
    width: deviceWidth - moderateScale(40),
    height: getHeight(160),
    borderRadius: moderateScale(20),
  },
});

export default memo(HomeBanner);
