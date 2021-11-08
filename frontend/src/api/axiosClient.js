import axios from 'axios';

const { REACT_APP_BASE_API_URL } = process.env;

class AxiosClient {
  constructor() {
    this.instance = axios.create({
      baseURL: `${REACT_APP_BASE_API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      this.interceptBeforeRequest,
      this.interceptRequestError
    );
    this.instance.interceptors.response.use(
      this.interceptResponseData,
      this.interceptResponseError
    );
  }

  interceptBeforeRequest = async (config) => {
    if (!config.url) {
      return Promise.reject('URL must not be blank!');
    }
    return config;
  };

  interceptRequestError = (error) => {
    return Promise.reject(error);
  };

  interceptResponseData = (response) => {
    return response.data || response;
  };

  interceptResponseError = (error) => {
    return Promise.reject(error);
  };

  get(url = '/', params = {}, config = {}) {
    return this.instance.get(url, { params, ...config });
  }

  post(url = '/', data, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url = '/', config) {
    return this.instance.put(url, config);
  }

  patch(url = '/', data, config = {}) {
    return this.instance.patch(url, data, config);
  }

  delete(url = '/', params = {}, config = {}) {
    return this.instance.delete(url, { params }, config);
  }
}

export default new AxiosClient();
