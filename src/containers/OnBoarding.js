import React, {useState, useRef, memo, useCallback} from 'react';
import {StyleSheet, FlatList, Image, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {OnBoardingSlide} from '../api/constant';
import {deviceWidth, getHeight, moderateScale} from '../common/constants';
import CButton from '../components/common/CButton';
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';
import {styles} from '../themes';
import {setOnBoarding} from '../utils/asyncstorage';

const RenderOnboardingItem = ({item, index}) => {
  return (
    <View style={localStyles.rendetItemConatiner} key={index}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={localStyles.imageStyle}
      />

      <CText style={styles.mt30} type={'B30'} align={'center'}>
        {item.text}
      </CText>
    </View>
  );
};

const OnBoarding = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{name: StackNav.Auth}],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: deviceWidth * (currentIndex + 1),
      });
    }
  };

  return (
    <CSafeAreaView style={styles.flex}>
      <FlatList
        data={OnBoardingSlide}
        ref={slideRef}
        renderItem={({item, index}) => (
          <RenderOnboardingItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        pagingEnabled
      />

      <View style={styles.rowCenter}>
        {OnBoardingSlide.map((_, index) => (
          <View
            style={[
              localStyles.bottomIndicatorStyle,
              {
                width:
                  index !== currentIndex
                    ? moderateScale(10)
                    : moderateScale(20),
                backgroundColor:
                  index !== currentIndex ? colors.bColor : colors.primary,
              },
            ]}
          />
        ))}
      </View>

      <CButton
        title={currentIndex === 2 ? strings.getStarted : strings.next}
        containerStyle={localStyles.submitButton}
        type={'b18'}
        color={colors.white}
        onPress={onPressRightArrow}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mb15,
    ...styles.mh25,
    height: moderateScale(55),
    borderRadius: moderateScale(50),
  },
  rendetItemConatiner: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  imageStyle: {
    height: '65%',
    width: deviceWidth - moderateScale(40),
    resizeMode: 'contain',
  },
  bottomIndicatorStyle: {
    height: getHeight(10),
    ...styles.mb30,
    ...styles.mt10,
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
});

export default OnBoarding;
