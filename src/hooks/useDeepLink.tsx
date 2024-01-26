import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {handleUrlChange} from '../utils';
import {useIsFocused} from '@react-navigation/native';

export default function useDeepLink() {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    Linking.addEventListener('url', ({url}) => {
      setUrl(url);
      setToken(handleUrlChange({url})!);
    });
    // Remove the event listener when the component is unmounted
    return () => Linking.removeAllListeners('url');
  }, []);

  return {token, url};
}
