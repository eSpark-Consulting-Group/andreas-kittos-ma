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

const handleSignUpUser = async (
  req: Creds,
): Promise<{status: boolean; hash?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<{otphash: string}>('/user/sign-up', {
      ...req,
      user_name: 'string',
    });
    if (response.data?.otphash) {
      return {status: true, hash: response?.data?.otphash};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleSignUpUser};
