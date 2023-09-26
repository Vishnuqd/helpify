// Library import
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';

// Custom imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import {
  AppLogoDark,
  AppLogoLight,
  Menu_Dark,
  Menu_Light,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {moderateScale} from '../../../common/constants';
import UpComing from './UpComing';
import Completed from './Completed';
import {StackNav} from '../../../navigation/NavigationKeys';
import Cancelled from './Cancelled';

export default function BookingsTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState({
    index: 0,
    routes: [
      {key: 'first', title: strings.upComing},
      {key: 'second', title: strings.completed},
      {key: 'third', title: strings.cancelled},
    ],
  });

  const _handleIndexChange = index => {
    setIsSelect({...isSelect, index: index});
  };

  const HeaderCategoryItem = ({title, index}) => {
    return (
      <TouchableOpacity
        onPress={() => _handleIndexChange(index)}
        style={[
          localStyles.root,
          {
            borderBottomColor:
              isSelect.index === index ? colors.primary : colors.dark3,
          },
        ]}>
        <CText
          type={'s18'}
          align={'center'}
          style={styles.pb20}
          color={isSelect.index === index ? colors.primary : colors.grayScale7}>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  const _renderTabBar = props => {
    return (
      <View style={localStyles.mainContainer}>
        {props.navigationState.routes.map((item, index) => {
          return <HeaderCategoryItem title={item.title} index={index} />;
        })}
      </View>
    );
  };

  const _renderScene = SceneMap({
    first: UpComing,
    second: Completed,
    third: Cancelled,
  });

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressSearch}>
          {colors.dark ? <Search_Dark /> : <Search_Light />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.ph10}>
          {colors.dark ? <Menu_Dark /> : <Menu_Light />}
        </TouchableOpacity>
      </View>
    );
  };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.myBookings}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      <TabView
        navigationState={isSelect}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
        activeColor={{color: colors.primary}}
        navigation={navigation}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    borderBottomWidth: moderateScale(2),
    width: '33.33%',
  },
  mainContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mt10,
    width: '100%',
  },
});
