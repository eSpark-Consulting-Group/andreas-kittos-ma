import {create} from 'apisauce';
import {api} from '../../../../api';
import {UserInfoAddr} from '../../../../types';

interface Response {
  error: boolean;
  msg: string;
  data: {name: string; states: {name: string; state_code: string}[]};
}

interface AddrResponse {
  status: boolean;
  message: string;
  data: [];
}

interface CityResponse {
  error: boolean;
  msg: string;
  data: string[];
}

const countriesAPI = create({
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// const handleRemoveCartItem = async (
//   cartId: string,
// ): Promise<{
//   statusCode?: number;
//   status: boolean;
//   data?: [];
// }> => {
//   try {
//     const response = await api.delete<Response>('/cart/' + cartId);
//     if (response.data?.status) {
//       return {status: true, data: response.data?.data};
//     } else if (response.data?.statusCode == 401) {
//       console.log('statusCode', response.data?.statusCode);
//       store.dispatch(setUserToken(''));
//       store.dispatch(setUserData(null));
//       storage.set('userToken', '');
//       return {status: false, statusCode: response.data?.statusCode};
//     } else {
//       Toast.show({
//         text1: response.data?.message,
//         type: 'error',
//         topOffset: 0,
//       });
//       return {status: false};
//     }
//   } catch (error) {
//     console.log('error', error);
//     return {status: false};
//   }
// };

const handleGetStates = async () => {
  const stateRes = await countriesAPI.post<Response>('/states', {
    country: 'Cyprus',
  });
  if (!stateRes.data?.error) {
    return stateRes.data?.data.states;
  }
};

const handleGetCities = async (state: string) => {
  const cityRes = await countriesAPI.post<CityResponse>('/state/cities', {
    country: 'Cyprus',
    state,
  });
  if (!cityRes.data?.error) {
    let cities: {name: string}[] = [];
    console.log('stateRes.data', cityRes.data?.data);
    cityRes.data?.data.map(item => cities.push({name: item}));
    return cities;
  }
};

const handleSaveAddress = async (userInfo: UserInfoAddr) => {
  console.log('userAddress', userInfo);
  const saveRes = await api.post<Response>('/address', {
    type: 'shipping',
    ...userInfo,
  });
};

const handleGetAddresses = async () => {
  const addressRes = await api.get<AddrResponse>('/address', {
    addressType: 'shipping',
  });
  return addressRes.data?.data;
};

export {
  handleGetStates,
  handleGetCities,
  handleSaveAddress,
  handleGetAddresses,
};
