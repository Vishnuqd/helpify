import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {
  MasterCardIcon,
  Menu_Dark,
  Menu_Light,
  RightDark,
  RightLight,
} from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import CDivider from '../../../components/common/CDivider';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {moderateScale} from '../../../common/constants';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function CheckOut({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);

  const onPressPayment = () =>
    navigation.navigate(StackNav.SetPin, {
      title: strings.paymentMethods,
      desc: strings.paymentDesc1,
      isWallet: true,
    });

  const onPressChangeCard = () => {
    navigation.goBack();
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const InnerContainer = ({children}) => {
    return (
      <View
        style={[
          localStyles.innerContainer,
          {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
        ]}>
        {children}
      </View>
    );
  };

  const InnerText = props => {
    const {text1, text2, isBottom = true, isIcon = false} = props;
    return (
      <View style={[styles.rowSpaceBetween, isBottom && styles.pb15]}>
        <CText
          color={colors.dark ? colors.grayScale3 : colors.grayScale7}
          type={'s14'}>
          {text1}
        </CText>

        {isIcon ? (
          <Ionicons
            name={'chevron-down-outline'}
            size={moderateScale(20)}
            color={colors.textColor}
          />
        ) : (
          <CText type={'B16'}>{text2}</CText>
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.reviewSummary} rightIcon={<RightIcon />} />
      <View style={[styles.flex, styles.ph20]}>
        <InnerContainer>
          <InnerText text1={strings.service} text2={'House Cleaning'} />
          <InnerText text1={strings.category} text2={'Cleaning'} />
          <InnerText text1={strings.worker} text2={'Jenny Wilson'} />
          <InnerText
            text1={strings.dateAndTime}
            text2={'Dec 23, 2024 | 10:00 AM'}
          />
          <InnerText
            text1={strings.workingHours}
            text2={'2 Hours'}
            isBottom={false}
          />
        </InnerContainer>
        <InnerContainer>
          <InnerText
            text1={'House Cleaning Details'}
            isIcon={true}
            isBottom={false}
          />
        </InnerContainer>
        <InnerContainer>
          <InnerText text1={strings.amount} text2={'$1300'} />
          <InnerText text1={strings.promo} text2={'- $100'} isBottom={false} />
          <CDivider style={styles.mv15} />
          <InnerText text1={strings.amount} text2={'$1200'} isBottom={false} />
        </InnerContainer>
        <View
          style={[
            localStyles.paymentContainer,
            {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
          ]}>
          <View style={styles.rowCenter}>
            <MasterCardIcon />
            <CText type={'b16'} style={styles.mh10}>
              {'•••• •••• •••• •••• 4679'}
            </CText>
          </View>
          <TouchableOpacity onPress={onPressChangeCard}>
            <CText type={'B16'} color={colors.primary}>
              {strings.change}
            </CText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={localStyles.bottomContainer}>
        <CButton
          type={'b16'}
          title={strings.continueToPayment}
          style={styles.mr10}
          containerStyle={localStyles.addToCartContainer}
          icon={colors.dark ? <RightDark /> : <RightLight />}
          onPress={onPressPayment}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  bottomContainer: {
    ...styles.pv10,
    ...styles.ph20,
  },
  addToCartContainer: {
    width: '100%',
    ...styles.shadowStyle,
  },
  innerContainer: {
    ...styles.mb20,
    ...styles.pv15,
    ...styles.ph20,
    borderRadius: moderateScale(12),
    ...styles.shadowStyle,
  },
  paymentContainer: {
    ...styles.mb20,
    ...styles.pv15,
    ...styles.ph20,
    borderRadius: moderateScale(12),
    ...styles.shadowStyle,
    ...styles.rowSpaceBetween,
  },
});
