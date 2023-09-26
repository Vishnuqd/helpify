// Library Imports
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {CancelIcon, VideoOffIcon, VolumeIcon} from '../../../assets/svgs';

export default function CallingScreen({navigation, route}) {
  const title = route.params?.title;
  const colors = useSelector(state => state.theme.theme);

  const onPressClose = () => navigation.goBack();

  const RenderIcon = ({icon, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          localStyles.iconStyle,
          {
            backgroundColor: colors.textColor,
          },
        ]}>
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader />
      <View style={localStyles.root}>
        <View></View>
        <View>
          <Image source={images.cleaningImg2} style={localStyles.imgStyle} />
          <CText
            type={'B24'}
            align={'center'}
            style={styles.mt20}
            color={colors.textColor}>
            {title}
          </CText>
          <CText
            type={'S16'}
            align={'center'}
            style={styles.mt10}
            color={colors.dark ? colors.grayScale5 : colors.grayScale3}>
            {'01:25 minutes'}
          </CText>
        </View>
        <View style={localStyles.bottomContainer}>
          <RenderIcon icon={<CancelIcon />} onPress={onPressClose} />
          <RenderIcon icon={<VideoOffIcon />} />
          <RenderIcon icon={<VolumeIcon />} />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.justifyBetween,
  },
  imgStyle: {
    width: moderateScale(200),
    height: moderateScale(200),
    ...styles.selfCenter,
    borderRadius: moderateScale(100),
  },
  iconStyle: {
    borderRadius: moderateScale(30),
    width: moderateScale(60),
    height: moderateScale(60),
    ...styles.center,
  },
  bottomContainer: {
    ...styles.rowSpaceAround,
    ...styles.itemsCenter,
    ...styles.mh40,
    ...styles.mb10,
  },
});
