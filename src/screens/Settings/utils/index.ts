import Toast from 'react-native-toast-message';

import {api} from '../../../api';
import {User} from '../../../features/user/userSlice';

interface Creds {
  oldPassword: string;
  newPassword: string;
}

interface Response {
  status: boolean;
  message: string;
  data: {
    userObject: {
      token: string;
      user: {
        email: string;
        profileImage?: string;
        userName: string;
      };
    };
  };
}

interface ResProfile {
  status: boolean;
  message: string;
  data: User;
}

interface ReqProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface ReponseImage {
  status: boolean;
  message: string;
  data: null;
}

const handleChangePassword = async (
  req: Creds,
): Promise<{status: boolean; message?: string}> => {
  console.log('req', req);
  try {
    const response = await api.put<Response>('/user/change-password', {
      ...req,
    });
    console.log('response', response.data);
    if (response.ok) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true};
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
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong',
      topOffset: 0,
    });
    return {status: false};
  }
};

const UpdateProfile = async (
  req: ReqProfile,
): Promise<{status: boolean; message?: string; data?: User}> => {
  console.log('req', req);
  try {
    const response = await api.put<ResProfile>('/user/update-profile', {
      ...req,
    });
    console.log('response', response.data);
    if (response.data?.data) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true, data: response.data?.data};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message!,
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong',
      topOffset: 0,
    });
    return {status: false};
  }
};

const UpdateProfileImage = async (profileImage: string) => {
  const imageType =
    'image/' + profileImage.split('.')[profileImage.split('.').length - 1];
  const imageName = profileImage.split('/')[profileImage.split('/').length - 1];
  console.log(
    'chala ha',
    profileImage.split('.')[profileImage.split('.').length - 1],
  );
  const formData = new FormData();
  formData.append('file', {
    uri: profileImage,
    type: imageType === 'png' ? 'image/png' : 'image/jpeg',
    name: imageName,
  });
  try {
    const response = await api.post<ReponseImage>(
      '/user/update-profile-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('response', response.data);
    if (response.status) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true};
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
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong',
      topOffset: 0,
    });
    return {status: false};
  }
};

export {handleChangePassword, UpdateProfile, UpdateProfileImage};
