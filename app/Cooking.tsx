import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Logo, Recipes} from './View';
import {EXAMPLE_RECIPES, Recipe} from './Model';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ListItem, SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useBackgroundColor,
  useBackgroundColorStyle,
  useTextColor,
  useTextColorStyle,
  useTextContentColor,
} from './Hooks';

type StackParams = {
  InProgress: {addedRecipe: Recipe} | undefined;
  AddInProgressItem: undefined;
};

const storeData: (
  recipes: [Recipe, number][],
) => Promise<void> = async recipes => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
    return;
  } catch (e) {
    // saving error
    return;
  }
};

const getData: () => Promise<[Recipe, number][]> = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null
      ? (JSON.parse(jsonValue) as [Recipe, number][])
      : [];
  } catch (e) {
    // error reading value
    return [];
  }
};

function InProgressScreen({
  navigation,
  route,
}: NativeStackScreenProps<StackParams, 'InProgress'>): JSX.Element {
  const textColor = useTextColor();

  const [recipes, setRecipes] = useState([] as [Recipe, number][]);

  const updateRecipes = (recipes: [Recipe, number][]) => {
    setRecipes(recipes);
    const saveRecipes = async () => {
      await storeData(recipes);
    };
    saveRecipes();
  };

  useEffect(() => {
    const populateRecipes = async () => {
      setRecipes(await getData());
    };
    populateRecipes();
  }, []);

  useEffect(() => {
    if (route.params?.addedRecipe) {
      updateRecipes([...recipes, [route.params?.addedRecipe, 1]]);
      navigation.setParams({addedRecipe: undefined});
    }
  }, [navigation, recipes, route.params?.addedRecipe]);

  useEffect(() => {
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
            updateRecipes(recipes.slice(0, idx).concat(recipes.slice(idx + 1)));
          }}
          updateScaleRecipe={(idx, newScale) => {
            const newRecipes = [] as [Recipe, number][];
            newRecipes.push(...recipes.slice(0, idx));
            newRecipes.push([recipes[idx][0], newScale]);
            newRecipes.push(...recipes.slice(idx + 1));
            updateRecipes(newRecipes);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function AddInProgressItemModalScreen({
  navigation,
  route,
}: NativeStackScreenProps<StackParams, 'AddInProgressItem'>): JSX.Element {
  const textColor = useTextColor();

  useEffect(() => {
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

  const backgroundStyle = useBackgroundColorStyle();
  const textStyle = useTextColorStyle();

  return (
    <View style={backgroundStyle}>
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
          containerStyle={backgroundStyle}
          onPress={() => {
            navigation.navigate('InProgress', {addedRecipe: recipe});
          }}>
          <ListItem.Content>
            <ListItem.Title style={textStyle}>{recipe.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

const Stack = createNativeStackNavigator<StackParams>();

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
        contentStyle: useBackgroundColorStyle(),
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
