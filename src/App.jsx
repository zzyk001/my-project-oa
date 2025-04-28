import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
import ProjectDetail from './pages/ProjectDetail';
import RoleManagement from './pages/RoleManagement';
import DocumentManagement from './pages/DocumentManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import WorkflowDesigner from './pages/WorkflowDesigner'; 
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-700">ProjectFlow</h1>
              <nav className="ml-10">
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-blue-700">仪表盘</Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-gray-500 hover:text-blue-700">项目</Link>
                  </li>
                  <li>
                    <Link to="/tasks" className="text-gray-500 hover:text-blue-700">任务</Link>
                  </li>
                  <li>
                    <Link to="/workflow" className="text-gray-500 hover:text-blue-700">工作流</Link>
                  </li>
                  <li>
                    <Link to="/roles" className="text-gray-500 hover:text-blue-700">角色管理</Link>
                  </li>
                  <li>
                    <Link to="/calendar" className="text-blue-700 font-medium">日历</Link>
                  </li>
                  <li>
                    <Link to="/documents" className="text-gray-500 hover:text-blue-700">文档</Link>
                  </li>
                  <li>
                    <Link to="/reports" className="text-gray-500 hover:text-blue-700">报表</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* 路由内容 */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/projects" element={<ProjectDetail />} />
            <Route path="/workflow" element={<WorkflowDesigner />} />
            <Route path="/roles" element={<RoleManagement />} /> 
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;