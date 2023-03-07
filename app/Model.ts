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

export type Quantity =
  | {type: 'regular'; count: number; measurement: Measurement}
  | {type: 'to taste'}
  | {type: 'undefined'};

export type Ingredient = {
  name: string;
  quantity: Quantity;
};

export type Recipe = {
  name: string;
  items: Ingredient[];
  yield: Quantity;
};

function q(arg: [number, Measurement] | 'to taste' | 'undefined'): Quantity {
  switch (arg) {
    case 'to taste':
      return {type: 'to taste'};
    case 'undefined':
      return {type: 'undefined'};
    default:
      return {type: 'regular', count: arg[0], measurement: arg[1]};
  }
}

export const EXAMPLE_RECIPES: Recipe[] = [
  {
    name: 'Sunchoke Veloute',
    items: [
      {name: 'sunchokes', quantity: q([2500, 'g'])},
      {name: 'lobster stock', quantity: q([3500, 'g'])},
      {name: 'chamomile', quantity: q([20, 'g'])},
      {name: 'cream', quantity: q([400, 'g'])},
      {name: 'salt', quantity: q([15, 'g'])},
    ],
    yield: q([6.25, 'quart']),
  },
  {
    name: 'Walnut Pate',
    items: [
      {name: 'chopped white onion', quantity: q([100, 'g'])},
      {name: 'minced garlic', quantity: q([10, 'g'])},
      {name: 'walnut', quantity: q([200, 'g'])},
      {name: 'nutritional yeast', quantity: q([5, 'g'])},
      {name: 'lentils', quantity: q([150, 'g'])},
      {name: 'water', quantity: q([1000, 'g'])},
      {name: 'rosemary', quantity: q([1, 'sprig'])},
      {name: 'salt', quantity: q('to taste')},
    ],
    yield: q('undefined'),
  },
  {
    name: 'Whipped Creme Fraiche Pate',
    items: [
      {name: 'cream fraiche', quantity: q([500, 'g'])},
      {name: 'ultratex', quantity: q([4, 'g'])},
      {name: 'lemon (zest + juice)', quantity: q([1, 'item'])},
      {name: 'salt', quantity: q('to taste')},
    ],
    yield: q('undefined'),
  },
  {
    name: 'Egg Confit',
    items: [
      {name: 'eggs', quantity: q([10, 'item'])},
      {name: 'tamari', quantity: q([5, 'g'])},
      {name: 'water', quantity: q([5, 'g'])},
      {name: 'salt', quantity: q('to taste')},
    ],
    yield: q('undefined'),
  },
  {
    name: 'Shio Koji marinade',
    items: [
      {name: 'yuzu kosho', quantity: q([60, 'g'])},
      {name: 'shio koji', quantity: q([300, 'g'])},
      {name: 'plum vinegar', quantity: q([60, 'g'])},
      {name: 'sugar', quantity: q([30, 'g'])},
      {name: 'yuzu juice', quantity: q([30, 'g'])},
      {name: 'canola oil', quantity: q([40, 'g'])},
    ],
    yield: q([1, 'pint']),
  },
  {
    name: 'Kumquat dressing',
    items: [
      {name: 'kumquats', quantity: q([500, 'g'])},
      {name: 'cooking liquid', quantity: q([500, 'g'])},
      {name: 'red pearl onion', quantity: q([250, 'g'])},
      {name: 'serrano pepper', quantity: q([100, 'g'])},
      {name: 'ginger', quantity: q([165, 'g'])},
      {name: 'yuzu juice', quantity: q([165, 'g'])},
      {name: 'lime juice', quantity: q([415, 'g'])},
      {name: 'shiso', quantity: q([40, 'g'])},
      {name: 'water', quantity: q([415, 'g'])},
      {name: 'rice wine vinegar', quantity: q([100, 'g'])},
      {name: 'salt', quantity: q('to taste')},
    ],
    yield: q('undefined'),
  },
  {
    name: 'Chicken Liver Mousse',
    items: [
      {name: 'chicken livers', quantity: q([2250, 'g'])},
      {name: 'pink salt', quantity: q([15, 'g'])},
      {name: 'chopped shallot', quantity: q([225, 'g'])},
      {name: 'cardamom (seeds removed from pod)', quantity: q([9, 'g'])},
      {name: 'arak', quantity: q([150, 'g'])},
      {name: 'cream', quantity: q([900, 'g'])},
      {name: 'butter', quantity: q([150, 'g'])},
      {name: 'duck fat', quantity: q([75, 'g'])},
    ],
    yield: q('undefined'),
  },
  {
    name: 'Carrot soup',
    items: [
      {name: 'carrot juice', quantity: q([1000, 'g'])},
      {name: 'carrots, peeled and chopped', quantity: q([600, 'g'])},
      {name: 'onions, chopped', quantity: q([100, 'g'])},
      {name: 'ginger, minced', quantity: q([100, 'g'])},
      {name: 'olive oil', quantity: q([50, 'g'])},
      {name: 'fresh ginger juice', quantity: q([30, 'g'])},
      {name: 'salt', quantity: q('to taste')},
    ],
    yield: q([1.65, 'quart']),
  },
];
