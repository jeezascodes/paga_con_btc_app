import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack, ResourcesStack, ChatStack} from './stacks';
import {Icon, Bubble} from 'kvell-app-ui';
import {Colors} from '_utils/styles';
import {useTheme} from '_utils/styles/themeProvider';
import {IconNames, RouteNames} from '_utils/constans/Constants';
import {useWizard} from '_store/hooks/useWizard';
import {getHeight} from '_utils/helpers/interfaceDimensions';

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  let theme = useTheme().theme;
  let brandColor = Colors(theme).brandColor;

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
        activeTintColor: brandColor,
        inactiveTintColor: brandColor,
        showLabel: false,
        style: {
          height: getHeight(80),
          backgroundColor: Colors(theme).background,
          shadowColor: Colors(theme).shadowColor,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      }}>
      <Tabs.Screen name={IconNames.HOME} component={HomeStack} />
    </Tabs.Navigator>
  );
}
