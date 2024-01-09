import {Dimensions} from 'react-native';

import {
  Bed,
  Cardigan,
  Dress,
  Duvet,
  Handkerchief,
  Hat,
  Iron,
  LeatherG,
  Mat,
  Scarf,
  Shorts,
  Suit,
  TShirt,
  Table,
  TextileG,
  TowelBig,
  TowelMid,
  WashingMachine,
} from '../assets';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const laundryCatalog = [
  {
    name: 'Laundry Wash and Fold',
    image: WashingMachine,
    price: '€9.00',
    fav: true,
  },
  {name: 'Bath Mat - Wash & Iron', image: Mat, price: '€6.00', fav: true},
  {
    name: 'Big Size Towel - Cleaning',
    image: TowelBig,
    price: '€4.00',
    fav: true,
  },
  {name: 'Feather Duvet King', image: Duvet, price: '€26.00', fav: true},
  {
    name: 'Medium Size Towel - Cleaning',
    image: TowelMid,
    price: '€3.00',
    fav: true,
  },
  {name: 'Table Cloth - Cleaning', image: Table, price: '€8.00', fav: true},
];
export const ironingCatalog = [
  {name: '2 Piece Suit - Iron', image: Suit, price: '€7.00', fav: false},
  {
    name: 'Blouse/Top/Shirt/Silk T-shirt',
    image: TShirt,
    price: '€6.50',
    fav: false,
  },
  {name: 'Cardigan – Iron', image: Cardigan, price: '€3.00', fav: false},
  {name: 'Double Bed Sheet – Iron', image: Bed, price: '€4.00', fav: false},
  {name: 'Dress / Overalls – Iron', image: Dress, price: '€6.00', fav: false},
  {name: 'Ironing 5 Kilos', image: Iron, price: '€20.00', fav: false},
];
export const dryCleanCatalog = [
  {
    name: 'Gloves leather / suede',
    image: LeatherG,
    price: '€15.00',
    fav: false,
  },
  {name: 'Gloves textile', image: TextileG, price: '€6.00', fav: false},
  {
    name: 'Handkerchief -Dry Cleaning',
    image: Handkerchief,
    price: '€3.00',
    fav: false,
  },
  {name: 'Headwears', image: Hat, price: '€12.00', fav: false},
  {
    name: 'Neckerchief / Scarf – Dry Cleaning',
    image: Scarf,
    price: '€6.50',
    fav: false,
  },
  {name: 'Swimsuit', image: Shorts, price: '€10.00', fav: false},
];
