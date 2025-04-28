import React, { useState } from 'react';
import { Clock, FileText, CheckSquare, AlertCircle, Users, Briefcase, BarChart2, Settings, Bell, Search, ChevronDown, Plus, Calendar, MessageSquare, Star, Edit, Activity, List, Grid, Archive, Download, Upload, RefreshCw, HelpCircle, ExternalLink, Filter, Trash2 } from 'lucide-react';
const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [workflowView, setWorkflowView] = useState('list');

// 模拟项目数据
const project = {
  id: 1,
  name: '220kV变电站自动化改造项目',
  code: 'SUBST-2025-001',
  status: 'active',
  progress: 62,
  startDate: '2025-02-15',
  endDate: '2025-08-30',
  client: '国家电网山东分公司',
  manager: '李强',
  budget: '3,500,000',
  priority: 'high',
  description: '对220kV变电站进行自动化系统升级，包括二次设备更换、SCADA系统集成、远程监控与数据采集，提升变电站智能化水平和运维效率。',
  tags: ['变电站', '自动化改造', 'SCADA', '远程监控', '电力工程'],
};

// 模拟团队成员数据
const teamMembers = [
  { id: 1, name: '李强', role: '项目经理', avatar: 'LQ', department: '项目管理部', joinDate: '2025-02-10' },
  { id: 2, name: '王敏', role: '电气设计工程师', avatar: 'WM', department: '设计部', joinDate: '2025-02-12' },
  { id: 3, name: '赵磊', role: '自动化工程师', avatar: 'ZL', department: '自动化部', joinDate: '2025-02-15' },
  { id: 4, name: '孙蕾', role: '采购专员', avatar: 'SL', department: '采购部', joinDate: '2025-02-20' },
  { id: 5, name: '陈涛', role: '现场施工经理', avatar: 'CT', department: '工程部', joinDate: '2025-03-01' },
  { id: 6, name: '刘洋', role: '调试工程师', avatar: 'LY', department: '调试部', joinDate: '2025-03-10' },
];

// 模拟工作流数据
const workflowStages = [
  { id: 1, name: '项目立项', status: 'completed', progress: 100, startDate: '2025-02-15', endDate: '2025-02-20', owner: '李强' },
  { id: 2, name: '方案设计', status: 'completed', progress: 100, startDate: '2025-02-21', endDate: '2025-03-10', owner: '王敏' },
  { id: 3, name: '设备采购', status: 'in-progress', progress: 60, startDate: '2025-03-11', endDate: '2025-04-20', owner: '孙蕾' },
  { id: 4, name: '现场施工', status: 'not-started', progress: 0, startDate: '2025-04-21', endDate: '2025-06-30', owner: '陈涛' },
  { id: 5, name: '系统集成与调试', status: 'not-started', progress: 0, startDate: '2025-07-01', endDate: '2025-08-10', owner: '刘洋' },
  { id: 6, name: '验收与交付', status: 'not-started', progress: 0, startDate: '2025-08-11', endDate: '2025-08-30', owner: '李强' },
];

// 模拟最近活动数据
const activities = [
  { id: 1, user: '李强', action: '提交了项目进度报告', target: '方案设计阶段', time: '2小时前' },
  { id: 2, user: '孙蕾', action: '完成了主变保护装置采购', target: '设备采购', time: '昨天' },
  { id: 3, user: '王敏', action: '上传了二次系统设计图', target: '设计文档', time: '2天前' },
  { id: 4, user: '陈涛', action: '组织了施工准备会议', target: '现场施工', time: '3天前' },
  { id: 5, user: '刘洋', action: '制定了调试计划', target: '系统集成与调试', time: '4天前' },
  { id: 6, user: '系统', action: '阶段变更', target: '项目进入设备采购阶段', time: '5天前' },
];

// 模拟文档数据
const documents = [
  { id: 1, name: '项目立项申请表', type: 'doc', author: '李强', createDate: '2025-02-16', version: 'V1.0' },
  { id: 2, name: '二次系统设计图', type: 'dwg', author: '王敏', createDate: '2025-03-05', version: 'V2.1' },
  { id: 3, name: '主变保护装置采购合同', type: 'pdf', author: '孙蕾', createDate: '2025-03-18', version: 'V1.0' },
  { id: 4, name: '施工组织方案', type: 'doc', author: '陈涛', createDate: '2025-04-10', version: 'V1.0' },
  { id: 5, name: '调试计划', type: 'xlsx', author: '刘洋', createDate: '2025-06-25', version: 'V1.0' },
  { id: 6, name: '竣工验收报告', type: 'pdf', author: '李强', createDate: '2025-08-28', version: 'V1.0' },
];

