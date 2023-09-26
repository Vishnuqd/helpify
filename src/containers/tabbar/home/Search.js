import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import SearchComponent from '../../../components/homeComponent/SearchComponent';
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import {moderateScale} from '../../../common/constants';
import {homeProductData} from '../../../api/constant';
import {StackNav} from '../../../navigation/NavigationKeys';
import CDebounce from '../../../components/common/CDebounce';
import HomeServiceComponent from '../../../components/HomeServiceComponent';
import images from '../../../assets/images';
import CText from '../../../components/common/CText';

export default function Search({navigation}) {
  const [search, setSearch] = useState('');
  const [initialData, setInitialData] = useState([]);

  const debounceSearch = CDebounce(search, 500);

  useEffect(() => {
    setInitialData(homeProductData);
  }, []);

  useEffect(() => {
    if (!!debounceSearch) {
      filterData();
    } else {
      setInitialData(homeProductData);
    }
  }, [debounceSearch]);

  const filterData = () => {
    if (!!debounceSearch) {
      const filteredData = homeProductData.filter(item =>
        item.category.toLowerCase().includes(debounceSearch.toLowerCase()),
      );
      setInitialData(filteredData);
    } else {
      setInitialData(homeProductData);
    }
  };

  const onSearchInput = text => setSearch(text);

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
      <CHeader title={strings.search} />
      <View style={localStyles.root}>
        <SearchComponent search={search} onSearchInput={onSearchInput} />
        {!!initialData.length ? (
          <FlashList
            data={initialData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={10}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={localStyles.nullRoot}>
            <Image
              source={images.searchNullImage}
              style={localStyles.imageStyle}
            />
            <CText type={'b18'} align={'center'} style={styles.mb10}>
              {strings.notFound}
            </CText>
            <CText type={'r16'} align={'center'}>
              {strings.notFoundDesc}
            </CText>
          </View>
        )}
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
    marginTop: moderateScale(-20),
  },
  nullRoot: {
    ...styles.flexCenter,
    ...styles.ph20,
  },
  imageStyle: {
    height: moderateScale(200),
    width: '100%',
    ...styles.selfCenter,
    ...styles.mb20,
    resizeMode: 'contain',
  },
});
