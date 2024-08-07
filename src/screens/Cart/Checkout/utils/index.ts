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
  rows: [
    {
      elements: [
        {
          distance: {
            text: string;
          };
        },
      ];
    },
  ];
}

interface SearchResponse {
  features: {text: string; place_name: string; geometry: {coordinates: []}}[];
}

interface CityResponse {
  error: boolean;
  msg: string;
  data: string[];
}

interface placeInfoData {
  administrative_area_level_1: string;
  country: string;
  locality: string;
  postal_code: string;
  route: string;
  street_number: string;
}

type placeInfos = [
  'administrative_area_level_1',
  'country',
  'locality',
  'postal_code',
  'route',
  'street_number',
];

const countriesAPI = create({
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const mapAPI = create({
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const geocodingAPI = create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode',
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

const handleSaveAddress = async (
  userInfo: UserInfoAddr,
  showToast: boolean,
): Promise<void> => {
  const saveRes = await api.post<Response>('/address', {
    type: 'shipping',
    ...userInfo,
  });
  if (saveRes.data?.status && showToast) {
    Toast.show({
      text1: 'Address Saved. Please select one from them',
      type: 'success',
      topOffset: 0,
    });
  } else {
    console.log('kia hoa?');
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
  data?: {distance: number} | null;
}> => {
  const shop_lat = '34.679749';
  const shop_long = '33.030979';
  const calculRes = await mapAPI.get<DirectionResponse>(
    '/json?destinations=' + `${shop_lat},${shop_long}` + '&origins=' + latLong,
    {
      key: 'AIzaSyDijMpTLry6XqNraMpfwwpbf8HenfbaQuA',
    },
  );
  if (calculRes.status == 200 && calculRes.data) {
    const dis = calculRes.data.rows[0].elements[0].distance.text.replace(
      /[^\d.-]/g,
      '',
    );
    return {data: {distance: Number(dis)}};
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

const handleGetPlaceInfo = async (placeId: string) => {
  const placeInfo = await geocodingAPI.get<any>(
    `/json?key=AIzaSyDijMpTLry6XqNraMpfwwpbf8HenfbaQuA&place_id=${placeId}`,
  );
  if (placeInfo.data.status == 'OK') {
    console.log('placeInfo', placeInfo.data.results[0].address_components);

    let placeInformation: placeInfoData = {
      administrative_area_level_1: '',
      country: '',
      locality: '',
      postal_code: '',
      route: '',
      street_number: '',
    };
    placeInfo.data.results[0].address_components?.map(
      (item: {long_name: string; short_name: string; types: placeInfos}) => {
        placeInformation[`${item.types[0]}`] = item.long_name;
      },
    );
    return placeInformation;
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
  handleGetPlaceInfo,
};
