import {StyleSheet} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {cancelData} from '../../../api/constant';
import {styles} from '../../../themes';
import BookingComponent from '../../../components/BookingComponent';

export default function Cancelled() {
  const renderVerticalItem = ({item, index}) => {
    return <BookingComponent item={item} key={index} />;
  };
  return (
    <FlashList
      data={cancelData}
      renderItem={renderVerticalItem}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={10}
      contentContainerStyle={localStyles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
}

const localStyles = StyleSheet.create({
  contentContainerStyle: {
    ...styles.ph20,
    ...styles.pb20,
  },
});
