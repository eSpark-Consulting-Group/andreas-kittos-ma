import Toast from 'react-native-toast-message';
import {api} from '../../../api';
import {storage} from '../../../app/mmkv';
import store from '../../../app/store';
import {setUserData, setUserToken} from '../../../features/user/userSlice';
import {useInitialURL} from '../../../hooks';
import {getCartData} from '../../Cart/utils';

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
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      return {status: false};
    }
  } catch (error) {
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
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      Toast.show({
        text1: response.data?.message ?? 'Something went wrong',
        type: 'error',
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleAddItemToCart = async (
  productId: string,
  productQty: number,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.post<Response>('/cart', {
      product: productId,
      quantity: productQty,
    });
    if (response.data?.status) {
      Toast.show({
        text1: 'This product has been added to cart!',
        type: 'success',
        topOffset: 0,
      });
      getCartData();
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      Toast.show({
        text1: response.data?.message ?? 'Error',
        type: 'error',
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

const handleUpdateCartItem = async (
  cartId: string,
  productId: string,
  productQty: number,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.put<Response>('/cart/update/' + cartId, {
      product: productId,
      quantity: productQty,
    });
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else if (response.data?.statusCode == 401) {
      store.dispatch(setUserToken(''));
      store.dispatch(setUserData(null));
      storage.set('userToken', '');
      return {status: false, statusCode: response.data?.statusCode};
    } else {
      Toast.show({
        text1: response.data?.message,
        type: 'error',
        topOffset: 0,
      });
      return {status: false};
    }
  } catch (error) {
    return {status: false};
  }
};

export {
  handleGetCategories,
  handleGetProducts,
  handleAddItemToCart,
  handleUpdateCartItem,
};
