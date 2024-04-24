import {create} from 'apisauce';
import {GOOGLE_API_KEY, api} from '../../../../api';
import {OrderDetails, UserInfoAddr} from '../../../../types';
import Toast from 'react-native-toast-message';
import store from '../../../../app/store';
import {setSearchLoader} from '../../../../features/search/searchSlice';

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

const searchMapsAPI = create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
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
  const radius = '2000'; // kms
  const input = searchText.trim();
  const {latitude, longitude} = store.getState().search.searchRegion;
  const location = `${latitude},${longitude}&radius=${radius}`;
  store.dispatch(setSearchLoader(true));
  try {
    const searchMapsRes = await searchMapsAPI.get<any>(
      `/textsearch/json?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`,
    );
    if (searchMapsRes?.data?.status == 'OK') {
      console.log('kia mila ha =======>>', searchMapsRes.data);
      store.dispatch(setSearchLoader(false));
      return {data: searchMapsRes.data?.results};
    } else {
      store.dispatch(setSearchLoader(false));
      return {data: null};
    }
  } catch (e) {
    console.log('error at search', e);
    store.dispatch(setSearchLoader(false));

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
