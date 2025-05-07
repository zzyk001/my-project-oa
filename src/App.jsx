import React from 'react';
// 导入 react-router-dom 的核心组件和 redirect 函数
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLoaderData,
  useNavigation,
  redirect // 导入 redirect 函数
} from 'react-router-dom';

// --- 导入所有页面组件 ---
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CalendarView from './pages/CalendarView';
import TaskManagement from './pages/TaskManagement';
import ProjectList from './pages/ProjectList'; // 假设项目列表页
import ProjectDetail from './pages/ProjectDetail'; // 假设项目详情页
import RoleManagement from './pages/RoleManagement';
import DocumentManagement from './pages/DocumentManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import WorkflowDesigner from './pages/WorkflowDesigner';
import NotFoundPage from './pages/NotFoundPage'; // 404 页面
import RegisterPage from './pages/RegisterPage'; // 导入注册页面组件

// --- 导入布局组件 ---
import MainLayout from './layouts/MainLayout'; // 主布局 (包含 Header 等)

// --- 认证相关的辅助函数 ---
// 检查本地存储中是否有 Token (简化版，实际应用可加强)
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  // console.log('Checking auth, token:', token); // 添加日志方便调试
  return !!token; // 如果 token 存在且非空，则返回 true
};

// --- Loader 函数 ---

// 受保护路由的 Loader：检查是否登录，未登录则重定向到登录页
const protectedLoader = async ({ request }) => { // loader 可以接收包含 request 的对象
  if (!isAuthenticated()) {
    // 获取用户尝试访问的路径，以便登录后跳回 (可选)
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    // console.log('Not authenticated, redirecting to login...'); // 添加日志
    // 使用 redirect 函数重定向到登录页，并带上原始路径参数
    return redirect(`/login?${params.toString()}`);
  }
  // console.log('Authenticated, allowing access.'); // 添加日志
  // 如果已认证，可以预加载一些所有受保护页面都需要的数据，比如用户信息
  // const userData = await fetchUserData(); // 假设有这样一个函数
  // return { user: userData }; // 将数据返回给子路由
  return null; // 或者简单返回 null
};

// 登录页的 Loader：检查是否已登录，已登录则重定向到首页
const loginLoader = async () => {
    if (isAuthenticated()) {
        // console.log('Already authenticated, redirecting to dashboard...'); // 添加日志
        return redirect('/'); // 重定向到根路径 (通常是 Dashboard)
    }
    // console.log('Not authenticated, showing login page.'); // 添加日志
    return null; // 未登录，正常显示登录页
}

// --- 创建路由配置 ---
const router = createBrowserRouter([
  {
    // 登录页路由 (公共)
    path: "/login",
    loader: loginLoader, // 在渲染前检查是否已登录
    element: <LoginPage />,
  },
  {
    path: "/register",
    // 注册页通常不需要 loader，或者也可以加一个类似 loginLoader 的检查，如果已登录就重定向走
    // loader: loginLoader, // 可选
    element: <RegisterPage />,
  },
  {
    // 根路由，作为所有受保护页面的父路由和布局容器
    id: "root", // 给根路由一个 ID
    path: "/",
    loader: protectedLoader, // 在渲染前检查是否已登录
    element: <MainLayout />, // 使用主布局组件包裹子页面
    errorElement: <div>路由错误或未授权! 请尝试 <a href="/login">重新登录</a>。</div>, // 改进错误提示
    children: [ // 定义在 MainLayout 的 Outlet 中渲染的子路由
      {
        // 索引路由，当访问 "/" 时默认显示 Dashboard
        index: true,
        element: <Dashboard />,
        // loader: dashboardLoader, // 可以为 Dashboard 单独加载数据
      },
      {
        path: "calendar",
        element: <CalendarView />,
      },
      {
        path: "tasks",
        element: <TaskManagement />,
        // loader: tasksLoader, // 可以为任务列表加载数据
      },
      {
        path: "projects", // 项目列表父路由
        // element: <Outlet />, // 可以用 Outlet 包裹，如果列表和详情有共同布局
        children: [
            {
                index: true, // 匹配 /projects 路径
                element: <ProjectList />, // 显示项目列表
                // loader: projectListLoader,
            },
            {
                path: ":projectId", // 匹配 /projects/1, /projects/abc 等
                element: <ProjectDetail />, // 显示项目详情
                // loader: projectDetailLoader, // 使用 loader 加载特定项目数据
            }
        ]
      },
      {
        path: "workflow",
        element: <WorkflowDesigner />,
      },
      {
        path: "roles",
        element: <RoleManagement />,
      },
      {
        path: "documents",
        element: <DocumentManagement />,
      },
      {
        path: "reports",
        element: <ReportsAnalytics />,
      },
      // ... 在这里添加其他所有需要登录才能访问的页面路由
    ],
  },
  {
      // 404 Not Found 路由，匹配所有未定义的路径
      path: "*",
      element: <NotFoundPage />
  }
]);

// --- App 根组件 ---
const App = () => {
  // 使用 RouterProvider 来启动和管理路由
  return <RouterProvider router={router} fallbackElement={<div>页面加载中...</div>} />; // 可以添加 fallback UI
};

export default App;