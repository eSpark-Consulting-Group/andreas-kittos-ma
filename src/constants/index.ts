import {Dimensions} from 'react-native';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

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
  {name: 'Cyprus', code: '+357', flagCode: 'CY'},
];