// 模拟任务数据
const tasks = [
  { id: 1, name: '完成二次系统设计', assignee: '王敏', dueDate: '2025-03-10', priority: 'high', status: 'completed' },
  { id: 2, name: '采购主变保护装置', assignee: '孙蕾', dueDate: '2025-03-25', priority: 'high', status: 'in-progress' },
  { id: 3, name: '编制施工组织方案', assignee: '陈涛', dueDate: '2025-04-15', priority: 'medium', status: 'not-started' },
  { id: 4, name: 'SCADA系统集成测试', assignee: '刘洋', dueDate: '2025-08-05', priority: 'medium', status: 'not-started' },
  { id: 5, name: '竣工资料整理', assignee: '李强', dueDate: '2025-08-25', priority: 'medium', status: 'not-started' },
];

// 模拟风险数据
const risks = [
  { id: 1, name: '设备交付延期', level: 'high', probability: 'medium', impact: 'high', owner: '孙蕾', status: 'active', response: '与供应商签订延期违约条款，提前锁定关键设备' },
  { id: 2, name: '现场施工遇极端天气', level: 'medium', probability: 'low', impact: 'high', owner: '陈涛', status: 'monitoring', response: '制定应急施工预案，合理安排工期' },
  { id: 3, name: '系统调试进度滞后', level: 'medium', probability: 'medium', impact: 'medium', owner: '刘洋', status: 'active', response: '提前准备测试环境，增加调试人手' },
];
  // 模拟甘特图数据，简化版
  const ganttData = workflowStages.map(stage => ({
    id: stage.id,
    name: stage.name,
    startDate: new Date(stage.startDate),
    endDate: new Date(stage.endDate),
    progress: stage.progress,
    status: stage.status
  }));

  // 简化的甘特图组件
  const GanttChart = () => {
    const totalDays = Math.ceil((new Date(project.endDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24));
    const daysPerColumn = Math.ceil(totalDays / 30); // 约30列
    const columns = Math.ceil(totalDays / daysPerColumn);
    
    const getBarPosition = (startDate) => {
      const projectStart = new Date(project.startDate);
      const itemStart = new Date(startDate);
      const daysDiff = Math.ceil((itemStart - projectStart) / (1000 * 60 * 60 * 24));
      return (daysDiff / totalDays) * 100;
    };
    
    const getBarWidth = (startDate, endDate) => {
      const itemStart = new Date(startDate);
      const itemEnd = new Date(endDate);
      const daysDuration = Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24));
      return (daysDuration / totalDays) * 100;
    };
    
    return (
      <div className="mt-4 w-full overflow-x-auto">
        <div className="min-w-full relative pb-4">
          {/* 时间线 */}
          <div className="flex border-b border-gray-200 pb-2">
            <div className="w-48 flex-shrink-0"></div>
            <div className="flex-1 flex">
              {Array.from({ length: columns }).map((_, i) => (
                <div key={i} className="flex-1 text-xs text-center text-gray-500">
                  {new Date(new Date(project.startDate).setDate(new Date(project.startDate).getDate() + i * daysPerColumn)).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </div>
              ))}
            </div>
          </div>
          
          {/* 甘特图条目 */}
          {ganttData.map(item => (
            <div key={item.id} className="flex items-center mt-3">
              <div className="w-48 flex-shrink-0 pr-4">
                <div className="text-sm font-medium">{item.name}</div>
              </div>
              <div className="flex-1 relative h-6">
                <div 
                  className={`absolute h-6 rounded-sm ${
                    item.status === 'completed' ? 'bg-green-500' : 
                    item.status === 'in-progress' ? 'bg-blue-500' : 
                    'bg-gray-300'
                  }`}
                  style={{ 
                    left: `${getBarPosition(item.startDate)}%`, 
                    width: `${getBarWidth(item.startDate, item.endDate)}%` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                    {item.progress}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 项目标题区 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <span className="ml-4 text-gray-500">项目编号: {project.code}</span>
            <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              进行中
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 border border-gray-300 rounded-lg">
              <Star className="h-5 w-5" />
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              添加任务
            </button>
          </div>
        </div>
        
        {/* 项目导航标签 */}
        <nav className="mt-6">
          <ul className="flex space-x-8 border-b border-gray-200">
            <li className={`pb-3 px-1 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('overview')}>
                <Activity className="h-4 w-4 mr-2" />
                概览
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'workflow' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('workflow')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                工作流
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('tasks')}>
                <CheckSquare className="h-4 w-4 mr-2" />
                任务
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('documents')}>
                <FileText className="h-4 w-4 mr-2" />
                文档
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'team' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('team')}>
                <Users className="h-4 w-4 mr-2" />
                团队
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'gantt' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('gantt')}>
                <Calendar className="h-4 w-4 mr-2" />
                甘特图
              </button>
            </li>
            <li className={`pb-3 px-1 ${activeTab === 'risks' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}>
              <button className="flex items-center" onClick={() => setActiveTab('risks')}>
                <AlertCircle className="h-4 w-4 mr-2" />
                风险
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* 主内容区 */}
      <main className="flex-1 p-6">
        {/* 概览标签内容 */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* 左侧内容 */}
            <div className="col-span-2 space-y-6">
              {/* 项目信息卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">项目信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500">客户</h4>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">项目经理</h4>
                    <p className="font-medium">{project.manager}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">开始日期</h4>
                    <p className="font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">结束日期</h4>
                    <p className="font-medium">{project.endDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">预算</h4>
                    <p className="font-medium">¥{project.budget}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">优先级</h4>
                    <p className="font-medium flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        project.priority === 'high' ? 'bg-red-500' : 
                        project.priority === 'medium' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}></span>
                      {project.priority === 'high' ? '高' : 
                       project.priority === 'medium' ? '中' : '低'}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm text-gray-500">描述</h4>
                  <p className="mt-1 text-sm">{project.description}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm text-gray-500">标签</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 工作流进度卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">工作流进度</h3>
                  <button className="text-blue-600 text-sm">查看工作流</button>
                </div>
                <div className="space-y-4">
                  {workflowStages.map(stage => (
                    <div key={stage.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{stage.name}</span>
                        <span className={`text-sm ${
                          stage.status === 'completed' ? 'text-green-600' : 
                          stage.status === 'in-progress' ? 'text-blue-600' : 
                          'text-gray-500'
                        }`}>
                          {stage.status === 'completed' ? '已完成' : 
                           stage.status === 'in-progress' ? '进行中' : 
                           '未开始'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            stage.status === 'completed' ? 'bg-green-500' : 
                            stage.status === 'in-progress' ? 'bg-blue-500' : 
                            'bg-gray-300'
                          }`} 
                          style={{ width: `${stage.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>负责人: {stage.owner}</span>
                        <span>{stage.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 最近任务卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">待处理任务</h3>
                  <button className="text-blue-600 text-sm">查看全部任务</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-2 font-normal">任务名称</th>
                      <th className="pb-2 font-normal">负责人</th>
                      <th className="pb-2 font-normal">截止日期</th>
                      <th className="pb-2 font-normal">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.slice(0, 3).map(task => (
                      <tr key={task.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              task.priority === 'high' ? 'bg-red-500' : 
                              task.priority === 'medium' ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}></div>
                            <span className="font-medium text-sm">{task.name}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-sm">{task.assignee}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-gray-500">{task.dueDate}</span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-600' : 
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {task.status === 'completed' ? '已完成' : 
                             task.status === 'in-progress' ? '进行中' : 
                             '未开始'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* 右侧内容 */}
            <div className="space-y-6">
              {/* 项目统计卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">项目统计</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">总体进度</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">7</div>
                      <div className="text-xs text-gray-500">阶段总数</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">2</div>
                      <div className="text-xs text-gray-500">已完成阶段</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-amber-600">12</div>
                      <div className="text-xs text-gray-500">任务总数</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-xs text-gray-500">风险事项</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 团队成员卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">团队成员</h3>
                  <button className="text-blue-600 text-sm">添加成员</button>
                </div>
                <div className="space-y-3">
                  {teamMembers.slice(0, 4).map(member => (
                    <div key={member.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm mr-3">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {teamMembers.length > 4 && (
                  <div className="mt-3 text-center">
                    <button className="text-blue-600 text-sm">查看全部 {teamMembers.length} 名成员</button>
                  </div>
                )}
              </div>
              
              {/* 近期活动卡片 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">近期活动</h3>
                <div className="space-y-4">
                  {activities.slice(0, 4).map(activity => (
                    <div key={activity.id} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <Activity className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action} 
                          <span className="font-medium"> {activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {activities.length > 4 && (
                  <div className="mt-3 text-center">
                    <button className="text-blue-600 text-sm">查看全部活动</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* 工作流标签内容 */}
        {activeTab === 'workflow' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目工作流</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      className={`p-2 ${workflowView === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                      onClick={() => setWorkflowView('list')}
                    >
                      <List className="h-5 w-5 text-gray-500" />
                    </button>
                    <button 
                      className={`p-2 ${workflowView === 'diagram' ? 'bg-gray-100' : 'bg-white'}`}
                      onClick={() => setWorkflowView('diagram')}
                    >
                      <Grid className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑工作流
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {workflowView === 'list' ? (
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-200">
                        <th className="pb-3 pl-4 font-medium">阶段名称</th>
                        <th className="pb-3 font-medium">负责人</th>
                        <th className="pb-3 font-medium">开始时间</th>
                        <th className="pb-3 font-medium">结束时间</th>
                        <th className="pb-3 font-medium">进度</th>
                        <th className="pb-3 pr-4 font-medium">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workflowStages.map(stage => (
                        <tr key={stage.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4 pl-4">
                            <span className="font-medium">{stage.name}</span>
                          </td>
                          <td className="py-4">
                            <span>{stage.owner}</span>
                          </td>
                          <td className="py-4">
                            <span className="text-gray-500">{stage.startDate}</span>
                          </td>
                          <td className="py-4">
                            <span className="text-gray-500">{stage.endDate}</span>
                          </td>
                          <td className="py-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  stage.status === 'completed' ? 'bg-green-500' : 
                                  stage.status === 'in-progress' ? 'bg-blue-500' : 
                                  'bg-gray-300'
                                }`} 
                                style={{ width: `${stage.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{stage.progress}%</span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              stage.status === 'completed' ? 'bg-green-100 text-green-600' : 
                              stage.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {stage.status === 'completed' ? '已完成' : 
                               stage.status === 'in-progress' ? '进行中' : 
                               '未开始'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center p-4">
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">工作流图表视图</h3>
                    <p className="text-gray-500 mb-4">此处将显示工作流程图，可视化展示项目各阶段及其相互关系。</p>
                    <p className="text-sm text-gray-400">（实际项目中这里会有流程图可视化展示）</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 任务标签内容 */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目任务</h3>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    筛选
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    添加任务
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pl-4 font-medium">任务名称</th>
                    <th className="pb-3 font-medium">负责人</th>
                    <th className="pb-3 font-medium">截止日期</th>
                    <th className="pb-3 font-medium">优先级</th>
                    <th className="pb-3 pr-4 font-medium">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 pl-4">
                        <span className="font-medium">{task.name}</span>
                      </td>
                      <td className="py-4">
                        <span>{task.assignee}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-500">{task.dueDate}</span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' : 
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'
                        }`}>
                          {task.priority === 'high' ? '高' : 
                           task.priority === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.status === 'completed' ? 'bg-green-100 text-green-600' : 
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {task.status === 'completed' ? '已完成' : 
                           task.status === 'in-progress' ? '进行中' : 
                           '未开始'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 甘特图标签内容 */}
        {activeTab === 'gantt' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目甘特图</h3>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </button>
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <GanttChart />
            </div>
          </div>
        )}
        
        {/* 文档标签内容 */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目文档</h3>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    上传文档
                  </button>
                  <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    新建文档
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pl-4 font-medium">文档名称</th>
                    <th className="pb-3 font-medium">类型</th>
                    <th className="pb-3 font-medium">创建人</th>
                    <th className="pb-3 font-medium">创建日期</th>
                    <th className="pb-3 font-medium">版本</th>
                    <th className="pb-3 pr-4 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 pl-4">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <FileText className={`h-5 w-5 ${
                              doc.type === 'pdf' ? 'text-red-500' : 
                              doc.type === 'excel' ? 'text-green-500' : 
                              'text-blue-500'
                            }`} />
                          </div>
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="capitalize">{doc.type}</span>
                      </td>
                      <td className="py-4">
                        <span>{doc.author}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-500">{doc.createDate}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-500">{doc.version}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 团队标签内容 */}
        {activeTab === 'team' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目团队</h3>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    添加成员
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pl-4 font-medium">成员</th>
                    <th className="pb-3 font-medium">角色</th>
                    <th className="pb-3 font-medium">部门</th>
                    <th className="pb-3 font-medium">加入日期</th>
                    <th className="pb-3 pr-4 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 pl-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                            {member.avatar}
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span>{member.role}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-500">{member.department}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-500">{member.joinDate}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 风险标签内容 */}
        {activeTab === 'risks' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">项目风险</h3>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    添加风险
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 pl-4 font-medium">风险事项</th>
                    <th className="pb-3 font-medium">风险等级</th>
                    <th className="pb-3 font-medium">可能性</th>
                    <th className="pb-3 font-medium">影响程度</th>
                    <th className="pb-3 font-medium">负责人</th>
                    <th className="pb-3 font-medium">状态</th>
                    <th className="pb-3 pr-4 font-medium">应对措施</th>
                  </tr>
                </thead>
                <tbody>
                  {risks.map(risk => (
                    <tr key={risk.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-4 pl-4">
                        <span className="font-medium">{risk.name}</span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          risk.level === 'high' ? 'bg-red-100 text-red-600' : 
                          risk.level === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'
                        }`}>
                          {risk.level === 'high' ? '高' : 
                           risk.level === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="capitalize">
                          {risk.probability === 'high' ? '高' : 
                           risk.probability === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="capitalize">
                          {risk.impact === 'high' ? '高' : 
                           risk.impact === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="py-4">
                        <span>{risk.owner}</span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          risk.status === 'active' ? 'bg-red-100 text-red-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {risk.status === 'active' ? '活跃' : '监控中'}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-sm">{risk.response}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;