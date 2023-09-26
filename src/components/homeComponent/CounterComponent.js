import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CText from '../common/CText';
import {styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';

export default function CounterComponent({title1, title2}) {
  const colors = useSelector(state => state.theme.theme);
  const [quantity, setQuantity] = React.useState(0);

  const onPressAdd = () => setQuantity(quantity + 1);

  const onPressRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View
      style={[
        localStyles.quantityButton,
        {backgroundColor: colors.dark ? colors.dark2 : colors.white},
      ]}>
      <View style={styles.flex}>
        <CText numberOfLines={1} type={'b18'}>
          {title1 ? title1 : 'Working Hours'}
        </CText>
        {title2 && (
          <CText numberOfLines={1} type={'r14'}>
            {title2}
          </CText>
        )}
      </View>
      <View style={localStyles.btnContainer}>
        <TouchableOpacity
          style={[
            localStyles.minusBtnContainer,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.primaryTransparent,
            },
          ]}
          onPress={onPressRemove}>
          <Ionicons
            name={'remove'}
            size={moderateScale(24)}
            color={colors.dark ? colors.white : colors.black}
          />
        </TouchableOpacity>
        <CText type={'b18'} align={'center'} style={localStyles.quantityText}>
          {quantity}
        </CText>
        <TouchableOpacity
          style={[
            localStyles.minusBtnContainer,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.primaryTransparent,
            },
          ]}
          onPress={onPressAdd}>
          <Ionicons
            name={'add'}
            size={moderateScale(24)}
            color={colors.dark ? colors.white : colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  quantityButton: {
    ...styles.ph20,
    ...styles.pv15,
    ...styles.mb20,
    ...styles.rowSpaceBetween,
    borderRadius: moderateScale(20),
    ...styles.shadowStyle,
  },
  quantityText: {
    width: moderateScale(40),
    ...styles.center,
  },
  btnContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  minusBtnContainer: {
    ...styles.center,
    height: getHeight(40),
    width: getHeight(40),
    borderRadius: moderateScale(20),
  },
});
