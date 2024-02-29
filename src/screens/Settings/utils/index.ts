import {api} from '../../../api';

interface Response {
  status: boolean;
  message: string;
  data: [];
}

const handleGetFavourites = async (): Promise<{
  status: boolean;
  data?: [];
}> => {
  try {
    const response = await api.get<Response>('/favourite/user');
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

const addToFavourite = async (
  id: string,
): Promise<{
  status: boolean;
  data?: [];
}> => {
  try {
    console.log('id to add', id);
    const response = await api.post<Response>('/favourite/add-remove', {
      productId: id,
    });
    console.log('add to favourite api', response);
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

const removeFavourite = async (
  id: string,
): Promise<{
  status: boolean;
  data?: [];
}> => {
  try {
    console.log('id to delete', id);

    const response = await api.delete<Response>('/favourite/' + id);
    console.log('remove favourite api', response);
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

export {handleGetFavourites, removeFavourite, addToFavourite};
