import nhost from 'nhost-js-sdk';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { BACKEND_URL } from './constants/secrets';

const { Storage } = Plugins;

let config;

if (isPlatform('capacitor')) {
  config = {
    base_url: BACKEND_URL,
    use_cookies: false,
    client_storage: Storage,
    client_storage_type: 'capacitor',
  };
} else {
  config = {
    base_url: BACKEND_URL,
    use_cookies: true,
    client_storage_type: 'web',
  };
}

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
