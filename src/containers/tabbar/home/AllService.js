import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {allServicesData} from '../../../api/constant';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {useSelector} from 'react-redux';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function AllService({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const onPressItem = item => {
    navigation.navigate(StackNav.ProductCategory, {item: item});
  };

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.categoryRoot}>
        {item?.image}
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {item.title}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.allServices} />
      <FlashList
        data={allServicesData}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  categoryRoot: {
    width: '100%',
    ...styles.itemsCenter,
    ...styles.mv10,
  },
});
