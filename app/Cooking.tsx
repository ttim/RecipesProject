import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import { Logo, Recipes, useBackgroundColor, useBackgroundColorStyle, useTextColor, useTextColorStyle } from "./View";
import {EXAMPLE_RECIPES} from './Model';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

type Props = NativeStackScreenProps<ParamListBase>;

function InProgressScreen({navigation}: Props): JSX.Element {
  const textColor = useTextColor();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          color={textColor}
          onPress={() => navigation.navigate('AddInProgressItem')}
        />
      ),
    });
  });

  const [recipes, setRecipes] = useState(EXAMPLE_RECIPES);

  return (
    <SafeAreaView style={useBackgroundColorStyle()}>
      <StatusBar
        barStyle={
          useColorScheme() === 'dark' ? 'light-content' : 'dark-content'
        }
        backgroundColor={useBackgroundColor()}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={useBackgroundColorStyle()}>
        <Recipes
          recipes={recipes}
          onDeleteRecipe={idx => {
            setRecipes(recipes.slice(0, idx).concat(recipes.slice(idx + 1)));
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function AddInProgressItemModalScreen({navigation}: Props): JSX.Element {
  const textColor = useTextColor();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="↩️"
          color={textColor}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  });

  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        useBackgroundColorStyle(),
      ]}>
      <Text style={{fontSize: 30}}>Add recipe</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export function CookingStackScreen(): JSX.Element {
  const textColor = useTextColor();

  return (
    <Stack.Navigator
      initialRouteName="InProgress"
      screenOptions={{
        headerStyle: useBackgroundColorStyle(),
        headerTitleStyle: useTextColorStyle(),
        headerLeft: Logo,
        headerRight: () => <Button title="+" color={textColor} />,
      }}>
      <Stack.Screen
        name="InProgress"
        component={InProgressScreen}
        options={{title: 'Cooking'}}
      />
      <Stack.Screen
        name="AddInProgressItem"
        component={AddInProgressItemModalScreen}
        options={{title: 'Add in progress activity'}}
      />
    </Stack.Navigator>
  );
}
