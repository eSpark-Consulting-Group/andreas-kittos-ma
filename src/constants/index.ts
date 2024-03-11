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
import {OrderItem} from '../types';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const laundryCatalog = [
  {
    name: 'Laundry Wash and Fold',
    productImage: WashingMachine,
    price: '€9.00',
    fav: true,
  },
  {
    name: 'Bath Mat - Wash & Iron',
    productImage: Mat,
    price: '€6.00',
    fav: true,
  },
  {
    name: 'Big Size Towel - Cleaning',
    productImage: TowelBig,
    price: '€4.00',
    fav: true,
  },
  {name: 'Feather Duvet King', productImage: Duvet, price: '€26.00', fav: true},
  {
    name: 'Medium Size Towel - Cleaning',
    productImage: TowelMid,
    price: '€3.00',
    fav: true,
  },
  {
    name: 'Table Cloth - Cleaning',
    productImage: Table,
    price: '€8.00',
    fav: true,
  },
];
export const ironingCatalog = [
  {name: '2 Piece Suit - Iron', productImage: Suit, price: '€7.00', fav: false},
  {
    name: 'Blouse/Top/Shirt/Silk T-shirt',
    productImage: TShirt,
    price: '€6.50',
    fav: false,
  },
  {name: 'Cardigan – Iron', productImage: Cardigan, price: '€3.00', fav: false},
  {
    name: 'Double Bed Sheet – Iron',
    productImage: Bed,
    price: '€4.00',
    fav: false,
  },
  {
    name: 'Dress / Overalls – Iron',
    productImage: Dress,
    price: '€6.00',
    fav: false,
  },
  {name: 'Ironing 5 Kilos', productImage: Iron, price: '€20.00', fav: false},
];
export const dryCleanCatalog = [
  {
    name: 'Gloves leather / suede',
    productImage: LeatherG,
    price: '€15.00',
    fav: false,
  },
  {name: 'Gloves textile', productImage: TextileG, price: '€6.00', fav: false},
  {
    name: 'Handkerchief -Dry Cleaning',
    productImage: Handkerchief,
    price: '€3.00',
    fav: false,
  },
  {name: 'Headwears', productImage: Hat, price: '€12.00', fav: false},
  {
    name: 'Neckerchief / Scarf – Dry Cleaning',
    productImage: Scarf,
    price: '€6.50',
    fav: false,
  },
  {name: 'Swimsuit', productImage: Shorts, price: '€10.00', fav: false},
];

export const historyItems: OrderItem[] = [
  {
    title: 'Product A',
    image: {uri: 'https://picsum.photos/200/300'},
    orderNo: 'ORD123456',
    tax: 5.0,
    total: 50.0,
    qty: 2,
    date: new Date('2023-12-15'),
    status: 'Completed',
  },
  {
    title: 'Product B',
    image: {uri: 'https://picsum.photos/200/301'},
    orderNo: 'ORD789012',
    tax: 3.5,
    total: 40.0,
    qty: 1,
    date: new Date('2023-11-28'),
    status: 'Pending',
  },
  // Add 8 more dummy entries using picsum.photos API
  {
    title: 'Product C',
    image: {uri: 'https://picsum.photos/200/302'},
    orderNo: 'ORD345678',
    tax: 4.0,
    total: 30.0,
    qty: 3,
    date: new Date('2023-10-20'),
    status: 'Processing',
  },
  {
    title: 'Product D',
    image: {uri: 'https://picsum.photos/200/303'},
    orderNo: 'ORD901234',
    tax: 2.0,
    total: 20.0,
    qty: 4,
    date: new Date('2023-09-18'),
    status: 'Cancelled',
  },
  {
    title: 'Product E',
    image: {uri: 'https://picsum.photos/200/304'},
    orderNo: 'ORD567890',
    tax: 3.0,
    total: 60.0,
    qty: 1,
    date: new Date('2023-08-10'),
    status: 'On-hold',
  },
  {
    title: 'Product F',
    image: {uri: 'https://picsum.photos/200/305'},
    orderNo: 'ORD123890',
    tax: 5.5,
    total: 70.0,
    qty: 2,
    date: new Date('2023-07-05'),
    status: 'Refunded',
  },
  {
    title: 'Product G',
    image: {uri: 'https://picsum.photos/200/306'},
    orderNo: 'ORD456789',
    tax: 4.0,
    total: 25.0,
    qty: 5,
    date: new Date('2023-06-03'),
    status: 'Failed',
  },
  {
    title: 'Product H',
    image: {uri: 'https://picsum.photos/200/307'},
    orderNo: 'ORD987654',
    tax: 2.5,
    total: 35.0,
    qty: 3,
    date: new Date('2023-05-12'),
    status: 'Completed',
  },
  {
    title: 'Product I',
    image: {uri: 'https://picsum.photos/200/308'},
    orderNo: 'ORD234567',
    tax: 3.0,
    total: 45.0,
    qty: 2,
    date: new Date('2023-04-08'),
    status: 'Pending',
  },
  // Add 1 more entry to make a total of 10 if needed
];

export const countries = [
  {name: 'United Kingdom', code: 'GB', language: 'English'},
  {name: 'Greece', code: 'GR', language: 'Greek'},
  {name: 'India', code: 'IN', language: 'Hindi'},
  {name: 'Pakistan', code: 'PK', language: 'Urdu'},
  {name: 'Spain', code: 'ES', language: 'Spanish'},
  {name: 'United Arab Emirates', code: 'AE', language: 'Arabic'},
  {name: 'China', code: 'CN', language: 'Chinese'},
  {name: 'Russian Federation', code: 'RU', language: 'Russian'},
  {name: 'Indonesia', code: 'ID', language: 'Indonesian'},
  {name: 'Japan', code: 'JP', language: 'Japanese'},
  {name: 'Sri Lanka', code: 'LK', language: 'Sinhala'},
  {name: 'Germany', code: 'GE', language: 'German'},
  {name: 'Turkey', code: 'TR', language: 'Turkish'},
];
export const countryCodes = [
  {name: 'Greece', code: '+30', flagCode: 'GR'},
  {name: 'Pakistan', code: '+92', flagCode: 'PK'},
];
