import React, { useState } from 'react';
import { Calendar, Clock, FileText, CheckSquare, AlertCircle, Users, Briefcase, BarChart2, Settings, Bell, Search, ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
const [activeTab, setActiveTab] = useState('all');
const navigate = useNavigate();
// 模拟数据
const tasks = [
{ id: 1, name: '完成项目需求分析', project: '智能工厂控制系统', dueDate: '2025-04-15', priority: 'high', status: 'in-progress', role: '需求分析师' },
{ id: 2, name: '确认设计方案', project: '智能工厂控制系统', dueDate: '2025-04-16', priority: 'high', status: 'pending', role: '方案设计师' },
{ id: 3, name: '审核采购清单', project: '水处理自动化项目', dueDate: '2025-04-14', priority: 'medium', status: 'pending', role: '采购经理' },
{ id: 4, name: '组织项目启动会', project: '电气自动化设计项目', dueDate: '2025-04-18', priority: 'medium', status: 'not-started', role: '项目经理' },
{ id: 5, name: '准备投标文件', project: '化工厂自控系统', dueDate: '2025-04-13', priority: 'high', status: 'in-progress', role: '投标专员' },
];
const projects = [
{ id: 1, name: '智能工厂控制系统', progress: 45, status: 'active', dueDate: '2025-07-15' },
{ id: 2, name: '水处理自动化项目', progress: 78, status: 'active', dueDate: '2025-05-30' },
{ id: 3, name: '电气自动化设计项目', progress: 10, status: 'active', dueDate: '2025-08-21' },
{ id: 4, name: '化工厂自控系统', progress: 25, status: 'active', dueDate: '2025-06-12' },
];
const notifications = [
{ id: 1, type: 'task', message: '张三已完成任务"编写设计文档"', time: '10分钟前' },
{ id: 2, type: 'workflow', message: '"智能工厂控制系统"项目已进入"设计阶段"', time: '1小时前' },
{ id: 3, type: 'document', message: '李四上传了文档"项目需求说明书V2"', time: '3小时前' },
{ id: 4, type: 'alert', message: '"水处理自动化项目"有3个任务即将到期', time: '昨天' },
];
const calendarEvents = [
{ id: 1, title: '智能工厂项目启动会', time: '09:00-11:00', project: '智能工厂控制系统' },
{ id: 2, title: '设计方案评审', time: '13:30-15:00', project: '水处理自动化项目' },
{ id: 3, title: '采购讨论', time: '16:00-17:00', project: '电气自动化设计项目' },
];
return (
<div className="flex flex-col min-h-screen bg-gray-50">

{/* 主内容区 */}
  <main className="flex-1 p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">个人工作仪表盘</h2>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          新建项目
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          设置
        </button>
      </div>
    </div>

    {/* 状态卡片 */}
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">我的任务</span>
          <CheckSquare className="h-8 w-8 text-blue-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">12</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-red-500">5 待处理</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-green-500">7 进行中</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">我的项目</span>
          <Briefcase className="h-8 w-8 text-purple-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">4</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-blue-500">全部活跃</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">今日会议</span>
          <Users className="h-8 w-8 text-green-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">3</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500">总计 4.5 小时</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">待审核文档</span>
          <FileText className="h-8 w-8 text-amber-500" />
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold">7</h3>
          <div className="flex items-center mt-2">
            <span className="text-sm text-red-500">2 高优先级</span>
          </div>
        </div>
      </div>
    </div>

    {/* 任务和项目区域 */}
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* 我的任务 */}
      <div className="col-span-2 bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">我的任务</h3>
            <button className="text-blue-600 text-sm">查看全部</button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              全部
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeTab === 'today' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('today')}
            >
              今日任务
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeTab === 'upcoming' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              即将到期
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-full ${activeTab === 'completed' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('completed')}
            >
              已完成
            </button>
          </div>
        </div>
        <div className="p-4">
          <table className="w-full">
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pl-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        task.priority === 'high' ? 'bg-red-500' : 
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{task.name}</div>
                        <div className="text-sm text-gray-500">{task.project}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600">{task.role}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-600' : 
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                      task.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.status === 'completed' ? '已完成' : 
                       task.status === 'in-progress' ? '进行中' : 
                       task.status === 'pending' ? '待处理' : '未开始'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 右侧区域 */}
      <div className="space-y-6">
        {/* 通知 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">最新通知</h3>
              <button className="text-blue-600 text-sm">全部标为已读</button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${
                    notification.type === 'task' ? 'bg-blue-100 text-blue-500' :
                    notification.type === 'workflow' ? 'bg-purple-100 text-purple-500' :
                    notification.type === 'document' ? 'bg-amber-100 text-amber-500' :
                    'bg-red-100 text-red-500'
                  }`}>
                    {notification.type === 'task' ? <CheckSquare className="h-5 w-5" /> :
                     notification.type === 'workflow' ? <BarChart2 className="h-5 w-5" /> :
                     notification.type === 'document' ? <FileText className="h-5 w-5" /> :
                     <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 今日日程 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">今日日程</h3>
              <button className="text-blue-600 text-sm">查看日历</button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {calendarEvents.map(event => (
                <div key={event.id} className="flex items-start border-l-4 border-blue-500 pl-3 py-1">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                    <p className="text-xs text-blue-600 mt-1">{event.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 项目进度 */}
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">项目进度</h3>
          <button className="text-blue-600 text-sm">查看全部项目</button>
        </div>
      </div>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">进度</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">截止日期</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-gray-100 last:border-0">
                <td className="py-3">
                  <span className="font-medium">{project.name}</span>
                </td>
                <td className="py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-600">
                    {project.status === 'active' ? '进行中' : '已完成'}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    {project.dueDate}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>

);
};
export default Dashboard;