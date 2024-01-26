import {api} from '../../../api';

interface Creds {
  email: string;
  password: string;
}

interface Response {
  status: boolean;
  message: string;
  data: {
    otphash: string;
  };
}

const handleSignInUser = async (
  req: Creds,
): Promise<{status: boolean; token?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/sign-in', {
      ...req,
    });
    if (response.data?.data?.otphash) {
      return {status: true, token: response.data?.data?.otphash};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleSignInUser};
