import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text, useColorScheme,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Logo,
  Recipes,
  useBackgroundColor,
  useBackgroundColorStyle,
  useTextColor,
  useTextColorStyle,
  useTextContentColor,
} from './View';
import { EXAMPLE_RECIPES, Recipe } from "./Model";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {ListItem, SearchBar} from 'react-native-elements';

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
        barStyle={useTextContentColor()}
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

function AddInProgressItemModalScreen(
  props: NativeStackScreenProps<{addRecipe: (recipe: Recipe) => void}>,
): JSX.Element {
  const textColor = useTextColor();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="↩️"
          color={textColor}
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  });

  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState(EXAMPLE_RECIPES);

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search === '') {
      setRecipes(EXAMPLE_RECIPES);
    } else {
      setRecipes(
        EXAMPLE_RECIPES.filter(recipe =>
          recipe.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  };

  return (
    <View style={useBackgroundColorStyle()}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={useColorScheme() !== 'dark'}
      />
      {recipes.map((recipe, index) => (
        <ListItem
          key={index}
          bottomDivider
          onPress={() => alert('add ' + recipe.name)}>
          <ListItem.Content>
            <ListItem.Title>{recipe.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
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
