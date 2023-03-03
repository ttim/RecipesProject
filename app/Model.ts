const OZ_IN_G = 28.349523125;

const WEIGHTS = {
  // metric
  g: 1,
  kg: 1000,
  // us
  oz: OZ_IN_G,
  pound: 16 * OZ_IN_G,
} as const;

const FL_OZ_IN_ML = 29.5735;

const VOLUME = {
  // metric
  ml: 1,
  l: 1000,
  // us
  fl_oz: FL_OZ_IN_ML,
  cup: 8 * FL_OZ_IN_ML,
  pint: 16 * FL_OZ_IN_ML,
  quart: 32 * FL_OZ_IN_ML,
  gallon: 128 * FL_OZ_IN_ML,
} as const;

const COUNTS = ['sprig', 'item'] as const;

type Weights = keyof typeof WEIGHTS;
type Volumes = keyof typeof VOLUME;
type Counts = (typeof COUNTS)[number]; // https://stackoverflow.com/questions/44480644/string-union-to-string-array

export type Measurement = Weights | Volumes | Counts;

export type Quantity = [number, Measurement] | 'to taste' | undefined;

export function quantity_to_str(quantity: Quantity): string {
  switch (quantity) {
    case 'to taste':
      return 'to taste';
    case undefined:
      return 'undefined';
    default:
      return quantity[0] + ' ' + quantity[1];
  }
}

export type Ingredient = {
  name: string;
  quantity: Quantity;
};

export type Recipe = {
  name: string;
  items: Ingredient[];
  yield: Quantity;
};

export const EXAMPLE_RECIPES: Recipe[] = [
  {
    name: 'Sunchoke Veloute',
    items: [
      {name: 'sunchokes', quantity: [2500, 'g']},
      {name: 'lobster stock', quantity: [3500, 'g']},
      {name: 'chamomile', quantity: [20, 'g']},
      {name: 'cream', quantity: [400, 'g']},
      {name: 'salt', quantity: [15, 'g']},
    ],
    yield: [6.25, 'quart'],
  },
  {
    name: 'Walnut Pate',
    items: [
      {name: 'chopped white onion', quantity: [100, 'g']},
      {name: 'minced garlic', quantity: [10, 'g']},
      {name: 'walnut', quantity: [200, 'g']},
      {name: 'nutritional yeast', quantity: [5, 'g']},
      {name: 'lentils', quantity: [150, 'g']},
      {name: 'water', quantity: [1000, 'g']},
      {name: 'rosemary', quantity: [1, 'sprig']},
      {name: 'salt', quantity: 'to taste'},
    ],
    yield: undefined,
  },
  {
    name: 'Whipped Creme Fraiche Pate',
    items: [
      {name: 'cream fraiche', quantity: [500, 'g']},
      {name: 'ultratex', quantity: [4, 'g']},
      {name: 'lemon (zest + juice)', quantity: [1, 'item']},
      {name: 'salt', quantity: 'to taste'},
    ],
    yield: undefined,
  },
  {
    name: 'Egg Confit',
    items: [
      {name: 'eggs', quantity: [10, 'item']},
      {name: 'tamari', quantity: [5, 'g']},
      {name: 'water', quantity: [5, 'g']},
      {name: 'salt', quantity: 'to taste'},
    ],
    yield: undefined,
  },
  {
    name: 'Shio Koji marinade',
    items: [
      {name: 'yuzu kosho', quantity: [60, 'g']},
      {name: 'shio koji', quantity: [300, 'g']},
      {name: 'plum vinegar', quantity: [60, 'g']},
      {name: 'sugar', quantity: [30, 'g']},
      {name: 'yuzu juice', quantity: [30, 'g']},
      {name: 'canola oil', quantity: [40, 'g']},
    ],
    yield: [1, 'pint'],
  },
  {
    name: 'Kumquat dressing',
    items: [
      {name: 'kumquats', quantity: [500, 'g']},
      {name: 'cooking liquid', quantity: [500, 'g']},
      {name: 'red pearl onion', quantity: [250, 'g']},
      {name: 'serrano pepper', quantity: [100, 'g']},
      {name: 'ginger', quantity: [165, 'g']},
      {name: 'yuzu juice', quantity: [165, 'g']},
      {name: 'lime juice', quantity: [415, 'g']},
      {name: 'shiso', quantity: [40, 'g']},
      {name: 'water', quantity: [415, 'g']},
      {name: 'rice wine vinegar', quantity: [100, 'g']},
      {name: 'salt', quantity: 'to taste'},
    ],
    yield: undefined,
  },
  {
    name: 'Chicken Liver Mousse',
    items: [
      {name: 'chicken livers', quantity: [2250, 'g']},
      {name: 'pink salt', quantity: [15, 'g']},
      {name: 'chopped shallot', quantity: [225, 'g']},
      {name: 'cardamom (seeds removed from pod)', quantity: [9, 'g']},
      {name: 'arak', quantity: [150, 'g']},
      {name: 'cream', quantity: [900, 'g']},
      {name: 'butter', quantity: [150, 'g']},
      {name: 'duck fat', quantity: [75, 'g']},
    ],
    yield: undefined,
  },
  {
    name: 'Carrot soup',
    items: [
      {name: 'carrot juice', quantity: [1000, 'g']},
      {name: 'carrots, peeled and chopped', quantity: [600, 'g']},
      {name: 'onions, chopped', quantity: [100, 'g']},
      {name: 'ginger, minced', quantity: [100, 'g']},
      {name: 'olive oil', quantity: [50, 'g']},
      {name: 'fresh ginger juice', quantity: [30, 'g']},
      {name: 'salt', quantity: 'to taste'},
    ],
    yield: [1.65, 'quart'],
  },
];
