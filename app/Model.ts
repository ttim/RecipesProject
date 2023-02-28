export type Ingredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  name: string;
  items: Ingredient[];
};

export const EXAMPLE_RECIPES: Recipe[] = [
  {
    name: 'Sunchoke soup',
    items: [
      {name: 'Sunchoke', quantity: '2500g'},
      {name: 'Lobster stock', quantity: '3500g'},
      {name: 'Chamomile', quantity: '20g'},
      {name: 'Cream', quantity: '400g'},
    ],
  },
  {
    name: 'Walnut pate',
    items: [
      {name: 'Chopped White Onion', quantity: '100g'},
      {name: 'Minced Garlic', quantity: '10g'},
      {name: 'Walnut', quantity: '200g'},
      {name: 'Nutritional Yeast', quantity: '5g'},
      {name: 'Lentils', quantity: '150g'},
      {name: 'Water', quantity: '1000g'},
      {name: 'Resomary', quantity: '1 sprig'},
    ],
  },
];
