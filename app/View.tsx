import React, {PropsWithoutRef} from 'react';
import { Ingredient, quantity_to_str, Recipe, scale_quantity } from "./Model";
import { Button, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
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

type IngredientProps = PropsWithoutRef<{
  ingredient: Ingredient;
  edit: boolean;
  scale: number;
}>;

function IngredientComponent({
  ingredient,
  edit,
  scale,
}: IngredientProps): JSX.Element {
  return (
    <View style={styles.ingredientContainer}>
      <Text style={[styles.ingredientText, useTextColorStyle()]}>
        {ingredient.name}
      </Text>
      <Text
        style={[
          styles.ingredientText,
          useTextColorStyle(),
          {alignSelf: 'flex-end'},
        ]}>
        {quantity_to_str(scale_quantity(ingredient.quantity, scale))}
        <Button title="✏️" />
        <Button title="📏" />
      </Text>
    </View>
  );
}

type RecipeProps = PropsWithoutRef<{
  recipe: Recipe;
  onDelete: () => void;
  scale: number;
}>;
function RecipeComponent({recipe, onDelete, scale}: RecipeProps): JSX.Element {
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
        <Button title="✅" onPress={onDelete} />
      </Text>
      <View>
        {recipe.items.map(ingredient => (
          <IngredientComponent
            key={ingredient.name}
            ingredient={ingredient}
            scale={scale}
            edit={false}
          />
        ))}
      </View>
    </View>
  );
}

type RecipesProps = PropsWithoutRef<{
  recipes: [Recipe, number][];
  onDeleteRecipe: (idx: number) => void;
}>;
export function Recipes({recipes, onDeleteRecipe}: RecipesProps): JSX.Element {
  return (
    <View style={useBackgroundColorStyle()}>
      <View>
        {recipes.map(([recipe, scale], index) => (
          <RecipeComponent
            key={recipe.name}
            recipe={recipe}
            onDelete={() => onDeleteRecipe(index)}
            scale={scale}
          />
        ))}
      </View>
    </View>
  );
}

export function Logo(): JSX.Element {
  return <Text>👨‍🍳🤌</Text>;
}

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
