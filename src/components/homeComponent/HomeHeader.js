import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// custom imports
import {styles} from '../../themes';
import {
  NotificationDark,
  NotificationLight,
  SaveDark,
  SaveLight,
} from '../../assets/svgs';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';

function HomeHeader() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressNotification = () => navigation.navigate(StackNav.Notification);
  const onPressLike = () => navigation.navigate(StackNav.MyWishlist);

  const onPressProfile = () => {
    navigation.navigate(TabNav.ProfileTab);
  };
  return (
    <View style={localStyles.headerContainer}>
      <TouchableOpacity onPress={onPressProfile}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
          }}
          style={localStyles.userImageStyle}
        />
      </TouchableOpacity>
      <View style={localStyles.textContainer}>
        <CText type="m16" numberOfLines={1} color={colors.primaryTextColor}>
          {'Good Morning 👋'}
        </CText>
        <CText type="B20" numberOfLines={1} color={colors.primaryTextColor}>
          {'Andrew Ainsley'}
        </CText>
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressNotification} style={styles.mh10}>
          {colors.dark ? <NotificationDark /> : <NotificationLight />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLike}>
          {colors.dark ? (
            <SaveDark height={moderateScale(23)} width={moderateScale(23)} />
          ) : (
            <SaveLight height={moderateScale(23)} width={moderateScale(23)} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(HomeHeader);

const localStyles = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flex,
    ...styles.mt15,
  },
  userImageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    ...styles.mh10,
    ...styles.flex,
  },
});
