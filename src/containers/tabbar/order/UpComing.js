// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {commonColor, styles} from '../../../themes';
import strings from '../../../i18n/strings';
import {upcomingData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';
import BookingComponent from '../../../components/BookingComponent';
import CancelBookingModal from '../../../components/models/CancelBookingModal';

export default function UpComing() {
  const cancelBookingRef = React.useRef(null);

  const onPressCancel = () => cancelBookingRef?.current?.show();
  const renderVerticalItem = ({item, index}) => {
    return (
      <BookingComponent
        item={item}
        isCompleted={false}
        btnText={strings.cancelBooking}
        textColor={commonColor.primary}
        title={strings.upComing}
        onPressBtn={onPressCancel}
      />
    );
  };

  return (
    <View style={localStyles.root}>
      {!!upcomingData.length ? (
        <FlashList
          data={upcomingData}
          renderItem={renderVerticalItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          contentContainerStyle={localStyles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <RenderNullComponent
          title1={strings.upComingHeader}
          title2={strings.upComingSubHeader}
        />
      )}
      <CancelBookingModal SheetRef={cancelBookingRef} />
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
