import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // Link 用于导航, Outlet 用于渲染子路由
// import Header from '../components/Header'; // 假设有 Header 组件
// import Sidebar from '../components/Sidebar'; // 假设有 Sidebar 组件

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // 清除 Token
    // 可以选择性地清除其他本地存储的用户信息
    navigate('/login'); // 跳转到登录页
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 假设的 Header 组件 */}
      <header className="bg-white shadow sticky top-0 z-10"> {/* 添加 sticky 和 z-index */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">ProjectFlow</h1>
            {/* 主要导航可以放在这里或侧边栏 */}
            <nav className="ml-10 hidden md:block"> {/* 响应式隐藏 */}
              <ul className="flex space-x-6">
                <li><Link to="/" className="text-gray-600 hover:text-blue-700">仪表盘</Link></li>
                <li><Link to="/projects" className="text-gray-600 hover:text-blue-700">项目</Link></li>
                <li><Link to="/tasks" className="text-gray-600 hover:text-blue-700">任务</Link></li>
                <li><Link to="/workflow" className="text-gray-600 hover:text-blue-700">工作流</Link></li>
                {/* ... 其他导航项 */}
              </ul>
            </nav>
          </div>
          <div>
            {/* 用户信息和登出按钮 */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      {/* 可以添加侧边栏 */}
      {/* <div className="flex flex-1 overflow-hidden"> */}
        {/* <Sidebar /> */}
        {/* 主要内容区域 */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto"> {/* 添加内边距、背景和滚动 */}
          <Outlet /> {/*  子路由对应的页面组件将在这里渲染 */}
        </main>
      {/* </div> */}
    </div>
  );
};

export default MainLayout;