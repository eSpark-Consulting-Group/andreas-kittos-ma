import {api} from '../../../api';

interface Creds {
  phoneNumber: string;
}

interface Response {
  status: boolean;
  message: string;
}

const getPhoneOTP = async (
  req: Creds,
): Promise<{status: boolean; token?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/send-otp', {
      ...req,
    });
    console.log('response', response);

    if (response.data?.message) {
      return {status: true};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {getPhoneOTP};
