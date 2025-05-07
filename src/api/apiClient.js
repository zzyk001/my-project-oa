import axios from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
  // 设置后端 API 的基础 URL
  // 在开发环境中，如果前端和后端运行在不同端口，可能需要写完整 URL 或配置 Vite 代理
  // 假设 Vite 配置了代理将 /api 转发到 http://localhost:8686/api
  baseURL: '/api', // 生产环境通常也是 /api
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // 处理请求错误
  return Promise.reject(error);
});

// 添加响应拦截器 (可选)
apiClient.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 处理响应错误
  // 例如，如果收到 401 未授权错误，可能需要清除 Token 并重定向到登录页
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized request - logging out.');
    localStorage.removeItem('authToken');
    // 可以使用 window.location.href = '/login'; 进行强制跳转，
    // 或者如果可能，使用 React Router 的 navigate 函数 (但这在拦截器中可能不易获取)
     window.location.href = '/login'; // 简单粗暴的方式
  }
  return Promise.reject(error);
});

export default apiClient;