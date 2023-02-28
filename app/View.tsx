import React, {PropsWithoutRef} from 'react';
import {Ingredient, Recipe} from './Model';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: 24,
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
      <Text
        style={[
          styles.ingredientText,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {ingredient.name}
      </Text>
      <Text
        style={[
          styles.ingredientText,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            alignSelf: 'flex-end',
          },
        ]}>
        {ingredient.quantity}
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
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <View>
        {recipes.map(recipe => (
          <RecipeComponent key={recipe.name} recipe={recipe} />
        ))}
      </View>
    </View>
  );
}
