import axios from 'axios';
import { errorToastMessage } from './errorServices';

const getRequestOptions = ({
  method,
  url,
  body,
}) => {
  const options = {
    method, // *GET, POST, PUT, DELETE, PATCH,
    url,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-store, max-age=0', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  if (body && method !== 'GET') {
    options.data = JSON.stringify(body);
  }

  return options;
};

export const request = async ({
  url,
  method = 'GET',
  body,
}) => {
  const requestOptions = getRequestOptions({ url, method, body });

  try {
    const response = await axios.request(requestOptions);
    return response.data;
  } catch (err) {
    if (err.response.status === 400) {
      errorToastMessage(`Error 400: ${err.response.message}`);
    } else if (err.response.status === 404) {
      errorToastMessage(`Error 404: ${err.response.message}`);
    } else errorToastMessage(`Error: ${err.response}`);
    throw err;
  }
};
