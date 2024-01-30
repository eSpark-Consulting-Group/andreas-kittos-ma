import {api} from '../../../api';

interface Response {
  status: boolean;
  message: string;
  data: [];
}

const handleGetCategories = async (): Promise<{
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/category');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};
const handleGetProducts = async (): Promise<{
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/product');
    if (response.data?.status) {
      return {status: true, data: response.data?.data};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleGetCategories, handleGetProducts};
