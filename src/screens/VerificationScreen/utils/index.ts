import Toast from 'react-native-toast-message';
import {api} from '../../../api';

interface EmailVerificationBody {
  emailPhone: string;
  otp: string;
  hash: string;
}
interface Email {
  email: string;
}

interface Phone {
  phoneNumber: string;
}

interface Response {
  status: boolean;
  message: string;
  data: {
    token: string;
  };
}
interface ResendResponse {
  status: boolean;
  message: string;
  data: {
    otphash: string;
  };
}

const handleVerifyOTP = async (
  req: EmailVerificationBody,
): Promise<{status: boolean; message?: string}> => {
  try {
    const response = await api.post<Response>('/user/verify-account', {
      ...req,
    });

    if (response.data?.status) {
      return {status: true};
    } else {
      Toast.show({
        text1: response.data?.message ?? 'Something went wrong',
        type: 'error',
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleProfileVerify = async (
  req: EmailVerificationBody,
  token: string,
): Promise<{status: boolean; message?: string}> => {
  try {
    const response = await api.post<Response>(
      '/user/verify-new-email-phone-for-update',
      {
        ...req,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    if (response.data?.status) {
      return {status: true};
    } else {
      Toast.show({
        text1: response.data?.message ?? 'Something went wrong',
        type: 'error',
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

//TODO: Needs work on when Phone Verification
const handleVerifyPhone = async (
  req: EmailVerificationBody,
): Promise<{status: boolean; hash?: string}> => {
  try {
    const response = await api.post<{otphash: string}>('/user/sign-up', {
      ...req,
    });
    if (response.data?.otphash) {
      return {status: true, hash: response?.data?.otphash};
    } else {
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleResendEmailOTP = async (
  req: Email,
): Promise<{status: boolean; otphash?: string}> => {
  try {
    const response = await api.post<ResendResponse>('/user/resend-email', {
      ...req,
    });

    if (response.data?.data?.otphash) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Send Otp Successfully',
        topOffset: 0,
      });
      return {status: true, otphash: response?.data?.data?.otphash};
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
    return {status: false};
  }
};
const handleResendPhoneOTP = async (
  req: Phone,
): Promise<{status: boolean; hash?: string}> => {
  try {
    const response = await api.post<ResendResponse>('/user/send-otp', {
      ...req,
    });
    if (response.data?.data?.otphash) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Otp sent successfully',
        topOffset: 0,
      });
      return {status: true, hash: response?.data?.data?.otphash};
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
    return {status: false};
  }
};

export {
  handleVerifyOTP,
  handleVerifyPhone,
  handleResendEmailOTP,
  handleResendPhoneOTP,
  handleProfileVerify,
};
