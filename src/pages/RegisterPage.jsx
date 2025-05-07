import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 引入 Link 和 useNavigate
import apiClient from '../api/apiClient'; // 引入我们封装的 apiClient

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // 用于显示成功消息
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 基本的前端校验
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (password.length < 6) { // 简单的密码长度校验示例
        setError('密码长度至少需要6位');
        return;
    }

    try {
      const registerData = { username, password, fullName, email };
      // 调用后端的注册 API
      const response = await apiClient.post('/auth/register', registerData);

      // 假设后端成功响应状态码是 201 或 200，并且响应体是成功消息
      if (response.status === 201 || response.status === 200) {
        setSuccess('注册成功！即将跳转到登录页面...');
        // 延迟一小段时间后跳转到登录页
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 延迟 2 秒
      } else {
         // 处理非预期的成功响应
         setError(response.data?.message || '注册失败，请稍后重试');
      }

    } catch (err) {
      // 处理 API 调用错误
      if (err.response && err.response.data) {
          // 优先使用后端返回的错误消息 (字符串或对象)
          const errorMessage = typeof err.response.data === 'string'
              ? err.response.data
              : err.response.data.message || '注册时发生错误';
          setError(errorMessage);
      } else {
        setError('注册时发生网络错误或服务器无响应');
      }
      console.error('Register error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">注册 ProjectFlow 账号</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">用户名</label>
            <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">姓名</label>
            <input id="fullName" name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">确认密码</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          {/* 错误或成功消息提示 */}
          {error && <div className="p-2 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
          {success && <div className="p-2 text-sm text-green-700 bg-green-100 rounded">{success}</div>}

          <div>
            <button type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              注册
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          已有账号?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            前往登录
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;