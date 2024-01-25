import {api} from '../../../api';

interface EmailVerificationBody {
  email: string;
  otp: string;
  hash: string;
}

const handleVerifyEmail = async (
  req: EmailVerificationBody,
): Promise<{status: boolean; token?: string}> => {
  console.log('req', req);
  try {
    const response = await api.post<{token: string}>('/user/sign-up', {
      ...req,
    });
    if (response.data?.token) {
      return {status: true, token: response?.data?.token};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

//TODO: Needs work on when Phone Verification
const handleVerifyPhone = async (
  req: EmailVerificationBody,
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

export {handleVerifyEmail, handleVerifyPhone};
