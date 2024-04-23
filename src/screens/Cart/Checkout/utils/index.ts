import {create} from 'apisauce';
import {api} from '../../../../api';
import {OrderDetails, UserInfoAddr} from '../../../../types';
import Toast from 'react-native-toast-message';

interface StateResponse {
  error: boolean;
  msg: string;
  data: {name: string; states: {name: string; state_code: string}[]};
}

interface Response {
  status: boolean;
  message: string;
  data: [];
}
interface OrderResponse {
  status: boolean;
  message: string;
  data: OrderDetails;
}
interface DirectionResponse {
  routes: {distance: number}[];
  code: string;
  uuid: string;
}

interface SearchResponse {
  features: {text: string; place_name: string; geometry: {coordinates: []}}[];
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

const mapAPI = create({
  baseURL: 'https://api.mapbox.com/directions/v5/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const geocodingAPI = create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const handleGetStates = async () => {
  const stateRes = await countriesAPI.post<StateResponse>('/states', {
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
    cityRes.data?.data.map(item => cities.push({name: item}));
    return cities;
  }
};

const handleSaveAddress = async (userInfo: UserInfoAddr): Promise<void> => {
  const saveRes = await api.post<Response>('/address', {
    type: 'shipping',
    ...userInfo,
  });
  if (saveRes.data?.status) {
    Toast.show({
      text1: 'Address Saved. Please select one from them',
      type: 'success',
      topOffset: 0,
    });
  }
};

const handleGetAddresses = async () => {
  const addressRes = await api.get<Response>('/address', {
    addressType: 'shipping',
  });
  return addressRes.data?.data;
};

const handleDeleteAddress = async (id: string) => {
  const addressRes = await api.delete<Response>('/address/' + id);
  if (addressRes.status) {
    return {status: addressRes.data?.status};
  } else {
    return {status: addressRes.data?.status};
  }
};

const handleCalculateDist = async (
  latLong: string,
): Promise<{
  data?: {distance: number}[] | null;
}> => {
  const calculRes = await mapAPI.get<DirectionResponse>(
    '/mapbox/driving/' + '33.030979,34.679749;' + latLong,
    {
      access_token:
        'pk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGV3YmN2MHFiZTJqbzZiZmNiMzFrNCJ9.2N73Pcrr9YD65RzDXKJL3g',
    },
  );

  if (calculRes.status == 200) {
    return {data: calculRes.data?.routes};
  } else {
    return {data: null};
  }
};

const handleGetPlaces = async (
  searchText: string,
): Promise<{
  data?:
    | {text: string; place_name: string; geometry: {coordinates: []}}[]
    | null;
}> => {
  const searchRes = await geocodingAPI.get<SearchResponse>(
    '/mapbox.places/' + searchText + '.json',
    {
      access_token:
        'pk.eyJ1Ijoid2lyYWRhbGkiLCJhIjoiY2x0cGV3YmN2MHFiZTJqbzZiZmNiMzFrNCJ9.2N73Pcrr9YD65RzDXKJL3g',
    },
  );

  if (searchRes.status == 200) {
    return {data: searchRes.data?.features};
  } else {
    return {data: null};
  }
};

const handleCheckout = async (checkout: {}): Promise<{
  status: boolean;
  data?: OrderDetails;
}> => {
  const checkoutRes = await api.post<Response>('/checkout', checkout);

  const orderData = {
    paymentType: 'COD',
    paymentStatus: 'Pending',
  };

  const orderCreateRes = await api.post<OrderResponse>(
    '/order/create-order',
    orderData,
  );
  if (orderCreateRes.status) {
    return {status: true, data: orderCreateRes.data?.data};
  } else {
    return {status: false};
  }
};

export {
  handleGetStates,
  handleGetCities,
  handleSaveAddress,
  handleGetAddresses,
  handleDeleteAddress,
  handleCalculateDist,
  handleCheckout,
  handleGetPlaces,
};
