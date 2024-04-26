import Toast from 'react-native-toast-message';
import {api} from '../api';
import {storage} from '../app/mmkv';
import store from '../app/store';
import {User, setUserData, setUserToken} from '../features/user/userSlice';
import {UserObject} from '../screens/SignIn/utils';
import {catalogItemProps} from '../types';
import {setSearchItems} from '../features/search/searchSlice';

interface Response {
  statusCode?: number;
  status: boolean;
  message: string;
  data: [];
}

interface SignUpResponse {
  status: boolean;
  message: string;
  data: {
    userObject: {
      token: string;
      user: {
        email: string;
        profileImage?: string;
        userName: string;
      };
    };
  };
}

interface ResponseProfile {
  status: boolean;
  message: string;
  data: UserProfile;
}

interface UserProfile {
  status: boolean;
  message: string;
  data: User;
}

interface CartResponse {
  statusCode?: number;
  status: boolean;
  message: string;
  data: {id: string; items: []};
}

interface Creds {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface SignUpCreds {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password: string;
}

const handleUrlChange = ({url}: {url: string}) => {
  // Extract the token value from the deep link
  const tokenMatch = url.match(/token=([^&]+)/);

  if (tokenMatch) {
    const token = tokenMatch[1];
    return token;
  }
};

function hideEmail(email: string) {
  var i = email.indexOf('@');
  var startIndex = (i * 0.2) | 0;
  var endIndex = (i * 0.9) | 0;
  return (
    email.slice(0, startIndex) +
    email.slice(startIndex, endIndex).replace(/./g, '*') +
    email.slice(endIndex)
  );
}

function hidePhoneNumber(phoneNumber: string) {
  // Extract the international code
  const intlCodeLength = phoneNumber.indexOf(' ') + 4;
  const intlCode = phoneNumber.slice(0, intlCodeLength);

  // Replace middle 4 digits with '*'
  const middleDigits = phoneNumber.slice(intlCodeLength, -4);
  let hiddenDigits = '';
  for (let i = 0; i < middleDigits.length; i++) {
    hiddenDigits += '*';
  }

  // Extract and keep last 4 digits
  const lastDigits = phoneNumber.slice(-4);

  // Concatenate all parts
  const hiddenPhoneNumber = intlCode + hiddenDigits + lastDigits;

  return hiddenPhoneNumber;
}

const handleGetFavourites = async (): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/favourite/user');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleGetCart = async (): Promise<{
  statusCode?: number;
  status: boolean;
  data?: {id: string; items: []};
}> => {
  try {
    const response = await api.get<CartResponse>('/cart/user');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const toggleFavourite = async (
  id: string,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.post<Response>('/favourite/add-remove', {
      productId: id,
    });
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const getWishlistIds = async () => {
  const res: {
    status: boolean;
    data?: {id: string; productId: catalogItemProps}[];
  } = await handleGetFavourites();
  if (res.status && res.data) {
    let favItems: string[] = [];
    res.data.map(item => favItems.push(item.productId.id as string));
    return favItems;
  } else return [];
};

const handleGetStatics = async (): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/static');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleUpdateProfile = async (
  userObj: Creds,
): Promise<{
  statusCode?: number;
  status: boolean;
}> => {
  try {
    const response = await api.put<Response>('/user/update-profile', {userObj});
    if (response.data?.status) {
      return {status: true};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleSignUpPhone = async (
  req: SignUpCreds,
): Promise<{status: boolean; userInfo?: UserObject; message?: string}> => {
  try {
    const response = await api.post<SignUpResponse>('/user/sign-up', {
      ...req,
    });
    if (response.data?.status) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Account Created Successfully',
        topOffset: 0,
      });
      api.setHeader(
        'Authorization',
        'Bearer ' + response.data?.data?.userObject?.token,
      );
      return {status: true, userInfo: response.data?.data?.userObject};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleGetSearchItems = async (
  searchedText: string,
): Promise<{status: boolean; data?: {}; message?: string}> => {
  try {
    const response = await api.get<CartResponse>('/product', {
      productName: searchedText,
    });

    if (response.data?.status) {
      store.dispatch(setSearchItems(response.data.data.items));
      return {status: true};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

const getUserProfile = async (): Promise<{
  status: boolean;
  data?: UserProfile;
}> => {
  try {
    const response = await api.get<ResponseProfile>('/user/user-profile');
    if (response.data) {
      return {status: true, data: response.data?.data};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handlefilterProducts = async ({
  categoryId,
  searchedText,
  minVal,
  maxVal,
}: {
  categoryId: string | null;
  searchedText: string;
  minVal?: number;
  maxVal?: number;
}): Promise<{
  status: boolean;
  data?: {id: string; categoryProduct: catalogItemProps}[];
  message?: string;
}> => {
  console.log({
    productName: searchedText,
    minPrice: minVal?.toString(),
    maxPrice: maxVal?.toString(),
    categoryId,
  });
  try {
    const response = await api.get<CartResponse>('/product', {
      categoryId,
      productName: searchedText.length > 0 ? searchedText : undefined,
      minPrice: minVal?.toString(),
      maxPrice: maxVal?.toString(),
    });
    if (response.data?.status) {
      return {status: true, data: response.data.data.items};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

const getCartTotal = (cartData: []) => {
  let total = 0;
  let cartItems: {
    id: string;
    quantity: number;
    product: catalogItemProps;
  }[] = cartData;
  cartItems?.map(
    item => (total = total + item.quantity * Number(item.product.price)),
  );
  return total;
};

export {
  handleUrlChange,
  hideEmail,
  hidePhoneNumber,
  toggleFavourite,
  handleGetFavourites,
  getWishlistIds,
  handleGetStatics,
  handleGetCart,
  handleUpdateProfile,
  handleSignUpPhone,
  handleGetSearchItems,
  handlefilterProducts,
  getCartTotal,
  getUserProfile,
};
