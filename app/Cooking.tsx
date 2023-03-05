import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from "react";
import {Logo, Recipes, useBackgroundColor, useTextColor} from './View';
import {EXAMPLE_RECIPES} from './Model';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function InProgressScreen({navigation}): JSX.Element {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          color="#fff"
          onPress={() => navigation.navigate('AddInProgressItem')}
        />
      ),
    });
  });

  const [recipes, setRecipes] = useState(EXAMPLE_RECIPES);

  return (
    <SafeAreaView style={useBackgroundColor()}>
      <StatusBar
        barStyle={
          useColorScheme() === 'dark' ? 'light-content' : 'dark-content'
        }
        backgroundColor={useBackgroundColor().backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={useBackgroundColor()}>
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

function AddInProgressItemModalScreen({navigation}): JSX.Element {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="↩️" color="#fff" onPress={() => navigation.goBack()} />
      ),
    });
  });

  return (
    <View
      style={[
        {flex: 1, alignItems: 'center', justifyContent: 'center'},
        useBackgroundColor(),
      ]}>
      <Text style={{fontSize: 30}}>Add recipe</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export function CookingStackScreen(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="InProgress"
      screenOptions={{
        headerStyle: useBackgroundColor(),
        headerTitleStyle: useTextColor(),
        headerLeft: Logo,
        headerRight: () => <Button title="+" color="#fff" />,
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
