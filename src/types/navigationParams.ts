import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  WithPhone: undefined;
  EnterName: undefined;
  ResetPassword: undefined;
  GetNotified: undefined;
  VerificationScreen: undefined; //temp
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
  CategoryView: undefined;
  ProductView: undefined;
  AllowCamera: undefined;
  CouponList: undefined;
  Notifications: undefined;
  Languages: undefined;
  Checkout: undefined;
  OrderSubmit: undefined;
  SelectAddress: undefined;
  SearchAddress: undefined;
  OrderHistory: undefined;
  OrderItem: undefined;
  PrivacyPolicy: undefined;
  AboutUs: undefined;
  DeleteAccount: undefined;
  SearchList: undefined;
  ProductImage: undefined;
  EnterPassword: undefined;
};
