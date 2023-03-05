import {Text, View} from 'react-native';
import React from 'react';
import {useBackgroundColor, useTextColor} from './View';

export function LibraryStackScreen(): JSX.Element {
  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        useBackgroundColor(),
      ]}>
      <Text style={useTextColor()}>Library Screen</Text>
    </View>
  );
}
