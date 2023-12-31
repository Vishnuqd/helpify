import {ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import HomeBanner from '../../../components/homeComponent/HomeBanner';
import images from '../../../assets/images';

export default function SpecialOffers() {
  const colors = useSelector(state => state.theme.theme);

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };
  return (
    <CSafeAreaView>
      <CHeader title={strings.specialOffers} rightIcon={<RightIcon />} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.ph20}>
        <HomeBanner image={images.swiperImage1} />
        <HomeBanner image={images.swiperImage2} />
        <HomeBanner image={images.swiperImage3} />
        <HomeBanner image={images.swiperImage4} />
      </ScrollView>
    </CSafeAreaView>
  );
}
