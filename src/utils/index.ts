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
    console.log('Token from deep link:', token);
    return token;
  }
};

function hideEmail(email: string) {
  // Split the email into username and domain parts
  const [username, domain] = email.split('@');

  // Calculate minimum characters to replace (at least half)
  const minReplace = Math.ceil(username.length / 2);

  // Replace characters with asterisks, ensuring at least half are replaced
  const obfuscatedUsername = username.replace(/./g, (_, index) =>
    index < minReplace || Math.random() < 0.5 ? '*' : _,
  );

  // Combine obfuscated username and domain
  return `${obfuscatedUsername}@${domain}`;
}

function hidePhoneNumber(phoneNumber: string) {
  // Remove any non-numeric characters (like '+')
  const digits = phoneNumber.replace(/\D/g, '');

  // Ensure the format is valid (at least 11 digits including '+')
  if (digits.length < 11) {
    return phoneNumber; // Return original if invalid format
  }

  // Calculate number of digits to replace (exactly half)
  const numToReplace = Math.floor((digits.length - 1) / 2); // Subtract 1 for country code

  // Generate random indices to replace (avoid duplicates)
  const replaceIndices = new Set();
  while (replaceIndices.size < numToReplace) {
    replaceIndices.add(Math.floor(Math.random() * (digits.length - 1)) + 1); // +1 to exclude country code
  }

  // Replace digits with asterisks at the generated indices
  let obfuscatedDigits = '';
  for (let i = 0; i < digits.length; i++) {
    obfuscatedDigits += replaceIndices.has(i) ? '*' : digits[i];
  }

  // Rebuild the phone number with '+' and country code
  return `+${obfuscatedDigits.slice(0, 1)}${obfuscatedDigits.slice(1)}`;
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
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
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
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
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
    console.log('id to add', id);
    const response = await api.post<Response>('/favourite/add-remove', {
      productId: id,
    });
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
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
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
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
    console.log('respone', response);
    if (response.data?.status) {
      return {status: true};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handleSignUpPhone = async (
  req: SignUpCreds,
): Promise<{status: boolean; userInfo?: UserObject; message?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<SignUpResponse>('/user/sign-up', {
      ...req,
    });
    console.log('phone sign up response.data', response.data);

    if (response.data?.status) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
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
    console.log('error', error);
    return {status: false};
  }
};

const handleGetSearchItems = async (
  searchedText: string,
): Promise<{status: boolean; data?: {}; message?: string}> => {
  console.log('searchedText', searchedText);
  try {
    const response = await api.get<CartResponse>('/product', {
      productName: searchedText,
    });

    if (response.data?.status) {
      console.log('response.data.data.items', response.data.data.items);
      store.dispatch(setSearchItems(response.data.data.items));
      return {status: true};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
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
    console.log('error', error);
    return {status: false};
  }
};

const getUserProfile = async (): Promise<{
  status: boolean;
  data?: UserProfile;
}> => {
  try {
    const response = await api.get<ResponseProfile>('/user/user-profile');
    console.log('response', response.data);
    if (response.data) {
      return {status: true, data: response.data?.data};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handlefilterProducts = async (
  minVal: number | null,
  maxVal: number | null,
  categoryId: string | null,
  searchedText: string,
): Promise<{status: boolean; data?: []; message?: string}> => {
  console.log('filter data', minVal, maxVal, categoryId);
  try {
    const response = await api.get<CartResponse>('/product', {
      productName: searchedText,
      minPrice: minVal,
      maxPrice: maxVal,
      categoryId,
    });

    if (response.data?.status) {
      console.log('response.data.data.items', response.data.data.items);

      return {status: true, data: response.data.data.items};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
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
    console.log('error', error);
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
