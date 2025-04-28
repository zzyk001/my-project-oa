import React, { useState } from 'react';
import { ChevronDown, Bell, Search, User, Users, Briefcase, Settings, Plus, Edit, Trash2, X, Check, Shield, Lock, Key, Eye, EyeOff, UserPlus, CheckCircle, ChevronRight, Filter } from 'lucide-react';

const RoleManagement = () => {
  const [activeTab, setActiveTab] = useState('projectRoles');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // 模拟项目角色数据
  const projectRoles = [
    { id: 1, name: '项目经理', description: '负责项目整体规划、协调和管理，确保项目按计划完成', projects: 14, members: 6, permissions: [
      { id: 1, name: '项目创建', granted: true },
      { id: 2, name: '项目编辑', granted: true },
      { id: 3, name: '项目删除', granted: true },
      { id: 4, name: '人员分配', granted: true },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: true },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: true },
    ] },
    { id: 2, name: '需求分析师', description: '负责收集和分析客户需求，编写需求规格说明书', projects: 8, members: 4, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
    { id: 3, name: '方案设计师', description: '负责系统架构设计、功能模块设计等技术方案的编写', projects: 10, members: 5, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
    { id: 4, name: '采购经理', description: '负责项目物资采购、供应商管理和成本控制', projects: 6, members: 2, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
    { id: 5, name: '测试工程师', description: '负责系统功能测试、性能测试和测试报告编写', projects: 7, members: 3, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
    { id: 6, name: '实施工程师', description: '负责系统安装部署、现场调试和技术支持', projects: 5, members: 4, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: true },
      { id: 6, name: '任务编辑', granted: true },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: true },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
    { id: 7, name: '客户代表', description: '代表客户参与项目讨论、需求确认和验收测试', projects: 9, members: 3, permissions: [
      { id: 1, name: '项目创建', granted: false },
      { id: 2, name: '项目编辑', granted: false },
      { id: 3, name: '项目删除', granted: false },
      { id: 4, name: '人员分配', granted: false },
      { id: 5, name: '任务创建', granted: false },
      { id: 6, name: '任务编辑', granted: false },
      { id: 7, name: '任务删除', granted: false },
      { id: 8, name: '文档管理', granted: false },
      { id: 9, name: '报表查看', granted: true },
      { id: 10, name: '角色管理', granted: false },
    ] },
  ];
  
  // 模拟系统角色数据
  const systemRoles = [
    { id: 1, name: '系统管理员', description: '拥有系统全部权限，负责系统配置和用户管理', members: 2, permissions: [
      { id: 1, name: '用户管理', granted: true },
      { id: 2, name: '角色管理', granted: true },
      { id: 3, name: '权限配置', granted: true },
      { id: 4, name: '系统设置', granted: true },
      { id: 5, name: '日志查看', granted: true },
      { id: 6, name: '数据备份', granted: true },
    ] },
    { id: 2, name: '部门主管', description: '管理部门内的项目和人员，查看部门报表', members: 5, permissions: [
      { id: 1, name: '用户管理', granted: false },
      { id: 2, name: '角色管理', granted: false },
      { id: 3, name: '权限配置', granted: false },
      { id: 4, name: '系统设置', granted: false },
      { id: 5, name: '日志查看', granted: true },
      { id: 6, name: '数据备份', granted: false },
    ] },
    { id: 3, name: '普通用户', description: '基础系统用户，根据分配的项目角色执行相应工作', members: 20, permissions: [
      { id: 1, name: '用户管理', granted: false },
      { id: 2, name: '角色管理', granted: false },
      { id: 3, name: '权限配置', granted: false },
      { id: 4, name: '系统设置', granted: false },
      { id: 5, name: '日志查看', granted: false },
      { id: 6, name: '数据备份', granted: false },
    ] },
    { id: 4, name: '只读用户', description: '只能查看系统数据，不能进行任何修改操作', members: 8, permissions: [
      { id: 1, name: '用户管理', granted: false },
      { id: 2, name: '角色管理', granted: false },
      { id: 3, name: '权限配置', granted: false },
      { id: 4, name: '系统设置', granted: false },
      { id: 5, name: '日志查看', granted: false },
      { id: 6, name: '数据备份', granted: false },
    ] },
  ];
  
  // 模拟用户数据
  const users = [
    { id: 1, name: '张明', email: 'zhangming@example.com', department: '项目管理部', position: '高级项目经理', roles: ['项目经理', '系统管理员'] },
    { id: 2, name: '李红', email: 'lihong@example.com', department: '解决方案部', position: '资深需求分析师', roles: ['需求分析师', '部门主管'] },
    { id: 3, name: '王强', email: 'wangqiang@example.com', department: '技术研发部', position: '技术总监', roles: ['方案设计师', '部门主管'] },
    { id: 4, name: '赵薇', email: 'zhaowei@example.com', department: '采购部', position: '采购主管', roles: ['采购经理', '部门主管'] },
    { id: 5, name: '刘涛', email: 'liutao@example.com', department: '测试部', position: '测试主管', roles: ['测试工程师', '部门主管'] },
    { id: 6, name: '黄磊', email: 'huanglei@example.com', department: '实施部', position: '实施经理', roles: ['实施工程师', '部门主管'] },
    { id: 7, name: '张伟', email: 'zhangwei@example.com', department: '项目管理部', position: '项目经理', roles: ['项目经理'] },
    { id: 8, name: '王芳', email: 'wangfang@example.com', department: '解决方案部', position: '需求分析师', roles: ['需求分析师'] },
  ];
  
  // 模拟项目数据
  const projects = [
    { id: 1, name: '智能工厂控制系统', roles: ['项目经理', '需求分析师', '方案设计师', '采购经理', '测试工程师', '实施工程师'] },
    { id: 2, name: '水处理自动化项目', roles: ['项目经理', '方案设计师', '采购经理', '实施工程师'] },
    { id: 3, name: '电气自动化设计项目', roles: ['项目经理', '需求分析师', '方案设计师', '测试工程师'] },
    { id: 4, name: '化工厂自控系统', roles: ['项目经理', '需求分析师', '方案设计师', '采购经理', '测试工程师', '实施工程师', '客户代表'] },
  ];
  
  // 获取当前选中的角色数据
  const getRolesData = () => {
    return activeTab === 'projectRoles' ? projectRoles : systemRoles;
  };
  
  // 处理选择角色
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };
  
  // 过滤角色用户
  const getRoleUsers = (roleName) => {
    return users.filter(user => user.roles.includes(roleName));
  };
  
  // 过滤使用该角色的项目
  const getRoleProjects = (roleName) => {
    return projects.filter(project => project.roles.includes(roleName));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 角色管理工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">角色管理</h2>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              onClick={() => setShowRoleModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              创建角色
            </button>
          </div>
        </div>
        
        {/* 角色类型标签 */}
        <div className="flex mt-4 border-b">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'projectRoles' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('projectRoles')}
          >
            项目角色
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'systemRoles' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('systemRoles')}
          >
            系统角色
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧角色列表 */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索角色..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {getRolesData().map(role => (
                <li 
                  key={role.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedRole?.id === role.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  onClick={() => handleSelectRole(role)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 p-2 rounded-lg ${activeTab === 'projectRoles' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      {activeTab === 'projectRoles' ? <Briefcase className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{role.description}</div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        {activeTab === 'projectRoles' && (
                          <>
                            <Briefcase className="h-3.5 w-3.5 mr-1" />
                            <span>{role.projects} 个项目</span>
                            <span className="mx-2">•</span>
                          </>
                        )}
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{role.members} 名成员</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右侧角色详情 */}
        {selectedRole ? (
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">{selectedRole.name}</h3>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg border border-gray-300">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg border border-gray-300"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">角色描述</h4>
                <p className="text-sm text-gray-600">{selectedRole.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">权限设置</h4>
                  <button className="text-blue-600 text-sm">编辑权限</button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">权限名称</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">授权状态</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedRole.permissions.map(permission => (
                        <tr key={permission.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permission.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {permission.granted ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check className="h-3.5 w-3.5 mr-1" />
                                已授权
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <X className="h-3.5 w-3.5 mr-1" />
                                未授权
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">角色成员 ({getRoleUsers(selectedRole.name).length})</h4>
                  <button 
                    className="text-blue-600 text-sm flex items-center"
                    onClick={() => setShowMemberModal(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    添加成员
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职位</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getRoleUsers(selectedRole.name).map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                {user.name.slice(0, 2)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.position}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-red-600 hover:text-red-800">移除</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {activeTab === 'projectRoles' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">应用项目 ({getRoleProjects(selectedRole.name).length})</h4>
                    <button className="text-blue-600 text-sm">查看全部</button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色数量</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getRoleProjects(selectedRole.name).map(project => (
                          <tr key={project.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.roles.length} 个角色</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                              <button className="text-blue-600 hover:text-blue-800">查看详情</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-gray-50 flex items-center justify-center">
            <div className="text-center p-6">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">请选择一个角色</h3>
              <p className="text-gray-500 max-w-md">从左侧列表中选择一个角色查看详细信息，或者点击"创建角色"按钮创建新的角色。</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 创建角色模态框 */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-90vh overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">创建新角色</h3>
              <button className="text-gray-500" onClick={() => setShowRoleModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">角色类型</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input type="radio" id="type-project" name="role-type" className="mr-2" defaultChecked />
                    <label htmlFor="type-project" className="text-sm">项目角色</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="type-system" name="role-type" className="mr-2" />
                    <label htmlFor="type-system" className="text-sm">系统角色</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">角色名称 *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="输入角色名称"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">角色描述</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="描述该角色的职责和权限范围"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">权限设置</h4>
                <div className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-medium">功能权限</span>
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 text-xs">全选</button>
                      <button className="text-blue-600 text-xs">取消全选</button>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-project-create" className="mr-2" />
                      <label htmlFor="perm-project-create" className="text-sm">项目创建</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-project-edit" className="mr-2" />
                      <label htmlFor="perm-project-edit" className="text-sm">项目编辑</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-project-delete" className="mr-2" />
                      <label htmlFor="perm-project-delete" className="text-sm">项目删除</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-member-assign" className="mr-2" />
                      <label htmlFor="perm-member-assign" className="text-sm">人员分配</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-task-create" className="mr-2" />
                      <label htmlFor="perm-task-create" className="text-sm">任务创建</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-task-edit" className="mr-2" />
                      <label htmlFor="perm-task-edit" className="text-sm">任务编辑</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-task-delete" className="mr-2" />
                      <label htmlFor="perm-task-delete" className="text-sm">任务删除</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-doc-manage" className="mr-2" />
                      <label htmlFor="perm-doc-manage" className="text-sm">文档管理</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-report-view" className="mr-2" />
                      <label htmlFor="perm-report-view" className="text-sm">报表查看</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="perm-role-manage" className="mr-2" />
                      <label htmlFor="perm-role-manage" className="text-sm">角色管理</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={() => setShowRoleModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowRoleModal(false)}
                >
                  创建角色
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 添加成员模态框 */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-90vh overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">添加成员到"{selectedRole?.name}"</h3>
              <button className="text-gray-500" onClick={() => setShowMemberModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索用户..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">可选成员</h4>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 text-xs">全选</button>
                    <button className="text-blue-600 text-xs">取消全选</button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" className="mr-2" />
                          姓名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职位</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => !user.roles.includes(selectedRole?.name || '')).map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                {user.name.slice(0, 2)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={() => setShowMemberModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowMemberModal(false)}
                >
                  添加所选成员
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 删除角色确认模态框 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">确认删除</h3>
              <button className="text-gray-500" onClick={() => setShowDeleteModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 p-2 rounded-full bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">删除角色</h3>
                  <p className="text-sm text-gray-500">确定要删除"{selectedRole?.name}"角色吗？</p>
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg mb-4">
                <p className="text-sm text-red-600">警告：删除该角色将影响所有与该角色关联的用户和项目。此操作无法撤销。</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  onClick={() => setShowDeleteModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedRole(null);
                  }}
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;