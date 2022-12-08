import { GET_DATA_URL } from './apiUrls';
import { request } from './request';
  
  export const fetchDataCall = async (payload) => {
    const requestOptions = {
      url: GET_DATA_URL,
      method: 'GET',
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
  
  