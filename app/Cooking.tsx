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
import {Recipe} from './Model';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ListItem, SearchBar} from 'react-native-elements';
import {
  useBackgroundColor,
  useBackgroundColorStyle,
  useTextColor,
  useTextColorStyle,
  useTextContentColor,
} from './Hooks';
import {useRecipes, useRecipesInProgress} from './State';

type StackParams = {
  InProgress: {addedRecipe: Recipe} | undefined;
  AddInProgressItem: undefined;
};

function InProgressScreen({
  navigation,
  route,
}: NativeStackScreenProps<StackParams, 'InProgress'>): JSX.Element {
  const textColor = useTextColor();

  const {recipes, add, remove, updateScale} = useRecipesInProgress();

  useEffect(() => {
    if (route.params?.addedRecipe) {
      add(route.params?.addedRecipe);
      navigation.setParams({addedRecipe: undefined});
    }
  }, [add, navigation, route.params?.addedRecipe]);

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
        automaticallyAdjustKeyboardInsets="true"
        style={useBackgroundColorStyle()}
        contentContainerStyle={{flexGrow: 1}}>
        <Recipes
          recipes={recipes}
          onDeleteRecipe={remove}
          updateScaleRecipe={updateScale}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function AddInProgressItemModalScreen({
  navigation,
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

  const {recipes} = useRecipes();
  const [search, setSearch] = useState('');

  const filteredRecipes =
    search === ''
      ? recipes
      : recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(search.toLowerCase()),
        );

  const backgroundStyle = useBackgroundColorStyle();
  const textStyle = useTextColorStyle();

  return (
    <View style={backgroundStyle}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        lightTheme={useColorScheme() !== 'dark'}
      />
      {filteredRecipes.map((recipe, index) => (
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
