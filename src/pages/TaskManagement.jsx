import React, { useState } from 'react';
import { ChevronDown, Bell, Search, Filter, Plus, List, Grid, Calendar, MoreHorizontal, 
  X, Check, CheckSquare, Clock, MessageSquare, User, Users, AlertCircle, 
  Menu, Star, Edit, Trash2, Circle, Upload } from 'lucide-react';

const TaskManagement = () => {
  const [viewMode, setViewMode] = useState('board');
  const [activeTab, setActiveTab] = useState('all');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 任务状态定义
  const taskStatuses = [
    { id: 'todo', name: '待处理', color: 'gray', icon: Circle },
    { id: 'inProgress', name: '进行中', color: 'blue', icon: Clock },
    { id: 'reviewing', name: '审核中', color: 'amber', icon: CheckSquare },
    { id: 'completed', name: '已完成', color: 'green', icon: Check },
    { id: 'blocked', name: '已阻塞', color: 'red', icon: AlertCircle },
  ];
  
  // 模拟项目数据
  const projects = [
    { id: 1, name: '智能工厂控制系统', color: 'blue' },
    { id: 2, name: '水处理自动化项目', color: 'green' },
    { id: 3, name: '电气自动化设计项目', color: 'purple' },
  ];
  
  // 模拟角色数据
  const roles = [
    { id: 1, name: '项目经理' },
    { id: 2, name: '需求分析师' },
    { id: 3, name: '方案设计师' }, 
    { id: 4, name: '采购经理' },
    { id: 5, name: '实施工程师' },
    { id: 6, name: '测试工程师' },
    { id: 7, name: '客户代表' },
  ];
  
  // 模拟用户数据
  const users = [
    { id: 1, name: '张明', avatar: 'ZM', role: '项目经理' },
    { id: 2, name: '李红', avatar: 'LH', role: '需求分析师' },
    { id: 3, name: '王强', avatar: 'WQ', role: '方案设计师' },
    { id: 4, name: '赵薇', avatar: 'ZW', role: '采购经理' },
    { id: 5, name: '刘涛', avatar: 'LT', role: '测试工程师' },
    { id: 6, name: '黄磊', avatar: 'HL', role: '实施工程师' },
  ];
  
  // 模拟任务数据
  const tasks = [
    { id: 1, title: '编写需求规格说明书', description: '根据客户提供的需求文档，编写详细的需求规格说明书', status: 'completed', priority: 'high', project: 1, assignee: 2, reporters: [1], watchers: [1, 3], dueDate: '2025-03-20', progress: 100, subtasks: [], attachments: 2, comments: 5, created: '2025-03-10', updated: '2025-03-20', isStarred: true },
    { id: 2, title: '设计系统架构', description: '基于需求文档，设计系统整体架构，包括硬件架构、软件架构、网络架构等', status: 'completed', priority: 'high', project: 1, assignee: 3, reporters: [1], watchers: [1, 2], dueDate: '2025-03-25', progress: 100, subtasks: [
      { id: 21, title: '设计硬件架构', completed: true },
      { id: 22, title: '设计软件架构', completed: true },
      { id: 23, title: '设计网络架构', completed: true },
    ], attachments: 3, comments: 8, created: '2025-03-15', updated: '2025-03-25', isStarred: false },
    { id: 3, title: '编写详细设计方案', description: '基于系统架构，编写详细的设计方案，包括各个模块的功能设计、接口设计等', status: 'reviewing', priority: 'high', project: 1, assignee: 3, reporters: [1], watchers: [1, 2, 6], dueDate: '2025-04-10', progress: 90, subtasks: [
      { id: 31, title: '编写功能模块设计方案', completed: true },
      { id: 32, title: '编写接口设计方案', completed: true },
      { id: 33, title: '编写数据库设计方案', completed: false },
    ], attachments: 2, comments: 6, created: '2025-03-25', updated: '2025-04-08', isStarred: true },
    { id: 4, title: '采购设备清单确认', description: '根据项目需求和设计方案，确认采购设备清单，包括设备型号、数量、供应商等', status: 'inProgress', priority: 'high', project: 1, assignee: 4, reporters: [1], watchers: [1, 3, 6], dueDate: '2025-04-15', progress: 60, subtasks: [
      { id: 41, title: '确认PLC设备清单', completed: true },
      { id: 42, title: '确认传感器清单', completed: true },
      { id: 43, title: '确认网络设备清单', completed: false },
      { id: 44, title: '确认服务器配置', completed: false },
    ], attachments: 1, comments: 12, created: '2025-03-30', updated: '2025-04-10', isStarred: false },
    { id: 5, title: '编写测试方案', description: '编写详细的测试方案，包括功能测试、性能测试、安全测试等', status: 'todo', priority: 'medium', project: 1, assignee: 5, reporters: [1], watchers: [1, 3], dueDate: '2025-04-30', progress: 0, subtasks: [], attachments: 0, comments: 2, created: '2025-04-01', updated: '2025-04-01', isStarred: false },
    { id: 6, title: '编写项目实施计划', description: '编写详细的项目实施计划，包括时间节点、人员安排、风险管控等', status: 'inProgress', priority: 'high', project: 1, assignee: 1, reporters: [1], watchers: [3, 4, 6], dueDate: '2025-04-20', progress: 75, subtasks: [
      { id: 61, title: '制定时间节点', completed: true },
      { id: 62, title: '安排人员配置', completed: true },
      { id: 63, title: '识别潜在风险', completed: false },
      { id: 64, title: '制定应急预案', completed: false },
    ], attachments: 1, comments: 4, created: '2025-04-05', updated: '2025-04-12', isStarred: true },
    { id: 7, title: '准备用户培训材料', description: '编写用户培训材料，包括系统操作手册、维护手册等', status: 'todo', priority: 'medium', project: 1, assignee: 2, reporters: [1], watchers: [1, 6], dueDate: '2025-05-15', progress: 0, subtasks: [], attachments: 0, comments: 0, created: '2025-04-10', updated: '2025-04-10', isStarred: false },
    { id: 8, title: '系统接口开发', description: '开发系统各个模块之间的接口，确保系统各个部分能够正常通信', status: 'todo', priority: 'high', project: 1, assignee: 6, reporters: [1, 3], watchers: [1, 3, 5], dueDate: '2025-05-10', progress: 0, subtasks: [], attachments: 0, comments: 1, created: '2025-04-12', updated: '2025-04-12', isStarred: false },
    { id: 9, title: '水处理设备需求调研', description: '调研水处理项目所需的自动化设备和控制系统需求', status: 'inProgress', priority: 'high', project: 2, assignee: 2, reporters: [1], watchers: [1, 4], dueDate: '2025-04-18', progress: 50, subtasks: [], attachments: 3, comments: 7, created: '2025-04-01', updated: '2025-04-10', isStarred: false },
    { id: 10, title: '电气设计图纸审核', description: '审核电气自动化项目的设计图纸，确保符合规范和要求', status: 'reviewing', priority: 'medium', project: 3, assignee: 3, reporters: [1], watchers: [1, 6], dueDate: '2025-04-16', progress: 80, subtasks: [], attachments: 5, comments: 10, created: '2025-04-05', updated: '2025-04-14', isStarred: false },
  ];
  
  // 获取任务的优先级样式
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-600', bg: 'bg-red-100', text: '高' };
      case 'medium':
        return { color: 'text-amber-600', bg: 'bg-amber-100', text: '中' };
      case 'low':
        return { color: 'text-green-600', bg: 'bg-green-100', text: '低' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', text: '无' };
    }
  };
  
  // 获取项目信息
  const getProject = (id) => {
    return projects.find(p => p.id === id) || {};
  };
  
  // 获取用户信息
  const getUser = (id) => {
    return users.find(u => u.id === id) || {};
  };
  
  // 获取任务状态信息
  const getStatus = (statusId) => {
    return taskStatuses.find(s => s.id === statusId) || {};
  };
  
  // 根据状态分组任务
  const getTasksByStatus = () => {
    return taskStatuses.reduce((acc, status) => {
      acc[status.id] = getFilteredTasks().filter(task => task.status === status.id);
      return acc;
    }, {});
  };
  
  // 根据条件筛选任务
  const getFilteredTasks = () => {
    let filtered = [...tasks];
    
    // 根据当前标签筛选
    if (activeTab === 'mine') {
      filtered = filtered.filter(task => task.assignee === 1); // 假设当前用户ID为1（张明）
    } else if (activeTab === 'watching') {
      filtered = filtered.filter(task => task.watchers.includes(1)); // 假设当前用户ID为1（张明）
    } else if (activeTab === 'reported') {
      filtered = filtered.filter(task => task.reporters.includes(1)); // 假设当前用户ID为1（张明）
    } else if (activeTab === 'starred') {
      filtered = filtered.filter(task => task.isStarred);
    }
    
    // 根据搜索条件筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        task => task.title.toLowerCase().includes(query) || 
               task.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // 任务卡片组件
  const TaskCard = ({ task }) => {
    const status = getStatus(task.status);
    const priority = getPriorityStyle(task.priority);
    const project = getProject(task.project);
    const assignee = getUser(task.assignee);
    const StatusIcon = status.icon;
    
    return (
      <div 
        className={`bg-white border ${selectedTask?.id === task.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
        onClick={() => setSelectedTask(task)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className={`text-${status.color}-500 flex items-center`}>
            <StatusIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{status.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            {task.isStarred && <Star className="h-4 w-4 text-amber-400" />}
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <h3 className="font-medium mb-2 line-clamp-2" title={task.title}>{task.title}</h3>
        <div className="mb-3">
          <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priority.bg} ${priority.color}`}>
            {priority.text}优先级
          </div>
          {project && (
            <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs bg-${project.color}-100 text-${project.color}-600 ml-2`}>
              {project.name}
            </div>
          )}
        </div>
        
        {task.subtasks.length > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>子任务</span>
              <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className={`h-6 w-6 rounded-full bg-${assignee ? 'blue' : 'gray'}-100 text-${assignee ? 'blue' : 'gray'}-600 flex items-center justify-center text-xs font-medium`}>
              {assignee ? assignee.avatar : '?'}
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-500 text-xs">
            {task.attachments > 0 && (
              <div className="flex items-center">
                <Upload className="h-3 w-3 mr-1" />
                <span>{task.attachments}</span>
              </div>
            )}
            {task.comments > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{task.comments}</span>
              </div>
            )}
            {task.dueDate && (
              <div className={`flex items-center ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-red-500' : ''}`}>
                <Clock className="h-3 w-3 mr-1" />
                <span>{task.dueDate.slice(5)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     

      {/* 任务管理工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">任务管理</h2>
            <div className="flex space-x-1 ml-4">
              <button 
                className={`px-3 py-1.5 text-sm rounded-lg border ${viewMode === 'board' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setViewMode('board')}
              >
                <div className="flex items-center">
                  <Grid className="h-4 w-4 mr-1.5" />
                  看板
                </div>
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-lg border ${viewMode === 'list' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <div className="flex items-center">
                  <List className="h-4 w-4 mr-1.5" />
                  列表
                </div>
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-lg border ${viewMode === 'calendar' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                onClick={() => setViewMode('calendar')}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  日历
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              onClick={() => setShowTaskModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              创建任务
            </button>
          </div>
        </div>
        
        {/* 任务过滤标签 */}
        <div className="flex mt-4 border-b">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            全部任务
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'mine' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('mine')}
          >
            我的任务
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'reported' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reported')}
          >
            我创建的
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'watching' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('watching')}
          >
            我关注的
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'starred' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('starred')}
          >
            星标任务
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 看板视图 */}
        {viewMode === 'board' && (
          <div className="flex-1 p-6 overflow-x-auto">
            <div className="flex space-x-4 h-full">
              {taskStatuses.map(status => {
                const tasksInStatus = getTasksByStatus()[status.id] || [];
                return (
                  <div key={status.id} className="flex-shrink-0 w-80">
                    <div className={`bg-${status.color}-50 rounded-t-lg px-3 py-2 flex justify-between items-center`}>
                      <div className={`flex items-center text-${status.color}-700`}>
                        <status.icon className="h-4 w-4 mr-2" />
                        <span className="font-medium">{status.name}</span>
                        <span className="ml-2 bg-white text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                          {tasksInStatus.length}
                        </span>
                      </div>
                      <Menu className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="bg-gray-100 p-2 h-full rounded-b-lg overflow-auto">
                      <div className="space-y-3 min-h-full">
                        {tasksInStatus.map(task => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                        <button className="w-full py-2 bg-white border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50">
                          <Plus className="h-4 w-4 mr-1" />
                          添加任务
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 列表视图 */}
        {viewMode === 'list' && (
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3 font-medium">任务</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium">优先级</th>
                    <th className="px-4 py-3 font-medium">分配给</th>
                    <th className="px-4 py-3 font-medium">项目</th>
                    <th className="px-4 py-3 font-medium">截止日期</th>
                    <th className="px-4 py-3 font-medium">进度</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getFilteredTasks().map(task => {
                    const status = getStatus(task.status);
                    const priority = getPriorityStyle(task.priority);
                    const assignee = getUser(task.assignee);
                    const project = getProject(task.project);
                    const StatusIcon = status.icon;
                    
                    return (
                      <tr 
                        key={task.id} 
                        className={`hover:bg-gray-50 ${selectedTask?.id === task.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            {task.isStarred && <Star className="h-4 w-4 text-amber-400 mt-0.5" />}
                            <div>
                              <div className="font-medium text-gray-900">{task.title}</div>
                              {task.subtasks.length > 0 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  子任务: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`flex items-center text-${status.color}-600`}>
                            <StatusIcon className="h-4 w-4 mr-1.5" />
                            <span className="text-sm">{status.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priority.bg} ${priority.color}`}>
                            {priority.text}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {assignee && (
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium`}>
                                {assignee.avatar}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{assignee.name}</div>
                                <div className="text-xs text-gray-500">{assignee.role}</div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {project && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${project.color}-100 text-${project.color}-800`}>
                              {project.name}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className={`text-sm ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {task.dueDate}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">{task.progress}%</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-amber-500">
                              <Star className={`h-4 w-4 ${task.isStarred ? 'text-amber-400' : ''}`} />
                            </button>
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 日历视图 */}
        {viewMode === 'calendar' && (
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-700">2025年4月</h3>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div 
                    key={day} 
                    className={`border rounded-lg min-h-24 p-1 ${day === 15 ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
                  >
                    <div className="text-sm font-medium p-1">{day}</div>
                    <div className="space-y-1">
                      {tasks.filter(task => {
                        const taskDate = new Date(task.dueDate);
                        return taskDate.getDate() === day && taskDate.getMonth() === 3; // 4月
                      }).slice(0, 2).map(task => (
                        <div 
                          key={task.id}
                          className={`p-1 text-xs rounded truncate ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                          onClick={() => setSelectedTask(task)}
                        >
                          {task.title}
                        </div>
                      ))}
                      {tasks.filter(task => {
                        const taskDate = new Date(task.dueDate);
                        return taskDate.getDate() === day && taskDate.getMonth() === 3;
                      }).length > 2 && (
                        <div className="text-xs text-gray-500 p-1">
                          +{tasks.filter(task => {
                            const taskDate = new Date(task.dueDate);
                            return taskDate.getDate() === day && taskDate.getMonth() === 3;
                          }).length - 2} 更多
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 任务详情侧边栏 */}
        {selectedTask && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">任务详情</h3>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700" onClick={() => setSelectedTask(null)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center text-${getStatus(selectedTask.status).color}-600`}>
                  {React.createElement(getStatus(selectedTask.status).icon, { className: 'h-4 w-4 mr-1' })}
                  <span className="text-sm font-medium">{getStatus(selectedTask.status).name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-amber-500">
                    <Star className={`h-4 w-4 ${selectedTask.isStarred ? 'text-amber-400' : ''}`} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h2 className="text-lg font-medium mb-2">{selectedTask.title}</h2>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className={`px-2 py-0.5 text-xs rounded-full ${getPriorityStyle(selectedTask.priority).bg} ${getPriorityStyle(selectedTask.priority).color}`}>
                  {getPriorityStyle(selectedTask.priority).text}优先级
                </div>
                <div className={`px-2 py-0.5 text-xs rounded-full bg-${getProject(selectedTask.project).color}-100 text-${getProject(selectedTask.project).color}-600`}>
                  {getProject(selectedTask.project).name}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">描述</h3>
                <p className="text-sm text-gray-600">{selectedTask.description}</p>
              </div>
              
              {selectedTask.subtasks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">子任务</h3>
                  <div className="space-y-2">
                    {selectedTask.subtasks.map(subtask => (
                      <div key={subtask.id} className="flex items-center">
                        <div className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${subtask.completed ? 'bg-blue-500' : 'border border-gray-300'}`}>
                          {subtask.completed && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">负责人</h3>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-2">
                      {getUser(selectedTask.assignee).avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{getUser(selectedTask.assignee).name}</div>
                      <div className="text-xs text-gray-500">{getUser(selectedTask.assignee).role}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">截止日期</h3>
                  <div className={`flex items-center text-sm ${new Date(selectedTask.dueDate) < new Date() && selectedTask.status !== 'completed' ? 'text-red-600' : 'text-gray-600'}`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    {selectedTask.dueDate}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">创建者</h3>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-2">
                      {getUser(selectedTask.reporters[0]).avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{getUser(selectedTask.reporters[0]).name}</div>
                      <div className="text-xs text-gray-500">{getUser(selectedTask.reporters[0]).role}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">关注者</h3>
                  <div className="flex -space-x-2">
                    {selectedTask.watchers.map(watcher => (
                      <div key={watcher} className="h-8 w-8 rounded-full bg-blue-100 border-2 border-white text-blue-600 flex items-center justify-center font-medium">
                        {getUser(watcher).avatar}
                      </div>
                    ))}
                    <button className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white text-gray-600 flex items-center justify-center">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">进度</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedTask.progress}%` }}></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{selectedTask.progress}%</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>创建于 {selectedTask.created}</span>
                    <span>更新于 {selectedTask.updated}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">评论 ({selectedTask.comments})</h3>
                
                <div className="flex items-start space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium flex-shrink-0">
                    ZM
                  </div>
                  <div className="flex-1">
                    <div className="border border-gray-300 rounded-lg p-2">
                      <textarea 
                        className="w-full border-0 focus:ring-0 resize-none text-sm"
                        placeholder="添加评论..."
                        rows={2}
                      ></textarea>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                        发表评论
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium flex-shrink-0">
                      LH
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium text-sm">李红</span>
                        <span className="text-xs text-gray-500 ml-2">昨天 15:30</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">设计方案已经完成了初稿，请查收附件，有任何修改意见请反馈。</p>
                      <div className="mt-2 bg-gray-50 border border-gray-200 rounded p-2 text-xs text-gray-600 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                        <span>设计方案初稿.docx (2.4MB)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  更新状态
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 创建任务模态框 */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-90vh overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">创建任务</h3>
              <button className="text-gray-500" onClick={() => setShowTaskModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">任务标题 *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="输入任务标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="描述任务详情..."
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">所属项目 *</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option value="">选择项目</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    {taskStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option value="">选择负责人</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">截止日期</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option value="high">高</option>
                    <option value="medium" selected>中</option>
                    <option value="low">低</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">执行角色</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option value="">选择角色</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">子任务</label>
                <div className="space-y-2 mb-2">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                      placeholder="添加子任务"
                    />
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md">
                      添加
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">关注者</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[1, 2, 3].map(id => (
                    <div key={id} className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
                      <span>{getUser(id).name}</span>
                      <button className="ml-1 text-blue-500 hover:text-blue-700">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button className="flex items-center text-blue-600 px-2 py-1 text-sm">
                    <Plus className="h-3 w-3 mr-1" />
                    添加关注者
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">附件</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">拖拽文件到此处或点击上传</p>
                  <button className="mt-2 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md">
                    选择文件
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={() => setShowTaskModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowTaskModal(false)}
                >
                  创建任务
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 筛选模态框 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">筛选任务</h3>
              <button className="text-gray-500" onClick={() => setShowFilterModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
                <div className="space-y-2">
                  {taskStatuses.map(status => (
                    <div key={status.id} className="flex items-center">
                      <input type="checkbox" id={`status-${status.id}`} className="mr-2" defaultChecked />
                      <label htmlFor={`status-${status.id}`} className="text-sm flex items-center">
                        {React.createElement(status.icon, { className: `h-4 w-4 mr-1 text-${status.color}-500` })}
                        {status.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">项目</label>
                <div className="space-y-2">
                  {projects.map(project => (
                    <div key={project.id} className="flex items-center">
                      <input type="checkbox" id={`project-${project.id}`} className="mr-2" defaultChecked />
                      <label htmlFor={`project-${project.id}`} className="text-sm flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-${project.color}-500 mr-2`}></div>
                        {project.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">优先级</label>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map(priority => {
                    const style = getPriorityStyle(priority);
                    return (
                      <div key={priority} className="flex items-center">
                        <input type="checkbox" id={`priority-${priority}`} className="mr-2" defaultChecked />
                        <label htmlFor={`priority-${priority}`} className="text-sm flex items-center">
                          <span className={`inline-flex rounded-full h-2 w-2 mr-2 ${style.color.replace('text', 'bg')}`}></span>
                          {style.text}优先级
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">执行角色</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">所有角色</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-between mb-4">
                <div className="w-5/12">
                  <label className="block text-sm font-medium text-gray-700 mb-2">开始日期</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="w-5/12">
                  <label className="block text-sm font-medium text-gray-700 mb-2">结束日期</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              
              <div className="flex justify-between space-x-2">
                <button className="px-3 py-2 text-blue-600 text-sm">
                  重置筛选条件
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowFilterModal(false)}
                >
                  应用筛选
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;