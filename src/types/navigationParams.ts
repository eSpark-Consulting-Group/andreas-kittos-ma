import {NavigatorScreenParams} from '@react-navigation/native';
import {catalogItemProps} from '.';

export type RootStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
  WithPhone: undefined;
  EnterName: {phoneNumber: string; password: string};
  EnterPassword: {phoneNumber: string};
  ResetPassword?: {hash: string; emailPhone?: string; otp: string};
  GetNotified: undefined;
  VerificationScreen: {
    type: 'resetPass' | 'email' | 'phone';
    otphash: string;
    email?: string;
    phone?: string;
    pass?: string;
  }; //temp
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
  CategoryView: {categoryName: string; categoryId: string};
  ProductView: {produtInfo: catalogItemProps};
  AllowCamera: undefined;
  CouponList: undefined;
  Notifications: undefined;
  Languages: undefined;
  Checkout: {latLong: string};
  OrderSubmit: undefined;
  SelectAddress: undefined;
  SearchAddress: undefined;
  OrderHistory: undefined;
  OrderItem: undefined;
  PrivacyPolicy: undefined;
  AboutUs: undefined;
  DeleteAccount: undefined;
  SearchList: undefined;
  ProductImage: {image: string};
  EnterPassword: undefined;
};
