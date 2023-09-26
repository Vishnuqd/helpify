import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import CText from '../../../components/common/CText';
import CounterComponent from '../../../components/homeComponent/CounterComponent';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import {houseCleaningData} from '../../../api/constant';

export default function Cleaning({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);
  const title = route?.params?.item;

  const onPressContinue = () => navigation.navigate(StackNav.BookingDetail);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => {
    return (
      <CText type={'s16'} style={styles.mb15}>
        {strings.cleaningDesc}
      </CText>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={title} rightIcon={<RightIcon />} />
      <FlashList
        data={houseCleaningData}
        renderItem={({item}) => <CounterComponent title1={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
        estimatedItemSize={10}
        ListHeaderComponent={RenderHeader}
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
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mv10,
  },
});
