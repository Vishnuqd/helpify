import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {homeProductData} from '../../api/constant';
import {StackNav} from '../../navigation/NavigationKeys';
import HomeServiceComponent from '../HomeServiceComponent';

export default function HomeProductComponent() {
  const navigation = useNavigation();
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
    <FlashList
      data={homeProductData.slice(0, 4)}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={10}
    />
  );
}
