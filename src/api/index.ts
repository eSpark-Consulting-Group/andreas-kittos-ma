import {create} from 'apisauce';

export const BASE_URL = 'https://api.mpougadalaundry.com';
export const GOOGLE_API_KEY = 'AIzaSyDijMpTLry6XqNraMpfwwpbf8HenfbaQuA';

export const api = create({
  baseURL: BASE_URL,
  headers: {
    // Authorization: USER_TOKEN ? `Basic ${USER_TOKEN}` : '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
