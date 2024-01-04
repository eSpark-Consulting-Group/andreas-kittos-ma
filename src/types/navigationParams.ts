import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  GetNotified: undefined;
  Draw: undefined;
  D1Nav: NavigatorScreenParams<D1ParamsList>;
};

export type BottomTabParamsList = {
  Home: undefined;
  Category: undefined;
  Search: undefined;
  Cart: undefined;
  Settings: undefined;
};

export type D1ParamsList = {
  Profile: undefined;
  WishList: undefined;
};
