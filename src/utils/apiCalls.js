import { GET_DATA_URL } from './apiUrls';
import { request } from './request';
  
  export const fetchDataCall = async (queryParams) => {
    const requestOptions = {
      url: `${GET_DATA_URL}?page=${queryParams.skip ? queryParams.skip : 0}&size=${queryParams.limit ? queryParams.limit : 15}`,
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
  
  