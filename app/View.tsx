import React, {PropsWithoutRef, useState} from 'react';
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
import {
  useBackgroundColorStyle,
  useTextColor,
  useTextColorStyle,
} from './Hooks';

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  ingredientContainer: {
    marginTop: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 22,
    fontWeight: '600',
  },
  ingredientText: {
    fontSize: 18,
    fontWeight: '300',
  },
});

function QuantityComponent(
  props: PropsWithoutRef<{
    quantity: Quantity;
    scale: number;
    updateScale: (newScale: number) => void;
  }>,
) {
  const backgroundColorStyle = useBackgroundColorStyle();
  const textColorStyle = useTextColorStyle();
  const borderColor = useTextColor();
  const [text, setText] = useState<undefined | string>(undefined);

  const quantity = props.quantity;
  switch (quantity.type) {
    case 'undefined':
      return <Text style={textColorStyle}>undefined</Text>;
    case 'to taste':
      return <Text style={textColorStyle}>to taste</Text>;
    case 'regular':
      return (
        <TextInput
          inputMode={'decimal'}
          keyboardType={'decimal-pad'}
          style={[
            backgroundColorStyle,
            textColorStyle,
            {
              borderWidth: 1,
              fontStyle: 'italic',
              borderStyle: 'dashed',
              paddingHorizontal: 5,
              paddingVertical: 0,
              borderColor: borderColor,
            },
          ]}
          value={
            text === undefined
              ? (quantity.count * props.scale).toFixed(0)
              : text
          }
          onChangeText={newText => {
            setText(newText);
            const newCount = Number(newText);
            if (!isNaN(newCount)) {
              props.updateScale(newCount / quantity.count);
            }
          }}
          onEndEditing={() => setText(undefined)}
        />
      );
  }
}

function MeasurementComponent(props: PropsWithoutRef<{quantity: Quantity}>) {
  const textColor = useTextColorStyle();

  switch (props.quantity.type) {
    case 'regular':
      return (
        <View style={{flexDirection: 'row', height: 30}}>
          <Text style={textColor}> {props.quantity.measurement}📏</Text>
        </View>
      );
    case 'to taste':
      return <View />;
    case 'undefined':
      return <View />;
  }
}

function IngredientComponent(
  props: PropsWithoutRef<{
    ingredient: Ingredient;
    scale: number;
    updateScale: (newScale: number) => void;
  }>,
): JSX.Element {
  return (
    <View style={[styles.ingredientContainer, {flexDirection: 'row'}]}>
      <View style={{flex: 7}}>
        <Text style={[styles.ingredientText, useTextColorStyle()]}>
          {props.ingredient.name}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <QuantityComponent
          quantity={props.ingredient.quantity}
          scale={props.scale}
          updateScale={props.updateScale}
        />
      </View>
      <View style={{flex: 1}}>
        <MeasurementComponent quantity={props.ingredient.quantity} />
      </View>
    </View>
  );
}

function RecipeComponent(
  props: PropsWithoutRef<{
    recipe: Recipe;
    onDelete: () => void;
    scale: number;
    updateScale: (newScale: number) => void;
  }>,
): JSX.Element {
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
        {props.recipe.name}
        <Text> </Text>
        <Text onPress={props.onDelete}>✅</Text>
      </Text>
      <View>
        {props.recipe.items.map(ingredient => (
          <IngredientComponent
            key={ingredient.name}
            ingredient={ingredient}
            scale={props.scale}
            updateScale={props.updateScale}
          />
        ))}
      </View>
    </View>
  );
}

export function Recipes(
  props: PropsWithoutRef<{
    recipes: [Recipe, number][];
    onDeleteRecipe: (idx: number) => void;
    updateScaleRecipe: (idx: number, newScale: number) => void;
  }>,
): JSX.Element {
  return (
    <View style={[useBackgroundColorStyle(), {flex: 1}]}>
      <View>
        {props.recipes.map(([recipe, scale], index) => (
          <RecipeComponent
            key={recipe.name}
            recipe={recipe}
            onDelete={() => props.onDeleteRecipe(index)}
            scale={scale}
            updateScale={newScale => {
              props.updateScaleRecipe(index, newScale);
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
