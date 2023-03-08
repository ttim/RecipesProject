import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export function useBackgroundColor() {
  return useColorScheme() === 'dark' ? Colors.black : Colors.white;
}

export function useTextContentColor() {
  return useColorScheme() === 'dark' ? 'light-content' : 'dark-content';
}

export function useTextColor() {
  return useColorScheme() === 'dark' ? Colors.white : Colors.black;
}

export function useBackgroundColorStyle() {
  return {backgroundColor: useBackgroundColor()};
}

export function useTextColorStyle() {
  return {color: useTextColor()};
}
