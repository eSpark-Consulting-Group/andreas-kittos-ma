import {DarkTheme as DT, DefaultTheme} from '@react-navigation/native';

const colors = {
  light: {
    primary: '#49ACE1',
    background: '#FFFFFF',
    card: '#FAFAFA',
    text: '#424242',
    border: '#E4E4E4',
    notification: '#FFFFFF', //todo: set later
    placeholder: '#888888',
  },
  dark: {
    primary: '#49ACE1',
    background: '#101010',
    card: '#29292E',
    text: '#FFFFFF',
    border: '#6F6F6F',
    notification: '#FFFFFF', //todo: set later
    placeholder: '#888888',
  },
};

const LightTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, ...colors.light},
};

const DarkTheme = {
  ...DT,
  colors: {...DT.colors, ...colors.dark},
};

export {colors, LightTheme, DarkTheme};
