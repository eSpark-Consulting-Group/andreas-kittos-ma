import Toast from 'react-native-toast-message';

import {api} from '../../../api';
import {User} from '../../../features/user/userSlice';

interface Creds {
  oldPassword: string;
  newPassword: string;
}

interface Meta {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  itemCount: number;
  currentPage: number;
}

interface ResProfile {
  status: boolean;
  message: string;
  data: User & {otphash: string};
}

interface ReqProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface Response {
  status: boolean;
  message: string;
  data: null;
}

interface OrderStatus {
  status: boolean;
  message: string;
  data: string[];
}

interface OrderList {
  status: boolean;
  message: string;
  data: {
    items: any[];
    meta: Meta;
  };
}

interface OrderListParams {
  page?: string;
  take?: string;
  orderState?: string;
}

const ChangePassword = async (
  req: Creds,
): Promise<{status: boolean; message?: string & {message: string}}> => {
  console.log('req', req);
  try {
    const response = await api.put<{
      status: boolean;
      message?: string & {message: string};
    }>('/user/change-password', {
      ...req,
    });
    console.log('response', response.data);
    if (response.data?.message == 'updated Successfully') {
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
        text1: response?.data?.message?.message,
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
): Promise<{
  status: boolean;
  message?: string;
  data?: User | {otphash: string};
}> => {
  console.log('update profile req', req);
  try {
    const response = await api.put<ResProfile>('/user/update-profile', {
      ...req,
    });
    console.log('response', response.data);
    if (response.data?.message.includes('Success')) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true, data: response.data?.data};
    } else if (response.data?.data.otphash) {
      return {
        status: true,
        message: 'otp',
        data: {otphash: response.data?.data.otphash},
      };
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
    const response = await api.post<Response>(
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
      // Toast.show({
      //   type: 'success',
      //   position: 'top',
      //   text1: 'Image ' + response?.data?.message,
      //   topOffset: 0,
      // });
      return {status: true};
    } else {
      // Toast.show({
      //   type: 'error',
      //   position: 'top',
      //   text1: response?.data?.message,
      //   topOffset: 0,
      // });
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

const DeleteUserAccount = async () => {
  try {
    const response = await api.delete<Response>('/user/delete-account');
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

//? ------------ Order Api Calls ------------

const GetOrderStatus = async (): Promise<{
  status: boolean;
  data?: OrderStatus['data'];
}> => {
  try {
    const response = await api.get<OrderStatus>('/order/order-status-list');
    console.log('response', response.data);
    if (response?.status) {
      return {status: true, data: response.data?.data};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong',
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

const GetOrderList = async (
  params?: OrderListParams,
): Promise<{
  status: boolean;
  data?: OrderList['data'];
}> => {
  console.log('mila ha kuch', params);

  try {
    const response = await api.get<OrderList>('/order/order-list-user', params);
    console.log('response', JSON.stringify(response.data));
    if (response.data) {
      return {status: true, data: response.data?.data};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong',
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong',
      topOffset: 0,
    });
    console.log('error', error);
    return {status: false};
  }
};

const GetOrderDetail = async (
  orderId: string,
): Promise<{
  status: boolean;
  data?: any;
}> => {
  try {
    const response = await api.get<any>(
      '/order/order-detail/' + orderId?.toString(),
    );
    console.log('response', response.data);
    if (response.data) {
      return {status: true, data: response.data?.data};
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong',
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

export {
  ChangePassword,
  UpdateProfile,
  UpdateProfileImage,
  DeleteUserAccount,
  GetOrderStatus,
  GetOrderList,
  GetOrderDetail,
};
