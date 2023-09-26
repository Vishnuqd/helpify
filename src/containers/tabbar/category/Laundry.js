import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {StackNav} from '../../../navigation/NavigationKeys';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {getHeight, moderateScale} from '../../../common/constants';
import {yesNoData} from '../../../api/constant';
import CInput from '../../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CButton from '../../../components/common/CButton';

export default function Laundry({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);
  const title = route?.params?.item;
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const [clothWeight, setClothWeight] = useState('');
  const [ironing, setIroning] = useState('');
  const [fragrance, setFragrance] = useState('');

  const [plateNoStyle, setPlateNoStyle] = useState(BlurredStyle);

  const onFocusPlateNo = () => setPlateNoStyle(FocusedStyle);
  const onBlurPlateNo = () => setPlateNoStyle(BlurredStyle);

  const inChangeIroning = value => setIroning(value);
  const onChangePlateNo = value => setClothWeight(value);
  const onChangeFragrance = value => setFragrance(value);

  const onPressContinue = () => navigation.navigate(StackNav.BookingDetail);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const RightIconInput = () => {
    return <CText type={'s14'}>{'Kg'}</CText>;
  };

  return (
    <CSafeAreaView>
      <CHeader title={title} rightIcon={<RightIcon />} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <CText type={'s16'} style={styles.mb10}>
          {strings.laundryDesc}
        </CText>
        <CInput
          label={'Weight Total Clothing'}
          placeHolder={"Enter total clothing's weight"}
          _value={clothWeight}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangePlateNo}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            plateNoStyle,
          ]}
          _onFocus={onFocusPlateNo}
          onBlur={onBlurPlateNo}
          keyboardType={'number-pad'}
          rightAccessory={RightIconInput}
        />
        <CText type={'B18'} style={styles.mb10}>
          {'Ironing Service'}
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
          data={yesNoData}
          maxHeight={moderateScale(180)}
          labelField="label"
          valueField="value"
          placeholder={strings.selectCarBrand}
          value={ironing}
          itemTextStyle={{
            color: colors.textColor,
            fontSize: moderateScale(16),
          }}
          onChange={inChangeIroning}
          selectedTextStyle={{
            color: colors.textColor,
          }}
          itemContainerStyle={{
            backgroundColor: colors.inputBg,
          }}
          activeColor={colors.inputBg}
        />
        <CText type={'B18'} style={styles.mb10}>
          {'Fragrance Service'}
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
          data={yesNoData}
          maxHeight={moderateScale(180)}
          labelField="label"
          valueField="value"
          placeholder={strings.selectModel}
          value={fragrance}
          itemTextStyle={{
            color: colors.textColor,
            fontSize: moderateScale(16),
          }}
          onChange={onChangeFragrance}
          selectedTextStyle={{
            color: colors.textColor,
          }}
          itemContainerStyle={{
            backgroundColor: colors.inputBg,
          }}
          activeColor={colors.inputBg}
        />
      </KeyBoardAvoidWrapper>
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
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
    ...styles.mb10,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
});
