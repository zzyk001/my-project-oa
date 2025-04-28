import React, { useState } from 'react';
import { ChevronDown, Bell, Search, Download, Filter, Printer, BarChart2, PieChart, TrendingUp, Calendar, Clock, Users, CheckSquare, AlertCircle, Briefcase, FileText, Sliders, RefreshCw, ChevronRight, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('month');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // 模拟项目概览数据
  const projectsOverview = {
    totalProjects: 14,
    activeProjects: 8,
    completedProjects: 4,
    delayedProjects: 2,
  };
  
  // 模拟任务概览数据
  const tasksOverview = {
    totalTasks: 126,
    completedTasks: 87,
    inProgressTasks: 31,
    overdueTasks: 8,
  };
  
  // 模拟项目状态分布数据
  const projectStatusData = [
    { name: '进行中', value: 8, color: '#3b82f6' },
    { name: '已完成', value: 4, color: '#10b981' },
    { name: '延期中', value: 2, color: '#ef4444' },
  ];
  
  // 模拟任务状态分布数据
  const taskStatusData = [
    { name: '待处理', value: 22, color: '#94a3b8' },
    { name: '进行中', value: 31, color: '#3b82f6' },
    { name: '审核中', value: 17, color: '#f59e0b' },
    { name: '已完成', value: 56, color: '#10b981' },
  ];
  
  // 模拟项目进度数据
  const projectProgressData = [
    { name: '智能工厂控制系统', progress: 45, target: 50, color: '#3b82f6' },
    { name: '水处理自动化项目', progress: 78, target: 75, color: '#10b981' },
    { name: '电气自动化设计项目', progress: 10, target: 25, color: '#ef4444' },
    { name: '化工厂自控系统', progress: 25, target: 30, color: '#f59e0b' },
    { name: '污水处理监控系统', progress: 60, target: 50, color: '#10b981' },
  ];
  
  // 模拟月度任务完成情况数据
  const monthlyTasksData = [
    { name: '1月', 完成任务: 12, 新增任务: 15 },
    { name: '2月', 完成任务: 19, 新增任务: 20 },
    { name: '3月', 完成任务: 22, 新增任务: 25 },
    { name: '4月', 完成任务: 25, 新增任务: 30 },
  ];
  
  // 模拟项目类型分布数据
  const projectTypeData = [
    { name: '自动化控制', value: 5, color: '#3b82f6' },
    { name: '水处理系统', value: 3, color: '#10b981' },
    { name: '电气设计', value: 4, color: '#f59e0b' },
    { name: '监控系统', value: 2, color: '#6366f1' },
  ];
  
  // 模拟工时统计数据
  const workHoursData = [
    { name: '1周', 计划工时: 160, 实际工时: 165 },
    { name: '2周', 计划工时: 160, 实际工时: 155 },
    { name: '3周', 计划工时: 160, 实际工时: 170 },
    { name: '4周', 计划工时: 160, 实际工时: 150 },
  ];
  
  // 模拟资源利用率数据
  const resourceUtilizationData = [
    { name: '项目经理', utilization: 85 },
    { name: '需求分析师', utilization: 70 },
    { name: '方案设计师', utilization: 90 },
    { name: '开发工程师', utilization: 75 },
    { name: '测试工程师', utilization: 60 },
    { name: '实施工程师', utilization: 80 },
  ];
  
  // 模拟项目成本数据
  const costData = [
    { name: '1月', 计划成本: 80000, 实际成本: 82000 },
    { name: '2月', 计划成本: 120000, 实际成本: 115000 },
    { name: '3月', 计划成本: 90000, 实际成本: 95000 },
    { name: '4月', 计划成本: 100000, 实际成本: 98000 },
  ];
  
  // 模拟项目风险分布数据
  const riskDistributionData = [
    { name: '高风险', value: 3, color: '#ef4444' },
    { name: '中风险', value: 7, color: '#f59e0b' },
    { name: '低风险', value: 12, color: '#10b981' },
  ];
  
  // 模拟问题分类数据
  const issueTypeData = [
    { name: '需求变更', value: 8, color: '#3b82f6' },
    { name: '技术障碍', value: 5, color: '#ef4444' },
    { name: '资源短缺', value: 3, color: '#f59e0b' },
    { name: '沟通问题', value: 4, color: '#6366f1' },
    { name: '外部依赖', value: 2, color: '#10b981' },
  ];
  
  // 模拟项目列表数据
  const projectsData = [
    { id: 1, name: '智能工厂控制系统', progress: 45, status: 'active', startDate: '2025-03-10', endDate: '2025-07-15', manager: '张明', budget: '1,200,000', actualCost: '530,000' },
    { id: 2, name: '水处理自动化项目', progress: 78, status: 'active', startDate: '2025-02-15', endDate: '2025-05-30', manager: '李红', budget: '800,000', actualCost: '620,000' },
    { id: 3, name: '电气自动化设计项目', progress: 10, status: 'active', startDate: '2025-04-01', endDate: '2025-08-21', manager: '王强', budget: '1,500,000', actualCost: '150,000' },
    { id: 4, name: '化工厂自控系统', progress: 25, status: 'active', startDate: '2025-03-20', endDate: '2025-06-12', manager: '赵薇', budget: '950,000', actualCost: '220,000' },
    { id: 5, name: '污水处理监控系统', progress: 60, status: 'active', startDate: '2025-02-10', endDate: '2025-05-15', manager: '张明', budget: '650,000', actualCost: '390,000' },
  ];
  
  // 自定义饼图Label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  // 统计卡片组件
  const StatCard = ({ icon: Icon, title, value, change, color, bgColor }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div className={`text-xs px-2 py-0.5 rounded-full ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div className="mt-2">
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-xl font-bold mt-1">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* 报表工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">报表分析</h2>
          <div className="flex items-center space-x-3">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-2 text-sm ${dateRange === 'week' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setDateRange('week')}
              >
                周
              </button>
              <button 
                className={`px-3 py-2 text-sm ${dateRange === 'month' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setDateRange('month')}
              >
                月
              </button>
              <button 
                className={`px-3 py-2 text-sm ${dateRange === 'quarter' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setDateRange('quarter')}
              >
                季度
              </button>
              <button 
                className={`px-3 py-2 text-sm ${dateRange === 'year' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                onClick={() => setDateRange('year')}
              >
                年
              </button>
            </div>
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center">
              <Printer className="h-4 w-4 mr-2" />
              打印
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-2" />
              导出
            </button>
          </div>
        </div>
        
        {/* 报表导航标签 */}
        <div className="flex mt-4 border-b">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            报表总览
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'projects' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('projects')}
          >
            项目报表
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('tasks')}
          >
            任务报表
          </button>
          {/* 移除资源、成本、风险tab */}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-6 overflow-auto">
        {/* 报表总览标签内容 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* 顶部统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Briefcase}
                title="项目总数"
                value={projectsOverview.totalProjects}
                change={5}
                color="text-blue-600"
                bgColor="bg-blue-100"
              />
              <StatCard 
                icon={CheckSquare}
                title="任务总数"
                value={tasksOverview.totalTasks}
                change={8}
                color="text-green-600"
                bgColor="bg-green-100"
              />
              <StatCard 
                icon={AlertCircle}
                title="逾期任务"
                value={tasksOverview.overdueTasks}
                change={-15}
                color="text-red-600"
                bgColor="bg-red-100"
              />
              {/* 移除资源利用率卡片 */}
            </div>
            
            {/* 项目和任务状态分布 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目状态分布</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">任务状态分布</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* 项目进度和月度任务完成情况 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目进度</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectProgressData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progress" name="当前进度" fill="#3b82f6" />
                      <Bar dataKey="target" name="目标进度" fill="#93c5fd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">月度任务完成情况</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyTasksData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="完成任务" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="新增任务" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* 项目类型分布和工时统计 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目类型分布</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={projectTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {projectTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">工时统计</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={workHoursData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="计划工时" fill="#93c5fd" />
                      <Bar dataKey="实际工时" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 项目报表标签内容 */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* 项目统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Briefcase}
                title="项目总数"
                value={projectsOverview.totalProjects}
                change={5}
                color="text-blue-600"
                bgColor="bg-blue-100"
              />
              <StatCard 
                icon={TrendingUp}
                title="进行中项目"
                value={projectsOverview.activeProjects}
                change={10}
                color="text-green-600"
                bgColor="bg-green-100"
              />
              <StatCard 
                icon={CheckSquare}
                title="已完成项目"
                value={projectsOverview.completedProjects}
                change={20}
                color="text-purple-600"
                bgColor="bg-purple-100"
              />
              <StatCard 
                icon={AlertCircle}
                title="延期项目"
                value={projectsOverview.delayedProjects}
                change={-15}
                color="text-red-600"
                bgColor="bg-red-100"
              />
            </div>
            
            {/* 项目状态和类型分布 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目状态分布</h3>
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目类型分布</h3>
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={projectTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {projectTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* 项目进度和项目列表 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">项目进度跟踪</h3>
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectProgressData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progress" name="当前进度" fill="#3b82f6" />
                      <Bar dataKey="target" name="目标进度" fill="#93c5fd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">项目列表</h3>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 text-sm">查看全部</button>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        <th className="px-6 py-3 font-medium">项目名称</th>
                        <th className="px-4 py-3 font-medium">项目经理</th>
                        <th className="px-4 py-3 font-medium">开始日期</th>
                        <th className="px-4 py-3 font-medium">结束日期</th>
                        <th className="px-4 py-3 font-medium">预算</th>
                        <th className="px-4 py-3 font-medium">实际支出</th>
                        <th className="px-4 py-3 font-medium">进度</th>
                        <th className="px-4 py-3 font-medium">状态</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {projectsData.map(project => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                          <td className="px-4 py-4 text-gray-500">{project.manager}</td>
                          <td className="px-4 py-4 text-gray-500">{project.startDate}</td>
                          <td className="px-4 py-4 text-gray-500">{project.endDate}</td>
                          <td className="px-4 py-4 text-gray-500">¥{project.budget}</td>
                          <td className="px-4 py-4 text-gray-500">¥{project.actualCost}</td>
                          <td className="px-4 py-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                            </div>
                            <div className="text-xs text-gray-500 text-right">{project.progress}%</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              project.status === 'delayed' ? 'bg-red-100 text-red-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {project.status === 'active' ? '进行中' : 
                               project.status === 'completed' ? '已完成' : 
                               '已延期'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 任务报表标签内容 */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* 任务统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={CheckSquare}
                title="任务总数"
                value={tasksOverview.totalTasks}
                change={8}
                color="text-blue-600"
                bgColor="bg-blue-100"
              />
              <StatCard 
                icon={TrendingUp}
                title="进行中任务"
                value={tasksOverview.inProgressTasks}
                change={5}
                color="text-amber-600"
                bgColor="bg-amber-100"
              />
              <StatCard 
                icon={CheckSquare}
                title="已完成任务"
                value={tasksOverview.completedTasks}
                change={12}
                color="text-green-600"
                bgColor="bg-green-100"
              />
              <StatCard 
                icon={AlertCircle}
                title="逾期任务"
                value={tasksOverview.overdueTasks}
                change={-15}
                color="text-red-600"
                bgColor="bg-red-100"
              />
            </div>
            
            {/* 任务状态分布和月度任务完成情况 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">任务状态分布</h3>
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">月度任务完成情况</h3>
                  <Download className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyTasksData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="完成任务" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="新增任务" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* 问题分类 */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">问题分类统计</h3>
                <Download className="h-4 w-4 text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={issueTypeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="问题数量">
                      {issueTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        {/* 移除资源报表、成本报表、风险报表内容 */}
      </div>
      
      {/* 筛选模态框 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">筛选报表数据</h3>
              <button className="text-gray-500" onClick={() => setShowFilterModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">项目</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">所有项目</option>
                  {projectsData.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">日期范围</label>
                <div className="flex justify-between">
                  <div className="w-5/12">
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="flex items-center text-gray-500">至</div>
                  <div className="w-5/12">
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">项目状态</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="status-active" className="mr-2" defaultChecked />
                    <label htmlFor="status-active" className="text-sm">进行中</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="status-completed" className="mr-2" defaultChecked />
                    <label htmlFor="status-completed" className="text-sm">已完成</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="status-delayed" className="mr-2" defaultChecked />
                    <label htmlFor="status-delayed" className="text-sm">已延期</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">项目经理</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">所有项目经理</option>
                  <option value="张明">张明</option>
                  <option value="李红">李红</option>
                  <option value="王强">王强</option>
                  <option value="赵薇">赵薇</option>
                </select>
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

export default ReportsAnalytics;