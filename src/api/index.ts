import {create} from 'apisauce';

export const BASE_URL = 'http://13.235.154.82';

export const api = create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: USER_TOKEN ? `Basic ${USER_TOKEN}` : '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
