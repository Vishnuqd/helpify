// Library import
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {moderateScale} from '../../../common/constants';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  contactUsData,
  helperCategoryData,
  helperData,
} from '../../../api/constant';
import FaqComponent from '../../../components/FaqComponent';
import {StackNav} from '../../../navigation/NavigationKeys';
import SearchComponent from '../../../components/homeComponent/SearchComponent';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';

export default HelpCenter = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState(0);

  const categoryData = [
    {
      id: 0,
      title: strings.faq,
      onPress: () => setIsSelect(0),
    },
    {
      id: 1,
      title: strings.contactUs,
      onPress: () => setIsSelect(1),
    },
  ];

  const [faqData, setFaqData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFaqData(helperData);
  }, []);

  useEffect(() => {
    filterData();
  }, [search]);

  const filterData = () => {
    if (!!search) {
      const filteredData = helperData.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
      setFaqData(filteredData);
    } else {
      setFaqData(helperData);
    }
  };

  const onSearchInput = text => setSearch(text);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.pr10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const HeaderCategory = () => {
    return categoryData.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={item.onPress}
          style={[
            localStyles.root,
            {
              borderBottomColor:
                isSelect === item.id ? colors.primary : colors.dark3,
            },
          ]}>
          <CText
            type={'s18'}
            align={'center'}
            style={styles.pb20}
            color={isSelect === item.id ? colors.primary : colors.grayScale7}>
            {item.title}
          </CText>
        </TouchableOpacity>
      );
    });
  };

  const RenderHelper = memo(({helperData}) => {
    return helperData.map((item, index) => {
      return <FaqComponent description={item.description} title={item.title} />;
    });
  });

  const onPressContactUs = () => navigation.navigate(StackNav.CustomerService);

  const ContactUsRender = memo(() => {
    return contactUsData.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={onPressContactUs}
          style={[
            localStyles.contactUsContainer,
            {
              backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1,
            },
          ]}>
          <MaterialCommunityIcons
            name={item.icon}
            size={moderateScale(26)}
            color={colors.primary}
            style={styles.ph20}
          />
          <CText type={'b18'}>{item.title}</CText>
        </TouchableOpacity>
      );
    });
  });

  return (
    <CSafeAreaView
      style={{
        backgroundColor: colors.dark ? colors.backgroundColor : colors.white,
      }}>
      <CHeader title={strings.helpCenter} rightIcon={<RightIcon />} />
      <ScrollView
        bounces={false}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}>
        <View style={localStyles.mainContainer}>
          <HeaderCategory />
        </View>
        {isSelect === 0 ? (
          <View>
            <View style={styles.mt15} />
            <MostPopularCategory chipsData={helperCategoryData} />
            <SearchComponent search={search} onSearchInput={onSearchInput} />
            {!!faqData.length ? (
              <RenderHelper helperData={faqData} />
            ) : (
              <View>
                <CText
                  style={styles.mt15}
                  color={colors.primary}
                  align={'center'}
                  type={'b22'}>
                  {strings.noResultFound}
                </CText>
                <CText
                  style={styles.mt15}
                  color={colors.textColor}
                  align={'center'}
                  type={'r18'}>
                  {strings.noResultFoundDesc}
                </CText>
              </View>
            )}
          </View>
        ) : (
          <ContactUsRender />
        )}
      </ScrollView>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flexRow,
    width: '100%',
  },
  root: {
    borderBottomWidth: moderateScale(2),
    width: '50%',
  },
  contactUsContainer: {
    ...styles.mt20,
    ...styles.pv20,
    borderRadius: moderateScale(15),
    ...styles.flexRow,
    ...styles.contentCenter,
  },
});
