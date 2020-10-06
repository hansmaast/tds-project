import nhost from "nhost-js-sdk";
import { BACKEND_URL } from "../constants/secrets";


const config = {
  base_url: BACKEND_URL,
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };