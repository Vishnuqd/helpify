import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {StackNav} from '../../../navigation/NavigationKeys';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {getHeight, moderateScale} from '../../../common/constants';
import CInput from '../../../components/common/CInput';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CButton from '../../../components/common/CButton';

export default function Plumbing({navigation, route}) {
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

  const [noOfPipes, setNoOfPipes] = useState('');
  const [damageOccurred, setDamageOccurred] = useState('');
  const [noOfPipesStyle, setNoOfPipesStyle] = useState(BlurredStyle);
  const [damageOccurredStyle, setDamageOccurredStyle] = useState(BlurredStyle);

  const onFocusNoOfPipes = () => setNoOfPipesStyle(FocusedStyle);
  const onBlurNoOfPipes = () => setNoOfPipesStyle(BlurredStyle);
  const onFocusDamageOccurred = () => setDamageOccurredStyle(FocusedStyle);
  const onBlurDamageOccurred = () => setDamageOccurredStyle(BlurredStyle);

  const onChangeNoOfPipes = value => setNoOfPipes(value);
  const onChangeDamageOccurred = value => setDamageOccurred(value);

  const onPressContinue = () => navigation.navigate(StackNav.BookingDetail);

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
      <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <CText type={'s16'}>{strings.plumbingDesc}</CText>
        <CInput
          label={strings.noOfWaterPipes}
          placeHolder={strings.enterNoOfWaterPipes}
          _value={noOfPipes}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangeNoOfPipes}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            noOfPipesStyle,
          ]}
          keyBoardType={'number-pad'}
          _onFocus={onFocusNoOfPipes}
          onBlur={onBlurNoOfPipes}
        />
        <CInput
          label={strings.damageOccurred}
          placeHolder={strings.enterDamageOccurred}
          _value={damageOccurred}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangeDamageOccurred}
          inputContainerStyle={[
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            damageOccurredStyle,
          ]}
          _onFocus={onFocusDamageOccurred}
          onBlur={onBlurDamageOccurred}
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
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
});
