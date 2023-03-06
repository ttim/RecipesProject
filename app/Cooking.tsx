import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Logo,
  Recipes,
  useBackgroundColor,
  useBackgroundColorStyle,
  useTextColor,
  useTextColorStyle,
  useTextContentColor,
} from './View';
import {EXAMPLE_RECIPES, Recipe} from './Model';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ListItem, SearchBar} from 'react-native-elements';

type StackParams = {
  InProgress: {addedRecipe: Recipe} | undefined;
  AddInProgressItem: undefined;
};

function InProgressScreen({
  navigation,
  route,
}: NativeStackScreenProps<StackParams, 'InProgress'>): JSX.Element {
  const textColor = useTextColor();

  const [recipes, setRecipes] = useState([] as Recipe[]);

  useEffect(() => {
    if (route.params?.addedRecipe) {
      setRecipes([...recipes, route.params?.addedRecipe]);
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
            setRecipes(recipes.slice(0, idx).concat(recipes.slice(idx + 1)));
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
