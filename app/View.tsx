import React, {PropsWithoutRef} from 'react';
import { Ingredient, Quantity, quantity_to_str, Recipe } from "./Model";
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  ingredientContainer: {
    marginTop: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: '600',
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

type IngredientProps = PropsWithoutRef<{ingredient: Ingredient}>;

function IngredientComponent({ingredient}: IngredientProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.ingredientContainer}>
      <Text style={[styles.ingredientText, useTextColor()]}>{ingredient.name}</Text>
      <Text
        style={[styles.ingredientText, useTextColor(), {alignSelf: 'flex-end'}]}>
        {quantity_to_str(ingredient.quantity)}
      </Text>
    </View>
  );
}

type RecipeProps = PropsWithoutRef<{recipe: Recipe}>;
function RecipeComponent({recipe}: RecipeProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.recipeContainer}>
      <Text
        style={[
          styles.recipeName,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {recipe.name}
      </Text>
      <View>
        {recipe.items.map(ingredient => (
          <IngredientComponent key={ingredient.name} ingredient={ingredient} />
        ))}
      </View>
    </View>
  );
}

type RecipesProps = PropsWithoutRef<{recipes: Recipe[]}>;
export function Recipes({recipes}: RecipesProps): JSX.Element {
  return (
    <View style={useBackgroundColor()}>
      <View>
        {recipes.map(recipe => (
          <RecipeComponent key={recipe.name} recipe={recipe} />
        ))}
      </View>
    </View>
  );
}

export function Logo(): JSX.Element {
  return <Text>👨‍🍳🤌</Text>;
}

export function useBackgroundColor() {
  return {
    backgroundColor: useColorScheme() === 'dark' ? Colors.black : Colors.white,
  };
}

export function useTextColor() {
  return {
    color: useColorScheme() === 'dark' ? Colors.white : Colors.black,
  };
}
