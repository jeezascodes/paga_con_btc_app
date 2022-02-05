import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import {useTheme} from '../../utils/styles/themeProvider';
import {
  mainViewGradient,
  mainViewStyles,
  contentGradientWithColor,
  mainViewWithColor,
} from './MainViewStyles';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/styles';
import {flexContent} from '_utils/styles/globalStyles';

export default function MainView({
  children,
  gradient = false,
  gradientHorizontal = false,
  hideKeyboardOnpress = false,
  horizontalPadding = false,
  customStyles = {},
  gradientWithColor = false,
  testID,
}) {
  let theme = useTheme().theme;
  // const colors = [Colors(theme).gradientStart, Colors(theme).gradientEnd];

  const colors = ['#fda6ab70', '#fe710a70'];
  return (
    <>
      {gradient ? (
        <LinearGradient
          testID={testID}
          start={{x: 0.0604, y: 0}}
          end={{x: 1.1, y: 1}}
          style={flexContent}
          colors={colors}>
          <SafeAreaView
            style={[
              horizontalPadding && mainViewStyles(theme).containerPadding,
              customStyles,
            ]}>
            {children}
          </SafeAreaView>
        </LinearGradient>
      ) : gradientHorizontal ? (
        <LinearGradient
          start={{x: 0.0604, y: 0}}
          end={{x: 1.1, y: 1}}
          style={flexContent}
          colors={colors}>
          <SafeAreaView
            style={[
              horizontalPadding && mainViewStyles(theme).containerPadding,
              customStyles,
            ]}>
            {children}
          </SafeAreaView>
        </LinearGradient>
      ) : gradientWithColor ? (
        <View testID={testID} style={(flexContent, mainViewWithColor(theme))}>
          <LinearGradient
            start={{x: 0.0604, y: 0}}
            end={{x: 1.1, y: 1}}
            style={mainViewGradient}
            colors={colors}
          />
          <View
            style={[
              horizontalPadding && mainViewStyles(theme).containerPadding,
              mainViewWithColor(theme),
            ]}
          />
          <SafeAreaView style={contentGradientWithColor}>
            {children}
          </SafeAreaView>
        </View>
      ) : (
        <SafeAreaView
          testID={testID}
          style={[mainViewStyles(theme, gradient), customStyles]}>
          <StatusBar
            animated={true}
            translucent
            backgroundColor="red"
            barStyle={'light-content'}
            showHideTransition={'fade'}
            hidden={false}
          />
          {hideKeyboardOnpress ? (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  horizontalPadding && mainViewStyles(theme).containerPadding,
                ]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={[
                horizontalPadding && mainViewStyles(theme).containerPadding,
              ]}>
              {children}
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
}
