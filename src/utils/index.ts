import {api} from '../api';
import {catalogItemProps} from '../types';

interface Response {
  status: boolean;
  message: string;
  data: [];
}

const handleUrlChange = ({url}: {url: string}) => {
  // Extract the token value from the deep link
  const tokenMatch = url.match(/token=([^&]+)/);

  if (tokenMatch) {
    const token = tokenMatch[1];
    console.log('Token from deep link:', token);
    return token;
  }
};

function hideEmail(email: string) {
  // Split the email address into username and domain
  let [username, domain] = email.split('@');

  // Hide characters in the username, leaving only the first two and the last two characters visible
  let hiddenUsername =
    username.length > 4
      ? username.substr(0, 2) +
        '*'.repeat(username.length - 4) +
        username.substr(-2)
      : username;

  // Combine the hidden username and domain with '@' to form the masked email
  let maskedEmail = `${hiddenUsername}@${domain}`;

  return maskedEmail;
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

const toggleFavourite = async (
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
    console.log('responese', response.data);

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

const getWishlistIds = async () => {
  const res: {
    status: boolean;
    data?: {id: string; productId: catalogItemProps}[];
  } = await handleGetFavourites();
  if (res.status && res.data) {
    let favItems: string[] = [];
    res.data.map(item => favItems.push(item.productId.id as string));
    return favItems;
  } else return [];
};

export {
  handleUrlChange,
  hideEmail,
  toggleFavourite,
  handleGetFavourites,
  getWishlistIds,
};
