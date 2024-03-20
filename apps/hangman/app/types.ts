export type KeyboardKey = {
  label: string;
  code: string;
};

export type TKeyboardRow = {
  row: number;
  key: KeyboardKey[];
};

export type KeyboardLayout = {
  keyboard_layout: string;
  keys: TKeyboardRow[];
};

export type Categories = {
  animals: string[];
  movies: string[];
  foods: string[];
  countries: string[];
  sports: string[];
  music: string[];
  literature: string[];
  science: string[];
  pokemon: string[];
};

export type Data = {
  categories: Categories;
  keyboard: KeyboardLayout;
};

export const CATEGORIES = [
  'Animals',
  'Movies',
  'Countries',
  'Foods',
  'Sports',
  'Music',
  'Literature',
  'Science',
  'Pokemon',
  // 'Famous Landmarks',
  // 'Historical Figures',
  // 'Cartoons/Animations',
  // 'Occupations',
  // 'Holidays',
  // 'Technology',
  // 'Body Parts',
  // 'Colors',
  // 'Transportation',
  // 'Games',
  // 'Weather',
  // 'Celebrities',
];
