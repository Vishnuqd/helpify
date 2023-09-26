// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {commonColor, styles} from '../../../themes';
import strings from '../../../i18n/strings';
import {bookedData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';
import BookingComponent from '../../../components/BookingComponent';

export default function Completed() {
  const renderVerticalItem = ({item, index}) => {
    return (
      <BookingComponent
        item={item}
        isCompleted={true}
        isComplete={true}
        btnText={strings.cancelBooking}
        textColor={commonColor.primary}
        title={strings.completed}
      />
    );
  };

  return (
    <View style={localStyles.root}>
      {!!bookedData && bookedData.length ? (
        <FlashList
          data={bookedData}
          renderItem={renderVerticalItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          contentContainerStyle={localStyles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <RenderNullComponent
          title1={strings.onGoingNullTitle}
          title2={strings.completedNullDesc}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
  },
});
