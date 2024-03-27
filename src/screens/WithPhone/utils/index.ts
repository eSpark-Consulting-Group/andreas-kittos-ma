import Toast from 'react-native-toast-message';
import {api} from '../../../api';

interface Creds {
  phoneNumber: string;
}

interface Response {
  status: boolean;
  message: string;
  data: {otphash?: string};
}

const getPhoneOTP = async (
  req: Creds,
): Promise<{status: boolean; otphash?: string}> => {
  try {
    const response = await api.post<Response>('/user/send-otp', {
      ...req,
    });
    console.log('getPhoneOTP res', response.data);

    if (response.data?.status == true) {
      return {status: true, otphash: response.data.data.otphash};
    } else {
      Toast.show({
        type: 'error',
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

export {getPhoneOTP};
