import {api} from '../../../api';
import {storage} from '../../../app/mmkv';
import store from '../../../app/store';
import {setUserData, setUserToken} from '../../../features/user/userSlice';
import {useInitialURL} from '../../../hooks';

interface Response {
  statusCode?: number;
  status: boolean;
  message: string;
  data: [];
}

const handleGetCategories = async (): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/category');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handleGetProducts = async (
  categoryId: string,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/product', {
      categoryId: categoryId,
    });
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      console.log('statusCode', response.data?.statusCode);
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleGetCategories, handleGetProducts};
