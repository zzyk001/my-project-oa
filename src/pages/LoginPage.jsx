import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import apiClient from '../api/apiClient'; // 假设我们创建了 apiClient
// import authService from '../services/authService'; // 或者直接使用封装的服务

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 获取导航函数

  const handleLogin = async (e) => {
    e.preventDefault(); // 阻止表单默认提交
    setError(''); // 清除之前的错误

    try {
      // --- 调用后端 API ---
      // 直接使用 apiClient (封装了 axios)
      const response = await apiClient.post('/auth/login', { username, password });

      // 假设后端成功响应格式为 { success: true, data: { accessToken: "..." } }
      if (response.data && response.data.success && response.data.data.accessToken) {
        const token = response.data.data.accessToken;
        // 存储 Token
        localStorage.setItem('authToken', token);
        // 可以在这里也存储用户信息（如果后端返回的话）
        // localStorage.setItem('user', JSON.stringify(response.data.data.user));

        // 登录成功，跳转到仪表盘或其他主页
        navigate('/'); // 跳转到根路径 (通常是 Dashboard)
      } else {
        // 后端返回了成功响应，但数据格式不对或缺少 token
        setError(response.data.message || '登录失败，请检查响应格式');
      }
    } catch (err) {
      // 处理 API 调用错误
      if (err.response && err.response.data && err.response.data.message) {
        // 优先使用后端返回的错误信息
        setError(err.response.data.message);
      } else {
        setError('登录时发生错误，请稍后再试');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">登录 ProjectFlow</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="p-2 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登录
            </button>
          </div>
        </form>
        {/* 可以添加注册链接等 */}
        {/* <p className="mt-2 text-sm text-center text-gray-600">
          还没有账号?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            立即注册
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;