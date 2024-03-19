import Toast from 'react-native-toast-message';
import {api} from '../api';
import {storage} from '../app/mmkv';
import store from '../app/store';
import {setUserData, setUserToken} from '../features/user/userSlice';
import {UserObject} from '../screens/SignIn/utils';
import {catalogItemProps} from '../types';

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
  // Split the email address into username and domain
  let [username, domain] = email.split('@');

  // Hide characters in the username, leaving only the first two and the last two characters visible
  let hiddenUsername =
    username.length > 4
      ? username.substr(0, 2) +
        '*'.repeat(username.length - 4) +
        username.substr(-2)
      : username;

  // Combine the hidden username and domain with '@' to form the masked email
  let maskedEmail = `${hiddenUsername}@${domain}`;

  return maskedEmail;
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

export {
  handleUrlChange,
  hideEmail,
  toggleFavourite,
  handleGetFavourites,
  getWishlistIds,
  handleGetStatics,
  handleGetCart,
  handleUpdateProfile,
  handleSignUpPhone,
};
