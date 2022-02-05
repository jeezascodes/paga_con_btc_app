import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './stacks';
import {Icon} from 'paga-con-btc-ui';
import {Colors, AppColors} from '_utils/styles';
import {useTheme} from '_utils/styles/themeProvider';
import {IconNames, RouteNames} from '_utils/constans/Constants';
import {getHeight, getWidth} from '_utils/helpers/interfaceDimensions';

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  let theme = useTheme().theme;
  let brandColor = AppColors(theme).brandColor;

  return (
    <Tabs.Navigator
      initialRouteName={RouteNames.HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconConfig = {};
          if (route.name === RouteNames.HOME) {
            iconConfig.isFoused = focused;
            iconConfig.iconName = IconNames.HOME;
          }
          return (
            <>
              <Icon
                isFoused={iconConfig.isFoused}
                isNavigation={true}
                name={iconConfig.iconName}
                width={getHeight(25)}
                height={getHeight(25)}
                iconColor={color}
              />
            </>
          );
        },
        tabBarTestID: 'tab_' + route.name,
      })}
      tabBarOptions={{
        activeTintColor: AppColors(theme).black,
        inactiveTintColor: brandColor,
        showLabel: false,
        style: {
          backgroundColor: AppColors(theme).black,
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 0,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen name={IconNames.HOME} component={HomeStack} />
    </Tabs.Navigator>
  );
}
