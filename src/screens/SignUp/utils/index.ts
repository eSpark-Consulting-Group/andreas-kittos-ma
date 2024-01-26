import {api} from '../../../api';

interface Creds {
  first_name: string;
  last_name: string;
  user_name?: string;
  email: string;
  password: string;
  social_id?: string;
  profile_image?: string;
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
): Promise<{status: boolean; hash?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<Response>('/user/sign-up', {
      ...req,
      user_name: 'string',
    });
    if (response.data?.data?.otphash) {
      return {status: true, hash: response.data?.data?.otphash};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleSignUpUser};
