import Axios from 'axios';
import { Alert } from 'react-native';
import { THE_CAT_API_URL } from '@env';

const RESPONSE_STATUS_CODE_BAD_REQUEST = 400;
const RESPONST_STATUS_CODE_INTERNAL = 500;

const defaultAxios = Axios.create({
  baseURL: THE_CAT_API_URL,
  withCredentials: true,
  headers: { 'x-api-key': '5fc56817-2b97-44d6-99f3-1d72804c922a' },
});

const successHandler = (res) => {
  return res;
};

const errorHandler = (error) => {
  const { statusCode, message } = error?.response?.data?.error;
  let overriden = error;

  switch (statusCode) {
    case RESPONSE_STATUS_CODE_BAD_REQUEST:
      Alert.alert('잘못된 요청입니다.', message);
      break;
    case RESPONST_STATUS_CODE_INTERNAL:
      overriden = {
        response: {
          data: {
            error: { message: '오류가 발생했습니다. 잠시후 다시 시도해주세요' },
          },
        },
      };
      break;
  }
  return Promise.reject(overriden);
};

defaultAxios.interceptors.response.use(successHandler, errorHandler);

module.exports = {
  defaultAxios,
};
