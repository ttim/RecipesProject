const WEIGHTS = {
  g: 1,
  kg: 1000,
} as const;

const ML_IN_CUP = 236.588;

const VOLUME = {
  ml: 1,
  l: 1000,
  cup: ML_IN_CUP,
  pint: 2 * ML_IN_CUP,
  quart: 4 * ML_IN_CUP,
} as const;

const COUNTS = ['sprig'] as const;

type Weights = keyof typeof WEIGHTS;
type Volumes = keyof typeof VOLUME;
type Counts = (typeof COUNTS)[number]; // https://stackoverflow.com/questions/44480644/string-union-to-string-array

export type Measurement = Weights | Volumes | Counts;

export type Quantity = [number, Measurement];

export type Ingredient = {
  name: string;
  quantity: Quantity;
};

export type Recipe = {
  name: string;
  items: Ingredient[];
};

export const EXAMPLE_RECIPES: Recipe[] = [
  {
    name: 'Sunchoke soup',
    items: [
      {name: 'Sunchoke', quantity: [2500, 'g']},
      {name: 'Lobster stock', quantity: [3500, 'g']},
      {name: 'Chamomile', quantity: [20, 'g']},
      {name: 'Cream', quantity: [400, 'g']},
    ],
  },
  {
    name: 'Walnut pate',
    items: [
      {name: 'Chopped White Onion', quantity: [100, 'g']},
      {name: 'Minced Garlic', quantity: [10, 'g']},
      {name: 'Walnut', quantity: [200, 'g']},
      {name: 'Nutritional Yeast', quantity: [5, 'g']},
      {name: 'Lentils', quantity: [150, 'g']},
      {name: 'Water', quantity: [1000, 'g']},
      {name: 'Resomary', quantity: [1, 'sprig']},
    ],
  },
];
