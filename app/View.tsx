import React, {PropsWithoutRef} from 'react';
import {Ingredient, Quantity, Recipe} from './Model';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
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
  scale: number;
  updateScale: (newScale: number) => void;
}>;

function QuantityComponent({
  quantity,
  scale,
  updateScale,
}: PropsWithoutRef<{
  quantity: Quantity;
  scale: number;
  updateScale: (newScale: number) => void;
}>) {
  const backgroundColorStyle = useBackgroundColorStyle();
  const textColor = useTextColor();

  switch (quantity.type) {
    case 'undefined':
      return <View />;
    case 'to taste':
      return <View />;
    case 'regular':
      return (
        <TextInput
          style={[
            backgroundColorStyle,
            {
              borderWidth: 1,
              fontStyle: 'italic',
              borderStyle: 'dashed',
              paddingHorizontal: 5,
              paddingVertical: 0,
              color: textColor,
              borderColor: textColor,
            },
          ]}
          value={(quantity.count * scale).toFixed(0)}
          onChangeText={newText => {
            const newCount = Number(newText);
            if (!isNaN(newCount)) {
              updateScale(newCount / quantity.count);
            }
          }}
        />
      );
  }
}

function MeasurementComponent({
  quantity,
}: PropsWithoutRef<{quantity: Quantity}>) {
  const textColor = useTextColorStyle();

  switch (quantity.type) {
    case 'regular':
      return (
        <View style={{flexDirection: 'row', height: 40}}>
          <Text style={textColor}> {quantity.measurement}</Text>
          <Button title="📏" />
        </View>
      );
    case 'to taste':
      return <Text>To taste</Text>;
    case 'undefined':
      return <Text>Undefined</Text>;
  }
}

function IngredientComponent({
  ingredient,
  scale,
  updateScale,
}: IngredientProps): JSX.Element {
  return (
    <View style={[styles.ingredientContainer, {flexDirection: 'row'}]}>
      <View style={{flex: 7}}>
        <Text style={[styles.ingredientText, useTextColorStyle()]}>
          {ingredient.name}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <QuantityComponent
          quantity={ingredient.quantity}
          scale={scale}
          updateScale={updateScale}
        />
      </View>
      <View style={{flex: 1}}>
        <MeasurementComponent quantity={ingredient.quantity} />
      </View>
    </View>
  );
}

type RecipeProps = PropsWithoutRef<{
  recipe: Recipe;
  onDelete: () => void;
  scale: number;
  updateScale: (newScale: number) => void;
}>;
function RecipeComponent({
  recipe,
  onDelete,
  scale,
  updateScale,
}: RecipeProps): JSX.Element {
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
            updateScale={updateScale}
          />
        ))}
      </View>
    </View>
  );
}

type RecipesProps = PropsWithoutRef<{
  recipes: [Recipe, number][];
  onDeleteRecipe: (idx: number) => void;
  updateScaleRecipe: (idx: number, newScale: number) => void;
}>;
export function Recipes({
  recipes,
  onDeleteRecipe,
  updateScaleRecipe,
}: RecipesProps): JSX.Element {
  return (
    <View style={useBackgroundColorStyle()}>
      <View>
        {recipes.map(([recipe, scale], index) => (
          <RecipeComponent
            key={recipe.name}
            recipe={recipe}
            onDelete={() => onDeleteRecipe(index)}
            scale={scale}
            updateScale={newScale => {
              updateScaleRecipe(index, newScale);
            }}
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
