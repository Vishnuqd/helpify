import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import CText from '../../../components/common/CText';
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import {getHeight, moderateScale} from '../../../common/constants';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {colorData, houseSizeData} from '../../../api/constant';
import ColorComponent from '../../../components/homeComponent/ColorComponent';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function Painting({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);
  const title = route?.params?.item;
  const [houseSize, setHouseSize] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [houseSize]);

  const onPressContinue = () => navigation.navigate(StackNav.BookingDetail);

  const onChangeHouseSize = value => setHouseSize(value);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={title} rightIcon={<RightIcon />} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}>
        <CText type={'s16'} style={styles.mb20}>
          {strings.paintingDesc}
        </CText>
        <CText type={'s16'} style={styles.mb10}>
          {'Size of House'}
        </CText>
        <Dropdown
          style={[
            localStyles.dropdownStyle,
            {
              backgroundColor: colors.inputBg,
              borderColor: colors.bColor,
              color: colors.white,
            },
          ]}
          placeholderStyle={{color: colors.grayScale5}}
          data={houseSizeData}
          maxHeight={moderateScale(180)}
          labelField="label"
          valueField="value"
          placeholder={'Select Size of House'}
          value={houseSize}
          itemTextStyle={{
            color: colors.textColor,
            fontSize: moderateScale(16),
          }}
          onChange={onChangeHouseSize}
          selectedTextStyle={{
            color: colors.textColor,
          }}
          itemContainerStyle={{
            backgroundColor: colors.inputBg,
          }}
          activeColor={colors.inputBg}
        />
        <CText type={'s16'} style={styles.mb10}>
          {'Select Paint Color'}
        </CText>
        <View style={localStyles.chipMainContainer}>
          {colorData.map((item, index) => {
            return <ColorComponent item={item} index={index} />;
          })}
        </View>
      </ScrollView>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={onPressContinue}
        containerStyle={localStyles.btnContainerStyle}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  dropdownStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph25,
    ...styles.mb15,
  },
  chipMainContainer: {
    ...styles.wrap,
    ...styles.flexRow,
    ...styles.selfCenter,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
});
