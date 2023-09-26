import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

// Local Imports
import {TabRoute} from '../NavigationRoutes';
import {TabNav} from '../NavigationKeys';
import {styles} from '../../themes';
import {getHeight} from '../../common/constants';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import {
  BookingsInActive,
  Bookings_Dark,
  HomeInActive,
  Home_Dark,
  CalendarInActive,
  Calendar_Dark,
  ProfileInActive,
  Profile_Dark,
  InboxInActive,
  Inbox_Dark,
} from '../../assets/svgs';

export default function TabBarNavigation() {
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();

  const TabText = memo(({IconType, label, focused}) => (
    <View style={localStyle.tabViewContainer}>
      {IconType}
      <CText
        style={styles.mt5}
        numberOfLines={1}
        color={focused ? colors.primary : colors.grayScale5}
        type={'R14'}>
        {label}
      </CText>
    </View>
  ));

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: [
          localStyle.tabBarStyle,
          {backgroundColor: colors.backgroundColor},
        ],
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.HomeTab}>
      <Tab.Screen
        name={TabNav.HomeTab}
        component={TabRoute.HomeTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={focused ? <Home_Dark /> : <HomeInActive />}
              focused={focused}
              label={strings.home}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.BookingsTab}
        component={TabRoute.BookingsTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={focused ? <Bookings_Dark /> : <BookingsInActive />}
              focused={focused}
              label={strings.bookings}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.CalendarTab}
        component={TabRoute.CalendarTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={focused ? <Calendar_Dark /> : <CalendarInActive />}
              focused={focused}
              label={strings.calendar}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.InboxTab}
        component={TabRoute.InboxTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={focused ? <Inbox_Dark /> : <InboxInActive />}
              focused={focused}
              label={strings.inbox}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              IconType={focused ? <Profile_Dark /> : <ProfileInActive />}
              focused={focused}
              label={strings.profile}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyle = StyleSheet.create({
  tabBarStyle: {
    height: getHeight(60),
    ...styles.ph20,
    borderTopWidth: 0,
  },
  tabViewContainer: {
    ...styles.center,
  },
});
