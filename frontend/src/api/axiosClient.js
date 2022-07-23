import axios from 'axios';
export const DOMAIN = 'http://localhost:8080/api';
export const TOKEN = 'token';

const axiosClient = axios.create({
    baseURL: DOMAIN
});

// export const get = async(path, (options = () => {
//     const response = await axiosClient.get(path, options);
//     return response.data;
// }));

axiosClient.interceptors.request.use((config) => {
    //tất cả request đều phải qua đây
    const user = localStorage.getItem('user');
    if (user) {
        // nếu có đăng nhập thì thực hiện
        const { token } = JSON.parse(user);
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
