import { env } from '@config/environment';
import axios from 'axios';
import Swal from 'sweetalert2';

const httpService = axios.create({
  baseURL: env.BASE_URL,
});

httpService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;
    if (data) {
      Swal.fire(status.toString(), data.message, 'error');
    } else {
      Swal.fire('Error', error.message, 'error');
    }
    return Promise.reject(error);
  },
);

export default httpService;
