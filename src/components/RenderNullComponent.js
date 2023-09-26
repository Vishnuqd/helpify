import {Image, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';

// Custom Imports
import {styles} from '../themes';
import images from '../assets/images';
import CText from './common/CText';
import {moderateScale} from '../common/constants';

const RenderNullComponent = props => {
  const {title1, title2, imageNull} = props;

  return (
    <View style={localStyles.root}>
      {imageNull ? (
        imageNull
      ) : (
        <Image source={images.searchNullImage} style={localStyles.imageStyle} />
      )}
      {!!title1 && (
        <CText
          type={'b18'}
          align={'center'}
          style={imageNull ? styles.mv10 : styles.mb10}>
          {title1}
        </CText>
      )}
      {!!title2 && (
        <CText type={'r16'} align={'center'}>
          {title2}
        </CText>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flexCenter,
    ...styles.ph20,
  },
  imageStyle: {
    height: moderateScale(200),
    width: '100%',
    ...styles.selfCenter,
    ...styles.mb20,
    resizeMode: 'contain',
  },
});

export default memo(RenderNullComponent);
