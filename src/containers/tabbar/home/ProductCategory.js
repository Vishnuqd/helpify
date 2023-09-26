import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import ProductShortDetail from '../../../components/homeComponent/ProductShortDetail';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';
import HomeServiceComponent from '../../../components/HomeServiceComponent';

export default function ProductCategory({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const onPressDetail = itm =>
    navigation.navigate(StackNav.ProductDetail, {item: itm});

  const renderItem = ({item, index}) => {
    return (
      <HomeServiceComponent
        item={item}
        index={index}
        onPress={() => onPressDetail(item)}
      />
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={item?.title} rightIcon={<RightIcon />} />
      <View style={localStyles.root}>
        <FlashList
          data={item?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
});
