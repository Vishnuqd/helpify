import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Custom Imports
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';

const ColorComponent = ({item}) => {
  const colors = useSelector(state => state.theme.theme);
  const [selectedColor, setSelectedColor] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedColor]);

  return (
    <TouchableOpacity
      onPress={() => setSelectedColor(item)}
      style={[localStyles.colorContainer, {backgroundColor: item}]}>
      {item === selectedColor && (
        <Ionicons
          name={'checkmark-sharp'}
          size={moderateScale(28)}
          color={colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(ColorComponent);

const localStyles = StyleSheet.create({
  colorContainer: {
    height: moderateScale(45),
    width: moderateScale(45),
    ...styles.center,
    borderRadius: moderateScale(45) / 2,
    ...styles.mt15,
    ...styles.mh5,
  },
});
