import {usePersistentState} from './Hooks';
import {EXAMPLE_RECIPES, Recipe} from './Model';

export type RecipesInProgress = [Recipe, number][];

export function useRecipesInProgress(): {
  recipes: RecipesInProgress;
  add: (recipe: Recipe) => void;
  remove: (idx: number) => void;
  updateScale: (idx: number, newScale: number) => void;
} {
  const [recipes, setRecipes] = usePersistentState<RecipesInProgress>(
    'recipes_in_progress',
    [],
  );

  return {
    recipes: recipes,

    add: recipe => {
      setRecipes([...recipes, [recipe, 1]]);
    },

    remove: idx => {
      setRecipes(recipes.slice(0, idx).concat(recipes.slice(idx + 1)));
    },

    updateScale: (idx, newScale) => {
      const newRecipes = [] as [Recipe, number][];
      newRecipes.push(...recipes.slice(0, idx));
      newRecipes.push([recipes[idx][0], newScale]);
      newRecipes.push(...recipes.slice(idx + 1));
      setRecipes(newRecipes);
    },
  };
}

export function useRecipes(): {
  recipes: Recipe[];
} {
  const [recipes, setRecipes] = usePersistentState<Recipe[]>(
    'recipes',
    EXAMPLE_RECIPES,
  );

  return {recipes: recipes};
}
