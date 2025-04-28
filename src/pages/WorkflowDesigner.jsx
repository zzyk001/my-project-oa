import React, { useState } from 'react';
import { ChevronDown, Settings, Bell, Search, Save, Plus, ArrowRight, Edit, Trash2, Copy, Download, Upload, List, Grid, AlertCircle, X, Check, HelpCircle, Briefcase, Users } from 'lucide-react';

const WorkflowDesigner = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // --- 增强后的模拟工作流节点数据 ---
  const initialNodes = [
    {
      id: 1, type: 'start', name: '项目启动', x: 50, y: 150, width: 160, height: 70,
      roles: [ // 角色现在是对象数组
        { roleName: '项目经理', responsibility: 'Executor' }
      ],
      documents: ['项目启动申请表'],
      taskTitleTemplate: null, // 开始节点通常不直接生成任务
      taskDescriptionTemplate: null,
      estimatedDuration: 1, durationUnit: 'day'
    },
    {
      id: 2, type: 'task', name: '需求分析与确认', x: 300, y: 150, width: 160, height: 70,
      roles: [
        { roleName: '需求分析师', responsibility: 'Executor' },
        { roleName: '产品经理', responsibility: 'Participant' }
      ],
      documents: ['需求规格说明书', '用户调研报告'],
      taskTitleTemplate: '完成 [节点名称] 工作',
      taskDescriptionTemplate: '请根据项目要求，完成 [节点名称] 的相关工作内容。\n关联文档：[文档列表]',
      estimatedDuration: 5, durationUnit: 'day'
    },
    {
      id: 3, type: 'decision', name: '需求评审', x: 550, y: 150, width: 160, height: 70,
      roles: [
        { roleName: '项目经理', responsibility: 'Approver' }, // 审批者
        { roleName: '技术总监', responsibility: 'Approver' },
        { roleName: '客户代表', responsibility: 'Participant' } // 参与者
      ],
      documents: ['需求评审记录'],
      taskTitleTemplate: '评审 [节点名称] 结果',
      taskDescriptionTemplate: '请评审 [节点名称] 阶段的产出物，并决定是否进入下一阶段。',
      estimatedDuration: 1, durationUnit: 'day'
    },
    {
      id: 4, type: 'task', name: '技术方案设计', x: 800, y: 50, width: 160, height: 70, // 调整位置以模拟分支
      roles: [
        { roleName: '方案设计师', responsibility: 'Executor' },
        { roleName: '技术总监', responsibility: 'Approver' } // 设计后需要审批
      ],
      documents: ['概要设计方案', '技术选型报告'],
      taskTitleTemplate: '完成 [节点名称]',
      taskDescriptionTemplate: '设计满足需求的 [节点名称]，输出相关文档。',
      estimatedDuration: 7, durationUnit: 'day'
    },
    {
      id: 5, type: 'task', name: '采购计划制定', x: 800, y: 250, width: 160, height: 70, // 调整位置以模拟分支
      roles: [
        { roleName: '采购经理', responsibility: 'Executor' },
        { roleName: '项目经理', responsibility: 'Approver' }
      ],
      documents: ['采购清单', '供应商评估报告'],
      taskTitleTemplate: '制定 [节点名称]',
      taskDescriptionTemplate: '根据项目需要制定详细的 [节点名称]。',
      estimatedDuration: 3, durationUnit: 'day'
    },
    {
      id: 6, type: 'end', name: '项目结束', x: 1050, y: 150, width: 160, height: 70,
      roles: [
        { roleName: '项目经理', responsibility: 'Executor' }
      ],
      documents: ['项目验收报告', '项目总结'],
      taskTitleTemplate: null, // 结束节点通常不直接生成任务
      taskDescriptionTemplate: null,
      estimatedDuration: 1, durationUnit: 'day'
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);

  // 模拟连线数据 (假设评审通过后同时进行设计和采购)
  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 }, // 评审后 -> 设计
    { from: 3, to: 5 }, // 评审后 -> 采购
    { from: 4, to: 6 }, // 设计后 -> 结束 (简化)
    { from: 5, to: 6 }, // 采购后 -> 结束 (简化)
  ];

  // 模拟可用角色数据
  const availableRoles = [
    '项目经理', '需求分析师', '产品经理', '方案设计师', '技术总监', '开发工程师',
    '测试工程师', '采购经理', '客户代表', '质量控制', '文档专员'
  ];

  // 模拟模板列表
  const workflowTemplates = [
    { id: 1, name: '标准工程项目流程', description: '适用于一般工程项目的完整流程', nodeCount: 12, lastModified: '2025-03-15' },
    { id: 2, name: '简化版项目流程', description: '适用于小型或快速项目的简化流程', nodeCount: 6, lastModified: '2025-04-01' },
    { id: 3, name: '采购专项流程', description: '专注于项目采购环节的详细流程', nodeCount: 8, lastModified: '2025-03-28' },
    { id: 4, name: '设计审核流程', description: '专门用于设计方案的多级审核流程', nodeCount: 5, lastModified: '2025-04-10' },
  ];

  // 模拟SVG路径计算 (保持不变，实际需要库)
  const getPathData = (from, to) => {
    const fromNode = nodes.find(n => n.id === from);
    const toNode = nodes.find(n => n.id === to);
    if (!fromNode || !toNode) return '';
    // 使用直角连接线
    const cx = fromNode.x + fromNode.width;
    const cy = fromNode.y + fromNode.height / 2;
    const tx = toNode.x;
    const ty = toNode.y + toNode.height / 2;
    const midx = cx + (tx - cx) / 2;
    return `M ${cx},${cy} L ${midx},${cy} L ${midx},${ty} L ${tx},${ty}`;
  };

  const handleNodeClick = (node) => {
    // 在实际应用中，这里可能需要从API获取完整的节点信息或深拷贝
    setSelectedNode({...node}); // 浅拷贝，避免直接修改原数据
  };

   const handleAddRole = () => {
    if (!selectedNode) return;
    setShowRoleModal(true);
    // 实际添加逻辑在模态框确认后处理
  };

  const handleSaveWorkflow = () => {
    setShowPublishModal(true);
    // 实际保存逻辑在模态框确认后处理
  };

   // 处理节点属性更新的函数 (示例，实际需要更新 state)
   const handleNodePropertyChange = (field, value, roleIndex = null, subField = null) => {
        if (!selectedNode) return;

        // 创建更新后的节点数据副本
        const updatedNode = { ...selectedNode };

        if (field === 'roles' && roleIndex !== null && subField !== null) {
            // 更新角色数组中的特定属性
            updatedNode.roles = updatedNode.roles.map((roleEntry, index) =>
                index === roleIndex ? { ...roleEntry, [subField]: value } : roleEntry
            );
        } else if (field === 'roles' && roleIndex == null && subField == null) {
             // 直接替换 roles 数组 (例如移除角色后)
            updatedNode.roles = value;
        } else if (field === 'documents' && roleIndex == null && subField == null) {
            // 直接替换 documents 数组
            updatedNode.documents = value;
        } else {
            // 更新节点的顶层属性
            updatedNode[field] = value;
        }

        // 更新 selectedNode 状态以立即反映更改
        setSelectedNode(updatedNode);

        // 更新整个 nodes 数组状态 (这部分逻辑在真实应用中可能更复杂)
        setNodes(prevNodes =>
            prevNodes.map(n => (n.id === selectedNode.id ? updatedNode : n))
        );

        console.log("Node property updated:", selectedNode.id, field, value);
    };

     // 处理移除角色的函数 (示例)
    const handleRemoveRole = (roleIndexToRemove) => {
        if (!selectedNode || !selectedNode.roles) return;

        const updatedRoles = selectedNode.roles.filter((_, index) => index !== roleIndexToRemove);
        handleNodePropertyChange('roles', updatedRoles); // 调用通用更新函数
    };

    // 处理移除文档的函数 (示例)
    const handleRemoveDocument = (docIndexToRemove) => {
        if (!selectedNode || !selectedNode.documents) return;

        const updatedDocuments = selectedNode.documents.filter((_, index) => index !== docIndexToRemove);
        handleNodePropertyChange('documents', updatedDocuments); // 调用通用更新函数
    };

  // --- 渲染增强后的属性面板 ---
  const renderPropertiesPanel = () => {
    if (!selectedNode) {
         return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <HelpCircle className="h-12 w-12 mb-4 text-gray-300" />
              <p>请选择一个节点查看和编辑属性</p>
            </div>
          );
    }

    return (
        <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">模板节点属性</h3>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <label htmlFor={`node-name-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">节点名称</label>
                  <input
                    id={`node-name-${selectedNode.id}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={selectedNode.name || ''} // 使用 value 而不是 defaultValue
                    onChange={(e) => handleNodePropertyChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`node-type-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">节点类型</label>
                  <select
                    id={`node-type-${selectedNode.id}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                    value={selectedNode.type || ''}
                    onChange={(e) => handleNodePropertyChange('type', e.target.value)}
                  >
                    <option value="start">开始节点</option>
                    <option value="task">任务节点</option>
                    <option value="decision">决策节点</option>
                    <option value="end">结束节点</option>
                  </select>
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">负责角色与职责</label>
                        <button
                            className="text-blue-600 text-xs flex items-center"
                            onClick={handleAddRole}
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            添加角色
                        </button>
                    </div>
                    <div className="space-y-2">
                        {(selectedNode.roles || []).map((roleEntry, index) => (
                            <div key={`${selectedNode.id}-role-${index}`} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{roleEntry.roleName}</span>
                                    <button className="text-gray-400 hover:text-red-500" onClick={() => handleRemoveRole(index)}>
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-xs text-gray-500">职责:</span>
                                    <select
                                        value={roleEntry.responsibility}
                                        onChange={(e) => handleNodePropertyChange('roles', e.target.value, index, 'responsibility')}
                                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white flex-grow"
                                    >
                                        <option value="Executor">执行者</option>
                                        <option value="Approver">审批者</option>
                                        <option value="Participant">参与者</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        {(selectedNode.roles || []).length === 0 && <p className="text-xs text-gray-400">尚未添加角色</p>}
                    </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">相关文档</label>
                    <button className="text-blue-600 text-xs flex items-center">
                      <Plus className="h-3 w-3 mr-1" />
                      添加文档
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(selectedNode.documents || []).map((doc, index) => (
                      <div key={`${selectedNode.id}-doc-${index}`} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                        <span className="text-sm">{doc}</span>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => handleRemoveDocument(index)}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                     {(selectedNode.documents || []).length === 0 && <p className="text-xs text-gray-400">无关联文档</p>}
                  </div>
                </div>
                 <div>
                  <label htmlFor={`task-title-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">生成任务标题模板</label>
                  <input
                    id={`task-title-${selectedNode.id}`}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="例如：完成 [节点名称]"
                    value={selectedNode.taskTitleTemplate || ''} // 使用 value
                    onChange={(e) => handleNodePropertyChange('taskTitleTemplate', e.target.value)}
                    disabled={selectedNode.type === 'start' || selectedNode.type === 'end'} // 开始结束节点通常不生成任务
                  />
                   <p className="text-xs text-gray-500 mt-1">可以使用占位符如 [节点名称], [项目名称]</p>
                </div>
                 <div>
                  <label htmlFor={`task-desc-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">生成任务描述模板</label>
                  <textarea
                    id={`task-desc-${selectedNode.id}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows="3"
                    placeholder="描述自动生成的任务的要求..."
                    value={selectedNode.taskDescriptionTemplate || ''} // 使用 value
                    onChange={(e) => handleNodePropertyChange('taskDescriptionTemplate', e.target.value)}
                    disabled={selectedNode.type === 'start' || selectedNode.type === 'end'}
                  ></textarea>
                 </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">预计耗时</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="输入数字"
                      value={selectedNode.estimatedDuration || ''} // 使用 value
                       onChange={(e) => handleNodePropertyChange('estimatedDuration', e.target.value)}
                    />
                    <select
                        className="w-1/2 ml-2 px-3 py-2 border border-gray-300 rounded-md bg-white"
                        value={selectedNode.durationUnit || 'day'} // 使用 value
                        onChange={(e) => handleNodePropertyChange('durationUnit', e.target.value)}
                    >
                      <option value="hour">小时</option>
                      <option value="day">天</option>
                      <option value="week">周</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor={`node-conditions-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">条件设置</label>
                  <textarea
                    id={`node-conditions-${selectedNode.id}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder={selectedNode.type === 'decision' ? "设置决策条件，例如：评审结果 == '通过'" : "此节点类型无需设置条件"}
                    disabled={selectedNode.type !== 'decision'}
                    // value and onChange logic
                  ></textarea>
                </div>
                <div>
                  <label htmlFor={`node-trigger-${selectedNode.id}`} className="block text-sm font-medium text-gray-700 mb-1">触发动作</label>
                  <select
                    id={`node-trigger-${selectedNode.id}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                    // value and onChange logic
                  >
                    <option value="none">无</option>
                    <option value="notification">发送通知</option>
                    <option value="email">发送邮件</option>
                    <option value="api">调用API</option>
                    <option value="custom">自定义脚本</option>
                  </select>
                </div>
            </div>
        </>
    );
 };

  // --- 主组件返回 ---
  return (
    <div className="flex flex-col h-screen bg-gray-50">
     

      {/* 工作流设计器工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">工作流模板设计器</h2>
            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              编辑中: 标准工程项目流程 v1.3 {/* 示例 */}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              添加节点
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-1" />
              导入
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              导出
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Copy className="h-4 w-4 mr-1" />
              另存为模板
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              onClick={handleSaveWorkflow}
            >
              <Save className="h-4 w-4 mr-2" />
              保存模板
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium">工作流模板库</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {workflowTemplates.map(template => (
                <div key={template.id} className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50">
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <span>{template.nodeCount} 个节点</span>
                    <span className="mx-2">•</span>
                    <span>更新于 {template.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center">
              <Plus className="h-4 w-4 mr-1" />
              创建新模板
            </button>
          </div>
        </div>

        {/* 中间设计区域 */}
        <div className="flex-1 overflow-auto relative">
          <div className="absolute inset-0 bg-dots" style={{ '--dot-bg': 'white', '--dot-color': '#e0e0e0', '--dot-size': '1px', '--dot-space': '20px' }}>
            {/* 工作流节点 */}
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute cursor-move border-2 rounded-lg bg-white shadow-sm p-3 flex flex-col items-center justify-center text-center ${
                  selectedNode?.id === node.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                } ${
                  node.type === 'start' ? 'border-green-500 bg-green-50' :
                  node.type === 'end' ? 'border-red-500 bg-red-50' :
                  node.type === 'decision' ? 'border-amber-500 bg-amber-50' : ''
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  minHeight: `${node.height}px`, // Use minHeight for flexibility
                }}
                onClick={() => handleNodeClick(node)}
              >
                <span className="font-medium text-sm mb-1">{node.name}</span>
                {(node.roles || []).length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                     {(node.roles || []).slice(0, 2).map((roleEntry, idx) => ( // 只显示前两个角色名
                        <span key={idx} className="text-xs bg-gray-200 px-1.5 py-0.5 rounded" title={`${roleEntry.roleName} (${roleEntry.responsibility})`}>
                           {roleEntry.roleName}
                        </span>
                     ))}
                      {(node.roles || []).length > 2 && <span className="text-xs text-gray-400">+{(node.roles || []).length - 2}</span>}
                  </div>
                )}
              </div>
            ))}

            {/* 工作流连线 */}
            <svg className="absolute inset-0 pointer-events-none" width="2000" height="1000" style={{ zIndex: -1 }}>
              <defs>
                  <marker
                    id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
              </defs>
              {connections.map((conn, index) => (
                <path key={index} d={getPathData(conn.from, conn.to)} stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
              ))}
            </svg>
          </div>
        </div>

        {/* 右侧属性面板 */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {renderPropertiesPanel()} {/* 渲染增强后的面板 */}
        </div>
      </div>

      {/* 角色选择模态框 (更新) */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">添加角色</h3>
              <button className="text-gray-500" onClick={() => setShowRoleModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="role-select-modal" className="block text-sm font-medium text-gray-700 mb-1">选择角色</label>
                <select id="role-select-modal" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  {availableRoles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>
               <div className="mb-4">
                 <label htmlFor="responsibility-select-modal" className="block text-sm font-medium text-gray-700 mb-1">默认职责</label>
                 <select id="responsibility-select-modal" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                    <option value="Executor">执行者</option>
                    <option value="Approver">审批者</option>
                    <option value="Participant">参与者</option>
                 </select>
               </div>
              {/* Option to create new role could be here */}
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowRoleModal(false)}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                      // 获取选中的角色和职责
                      const selectedRoleName = document.getElementById('role-select-modal').value;
                      const selectedResponsibility = document.getElementById('responsibility-select-modal').value;
                      // 创建新的角色条目
                      const newRoleEntry = { roleName: selectedRoleName, responsibility: selectedResponsibility };
                      // 更新 selectedNode 的 roles 数组
                      handleNodePropertyChange('roles', [...(selectedNode.roles || []), newRoleEntry]);
                      setShowRoleModal(false);
                  }}
                >
                  确认添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 保存工作流模态框 (更新版本号) */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">保存工作流模板</h3>
              <button className="text-gray-500" onClick={() => setShowPublishModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="template-name-modal" className="block text-sm font-medium text-gray-700 mb-1">模板名称</label>
                <input
                  id="template-name-modal"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="输入模板名称"
                  defaultValue="标准工程项目流程 v1.3"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="template-desc-modal" className="block text-sm font-medium text-gray-700 mb-1">模板描述</label>
                <textarea
                  id="template-desc-modal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="输入模板描述"
                  defaultValue="适用于一般工程项目的完整流程，包含需求分析、方案设计、采购等环节。"
                ></textarea>
              </div>
              <div className="mb-4">
                 <label htmlFor="template-version-modal" className="block text-sm font-medium text-gray-700 mb-1">版本号</label>
                 <input
                   id="template-version-modal"
                   type="text"
                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
                   defaultValue="1.3"
                 />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowPublishModal(false)}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                      // 添加保存模板的逻辑
                      setShowPublishModal(false);
                  }}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加背景网格的 CSS */}
       <style jsx global>{`
        .bg-dots {
          background-image: radial-gradient(var(--dot-color) var(--dot-size), var(--dot-bg) var(--dot-size));
          background-size: var(--dot-space) var(--dot-space);
        }
      `}</style>
    </div>
  );
};

export default WorkflowDesigner;