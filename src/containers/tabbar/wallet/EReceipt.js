// Library import
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef} from 'react';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import images from '../../../assets/images';
import {commonColor, styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import EReceiptMenu from '../../../components/models/EReceiptMenu';
import {TabNav} from '../../../navigation/NavigationKeys';

export default function EReceipt() {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const textColor2 = colors.dark ? colors.grayScale3 : colors.grayScale7;
  const eReceiptSheetRef = createRef();

  const onPressMenu = () => eReceiptSheetRef?.current?.show();

  const onPressBack = () => navigation.navigate(TabNav.BookingsTab);

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressMenu} style={styles.ph10}>
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
    const {
      text1,
      text2,
      isBottom = true,
      isPaid = true,
      isCopy = false,
    } = props;
    return (
      <View style={[styles.rowSpaceBetween, isBottom && styles.pb15]}>
        <CText color={textColor2} type={'s14'}>
          {text1}
        </CText>
        {!!isPaid ? (
          <View style={[styles.flexRow, styles.itemsCenter]}>
            <CText type={'B16'}>{text2}</CText>
            {isCopy && (
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={moderateScale(18)}
                  color={colors.primary}
                  style={styles.ml5}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={[
              localStyles.paidContainer,
              {backgroundColor: colors.primaryTransparent},
            ]}>
            <CText color={colors.primary} type={'s12'}>
              {strings.paid}
            </CText>
          </View>
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        onPressBack={onPressBack}
        title={strings.eReceipt}
        rightIcon={<RightIcon />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={colors.dark ? images.barcodeImage : images.barcodeImageLight}
          style={localStyles.barCodeImageStyle}
        />
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
            // text2={'>'}
            isBottom={false}
          />
        </InnerContainer>
        <InnerContainer>
          <InnerText text1={strings.amount} text2={'$125.00'} />
          <InnerText text1={strings.promo} text2={'- $37.50'} />
          <InnerText
            text1={strings.paymentMethods}
            text2={strings.creditCard}
          />
          <InnerText
            text1={strings.date}
            text2={'Dec 14, 2024 | 10:01:16 AM'}
          />
          <InnerText
            text1={strings.transactionId}
            isCopy={true}
            text2={'SK7263727399'}
          />
          <InnerText text1={strings.status} isPaid={false} isBottom={false} />
        </InnerContainer>
      </ScrollView>
      <EReceiptMenu SheetRef={eReceiptSheetRef} />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  barCodeImageStyle: {
    width: '100%',
    height: getHeight(130),
    ...styles.selfCenter,
    ...styles.mv10,
  },
  innerContainer: {
    ...styles.mv10,
    ...styles.pv15,
    ...styles.ph20,
    ...styles.mh20,
    borderRadius: moderateScale(12),
    ...styles.shadowStyle,
  },
  paidContainer: {
    ...styles.ph10,
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(7),
  },
});
