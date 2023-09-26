import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {StackNav} from '../../../navigation/NavigationKeys';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {getHeight, moderateScale} from '../../../common/constants';
import {applianceData} from '../../../api/constant';
import CButton from '../../../components/common/CButton';

export default function Appliance({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);
  const title = route?.params?.item;
  const [selectedType, setSelectedType] = useState([]);
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedType]);

  const onPressContinue = () => navigation.navigate(StackNav.BookingDetail);

  const onPressItem = value => {
    if (selectedType.includes(value)) {
      setSelectedType(selectedType.filter(item => item !== value));
    } else {
      setSelectedType([...selectedType, value]);
    }
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const renderItemComponent = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[
          localStyles.quantityButton,
          {backgroundColor: colors.dark ? colors.dark2 : colors.white},
        ]}>
        <CText numberOfLines={1} type={'S18'}>
          {item}
        </CText>
        <Ionicons
          name={
            item == selectedType.includes(item)
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={moderateScale(22)}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const headerComponent = () => {
    return (
      <CText type={'s16'} style={styles.mb20}>
        {strings.applianceDesc}
      </CText>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={title} rightIcon={<RightIcon />} />
      <FlatList
        data={applianceData}
        extraData={extraData}
        renderItem={renderItemComponent}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={headerComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
        estimatedItemSize={10}
      />
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
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
  quantityButton: {
    ...styles.ph20,
    ...styles.pv15,
    ...styles.mb20,
    ...styles.rowSpaceBetween,
    borderRadius: moderateScale(20),
    ...styles.shadowStyle,
  },
});
