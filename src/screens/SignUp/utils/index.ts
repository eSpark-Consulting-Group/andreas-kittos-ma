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

    if (response.data?.data?.otphash) {
      return {status: true, hash: response.data?.data?.otphash};
    } else {
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleSignUpUser};
