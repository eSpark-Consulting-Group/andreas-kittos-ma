import Toast from 'react-native-toast-message';
import {api} from '../../../api';

interface EmailLink {
  emailPhone: string;
}

interface ResetPass {
  password: string;
  otp: string;
  hash: string;
  emailPhone: string;
}

interface ResponseSendLink {
  status: boolean;
  message: string;
  data: {otphash?: string};
}

interface ResponseResetPass {
  status: boolean;
  message: string;
  data: null;
}

const handleSendLink = async (
  req: EmailLink,
): Promise<{status: boolean; otphash?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<ResponseSendLink>(
      '/user/password-reset-opt',
      {
        ...req,
      },
    );
    console.log('response.data?', response?.data);

    if (response.data?.status) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {
        status: true,
        otphash: response?.data?.data?.otphash,
      };
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handleResetPass = async (
  req: ResetPass,
): Promise<{status: boolean; message: string}> => {
  console.log('req', req);
  try {
    const response = await api.put<ResponseResetPass>('/user/password-reset', {
      ...req,
    });
    console.log('response', response.data);

    if (response.data?.status) {
      return {status: true, message: response.data.message};
    } else {
      return {status: false, message: response?.data?.message as string};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false, message: 'Something went wrong'};
  }
};

export {handleSendLink, handleResetPass};
