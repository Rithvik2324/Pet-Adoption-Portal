import axios from 'axios';
const instance = axios.create({ baseURL: '/api' });

const api = {
  setToken: (t) => { 
    if (t) instance.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    else delete instance.defaults.headers.common['Authorization'];
  },
  get: (url, opts) => instance.get(url, opts),
  post: (url, data, opts) => instance.post(url, data, opts),
  put: (url, data, opts) => instance.put(url, data, opts),
  delete: (url, opts) => instance.delete(url, opts),
  instance
};
export default api;
