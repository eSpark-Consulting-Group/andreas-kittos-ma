import Toast from 'react-native-toast-message';
import {api} from '../../../api';
import store from '../../../app/store';
import {storage} from '../../../app/mmkv';
import {setUserData, setUserToken} from '../../../features/user/userSlice';
import {getCartTotal, handleGetCart} from '../../../utils';
import {
  setCartId,
  setCartItems,
  setCartTotal,
} from '../../../features/cart/cartSlice';

interface Response {
  statusCode?: number;
  status: boolean;
  message: string;
  data: [];
}

const handleRemoveCartItem = async (
  cartId: string,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.delete<Response>('/cart/' + cartId);
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

const getCartData = async () => {
  const cartRes = await handleGetCart();
  if (cartRes.status) {
    store.dispatch(setCartId(cartRes.data?.id));
    store.dispatch(setCartItems(cartRes.data?.items));
    store.dispatch(setCartTotal(getCartTotal(cartRes.data?.items as [])));
  }
};

const handleClearCart = async (
  cartId: string,
): Promise<{
  statusCode?: number;
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.delete<Response>('/cart/clear/' + cartId);

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

export {handleRemoveCartItem, getCartData, handleClearCart};
