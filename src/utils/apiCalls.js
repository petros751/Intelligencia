import {
    LOGIN_URL,
  } from './apiUrls';
  import { request } from './request';
  
  export const fetchDataCall = async (payload) => {
    const requestOptions = {
      url: LOGIN_URL,
      method: 'POST',
      body: payload,
    };
  
    let response;
    try {
      response = await request(requestOptions);
    } catch (err) {
      if (err.response && err.response?.data) {
        response = err.response?.data;
      }
    }
  
    return response;
  };
  
  