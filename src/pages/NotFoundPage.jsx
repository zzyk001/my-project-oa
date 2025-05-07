import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
      <p className="mb-8">抱歉，您访问的页面不存在。</p>
      <Link to="/" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        返回首页
      </Link>
    </div>
  );
};

export default NotFoundPage;