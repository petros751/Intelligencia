import axios from 'axios';

const getRequestOptions = ({
  method,
  url,
  token,
  body,
}) => {
  const options = {
    method, // *GET, POST, PUT, DELETE, PATCH, HEAD...
    url,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-store, max-age=0', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'include', // include, *same-origin, omit
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
      Authorization: token,
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
  token,
}) => {
  const requestOptions = getRequestOptions({ url, method, body, token });

  try {
    const response = await axios.request(requestOptions);
    return response.data;
  } catch (err) {
    if (err.response) {
      console.log('Error: ', err.response);
    }
    if (err.message === 'Network Error') {
      // store.dispatch(setHasNetworkError(true));
    } else if (err.response && (err.response.status === 401 || err.response.statusText === 'Unauthorized')) {
      // store.dispatch(logout());
    }
    throw err;
  }
};
