import {Text, View} from 'react-native';
import React from 'react';
import {useBackgroundColorStyle, useTextColorStyle} from './View';

export function LibraryStackScreen(): JSX.Element {
  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        useBackgroundColorStyle(),
      ]}>
      <Text style={useTextColorStyle()}>Library Screen</Text>
    </View>
  );
}
