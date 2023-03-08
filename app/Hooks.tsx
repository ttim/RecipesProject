import { AppState, AppStateStatus, useColorScheme } from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from "./App";

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

const storeData: (key: string, data: any) => Promise<void> = async (
  key,
  data,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return;
  } catch (e) {
    // saving error
    return;
  }
};

const getData: (key: string, initial: any) => Promise<any> = async (
  key,
  initial,
) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : initial;
  } catch (e) {
    // error reading value
    return initial;
  }
};

export function usePersistentState<S>(
  key: string,
  initial: S,
): [S, Dispatch<SetStateAction<S>>] {
  // todo: check only one usePersistentState per key exists
  const [inner, setInner] = useState<S>(initial);
  const [needPopulate, setNeedPopulate] = useState(true);

  const innerRef = useRef<S>(initial);
  innerRef.current = inner;
  const needPopulateRef = useRef(true);
  needPopulateRef.current = needPopulate;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (!needPopulateRef.current) {
        const save = async () => {
          await storeData(key, innerRef.current);
        };
        save();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [key]);

  useEffect(() => {
    if (needPopulate) {
      const populate = async () => {
        setInner((await getData(key, initial)) as S);
        setNeedPopulate(false);
      };
      populate();
    }
  }, [key, inner, needPopulate, initial]);

  return [inner, setInner];
}
