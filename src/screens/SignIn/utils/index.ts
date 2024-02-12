import Toast from 'react-native-toast-message';
import {api} from '../../../api';

interface Creds {
  userCred: string;
  password: string;
}

interface OAuthCreds {
  firstName: string;
  lastName: string;
  email: string;
  socialId?: string;
  profileImage?: string;
}

interface Response {
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

const handleSignInUser = async (
  req: Creds,
): Promise<{status: boolean; token?: string; message?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/sign-in', {
      ...req,
    });
    console.log('response', response.data);

    if (response.data?.data?.userObject?.token) {
      return {status: true, token: response.data?.data?.userObject?.token};
    } else {
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handleOAuthSiginIn = async (
  req: OAuthCreds,
): Promise<{status: boolean; token?: string; message?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/sign-up', {
      ...req,
    });
    console.log('response.data', response.data);

    if (response.data?.status) {
      return {status: true, token: response.data?.data.userObject.token};
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

export {handleSignInUser, handleOAuthSiginIn};
