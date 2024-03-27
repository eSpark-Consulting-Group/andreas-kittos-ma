import Toast from 'react-native-toast-message';
import {api} from '../../../api';

interface Creds {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  socialId?: string;
  profileImage?: string;
}

interface Response {
  status: boolean;
  message: string;
  data: {
    otphash: string;
  };
}

const handleSignUpUser = async (
  req: Creds,
): Promise<{status: boolean; hash?: string; message?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/sign-up', {
      ...req,
    });
    console.log('response.data', response.data);

    if (response.data?.status) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true, hash: response.data?.data?.otphash};
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

export {handleSignUpUser};
