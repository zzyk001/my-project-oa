import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 新增
import { ChevronDown, Bell, Search, Folder, FileText, File, FilePlus, FolderPlus, Upload, Download, Grid, List, Filter, MoreHorizontal, X, Check, Share2, Star, Edit, Trash2, Eye, Users, Clock, BookOpen, FileCheck, Archive, ExternalLink } from 'lucide-react';

const DocumentManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // 新增
  
  // 模拟文件夹数据
  const folders = [
    { id: 1, name: '项目文档', count: 15, color: 'blue' },
    { id: 2, name: '设计图纸', count: 8, color: 'green' },
    { id: 3, name: '采购文档', count: 12, color: 'amber' },
    { id: 4, name: '会议记录', count: 6, color: 'purple' },
    { id: 5, name: '合同与协议', count: 4, color: 'red' },
    { id: 6, name: '项目报告', count: 7, color: 'indigo' },
  ];
  
  // 模拟文档数据
  const documents = [
    { id: 1, name: '智能工厂控制系统需求分析文档', folderId: 1, type: 'doc', size: '2.4MB', author: '李红', createDate: '2025-03-15', lastModified: '2025-03-30', version: 'V1.2', project: '智能工厂控制系统', starred: true, shared: true },
    { id: 2, name: '工厂自动化设计图纸', folderId: 2, type: 'dwg', size: '15.7MB', author: '王强', createDate: '2025-03-20', lastModified: '2025-04-05', version: 'V2.0', project: '智能工厂控制系统', starred: false, shared: true },
    { id: 3, name: '设备采购清单', folderId: 3, type: 'excel', size: '1.8MB', author: '赵薇', createDate: '2025-03-25', lastModified: '2025-04-10', version: 'V1.1', project: '智能工厂控制系统', starred: true, shared: false },
    { id: 4, name: '项目启动会议纪要', folderId: 4, type: 'doc', size: '1.2MB', author: '张明', createDate: '2025-03-12', lastModified: '2025-03-12', version: 'V1.0', project: '智能工厂控制系统', starred: false, shared: true },
    { id: 5, name: '供应商合同模板', folderId: 5, type: 'pdf', size: '3.5MB', author: '赵薇', createDate: '2025-03-28', lastModified: '2025-04-02', version: 'V1.0', project: null, starred: false, shared: false },
    { id: 6, name: '月度项目进度报告', folderId: 6, type: 'ppt', size: '5.2MB', author: '张明', createDate: '2025-04-05', lastModified: '2025-04-05', version: 'V1.0', project: '智能工厂控制系统', starred: false, shared: true },
    { id: 7, name: '控制系统架构图', folderId: 2, type: 'vsd', size: '4.1MB', author: '王强', createDate: '2025-03-22', lastModified: '2025-04-08', version: 'V2.1', project: '智能工厂控制系统', starred: true, shared: false },
    { id: 8, name: '水处理项目投标文件', folderId: 1, type: 'doc', size: '6.7MB', author: '张明', createDate: '2025-04-01', lastModified: '2025-04-10', version: 'V1.3', project: '水处理自动化项目', starred: false, shared: true },
    { id: 9, name: '电气设计标准规范', folderId: 1, type: 'pdf', size: '8.3MB', author: '王强', createDate: '2025-03-18', lastModified: '2025-03-18', version: 'V1.0', project: null, starred: false, shared: false },
    { id: 10, name: '项目风险评估报告', folderId: 6, type: 'doc', size: '2.9MB', author: '李红', createDate: '2025-04-02', lastModified: '2025-04-09', version: 'V1.1', project: '智能工厂控制系统', starred: false, shared: true },
    { id: 11, name: '自动化设备清单', folderId: 3, type: 'excel', size: '2.3MB', author: '赵薇', createDate: '2025-03-30', lastModified: '2025-04-08', version: 'V1.2', project: '水处理自动化项目', starred: false, shared: false },
    { id: 12, name: '客户需求确认会议纪要', folderId: 4, type: 'doc', size: '1.5MB', author: '李红', createDate: '2025-03-20', lastModified: '2025-03-20', version: 'V1.0', project: '水处理自动化项目', starred: false, shared: true },
  ];
  
  // 根据活动分类筛选文档
  const getFilteredDocuments = () => {
    let filtered = documents;
    
    if (activeCategory === 'starred') {
      filtered = documents.filter(doc => doc.starred);
    } else if (activeCategory === 'shared') {
      filtered = documents.filter(doc => doc.shared);
    } else if (activeCategory === 'recent') {
      // 按最后修改日期排序
      filtered = [...documents].sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    } else if (activeCategory !== 'all' && activeCategory !== 'projects') {
      filtered = documents.filter(doc => doc.folderId === parseInt(activeCategory));
    }
    
    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(query) || 
        (doc.project && doc.project.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };
  
  // 获取文件图标
  const getFileIcon = (type) => {
    switch (type) {
      case 'doc':
        return <FileText className="h-10 w-10 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'excel':
        return <FileText className="h-10 w-10 text-green-500" />;
      case 'ppt':
        return <FileText className="h-10 w-10 text-orange-500" />;
      case 'vsd':
        return <FileText className="h-10 w-10 text-purple-500" />;
      case 'dwg':
        return <FileText className="h-10 w-10 text-indigo-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };
  
  // 处理文件点击事件
  const handleFileClick = (file) => {
    setSelectedFile(file);
  };
  
  // 获取文件夹信息
  const getFolderInfo = (folderId) => {
    return folders.find(folder => folder.id === folderId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 文档管理工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">文档管理</h2>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5 text-gray-500" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center"
              onClick={() => setShowFolderModal(true)}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              新建文件夹
            </button>
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 flex items-center"
              onClick={() => {}}
            >
              <FilePlus className="h-4 w-4 mr-2" />
              新建文档
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              上传文件
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧导航 */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('all')}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  <span>全部文档</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                    {documents.length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === 'recent' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('recent')}
                >
                  <Clock className="h-5 w-5 mr-3" />
                  <span>最近浏览</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === 'starred' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('starred')}
                >
                  <Star className="h-5 w-5 mr-3" />
                  <span>收藏文档</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                    {documents.filter(doc => doc.starred).length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === 'shared' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('shared')}
                >
                  <Share2 className="h-5 w-5 mr-3" />
                  <span>已共享</span>
                  <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                    {documents.filter(doc => doc.shared).length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === 'projects' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveCategory('projects')}
                >
                  <Folder className="h-5 w-5 mr-3" />
                  <span>项目文档</span>
                </button>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">文件夹</h3>
              <ul className="mt-2 space-y-1">
                {folders.map(folder => (
                  <li key={folder.id}>
                    <button
                      className={`w-full flex items-center px-3 py-2 rounded-lg ${activeCategory === folder.id.toString() ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveCategory(folder.id.toString())}
                    >
                      <Folder className={`h-5 w-5 mr-3 text-${folder.color}-500`} />
                      <span>{folder.name}</span>
                      <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 text-xs rounded-full">
                        {folder.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
         
        </div>

        {/* 右侧文档内容区 */}
        <div className="flex-1 overflow-auto p-6">
          {/* 文件夹和文档视图 */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getFilteredDocuments().map(doc => (
                <div 
                  key={doc.id} 
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition hover:shadow-md ${selectedFile?.id === doc.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleFileClick(doc)}
                  onDoubleClick={() => navigate(`/documents/${doc.id}`)} // 双击跳转到文档详情页
                >
                  <div className="p-4">
                    <div className="flex justify-center mb-3">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium truncate" title={doc.name}>
                        {doc.name}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                        <div className="flex items-center">
                          <span className="uppercase">{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {formatDate(doc.lastModified)}
                    </div>
                    <div className="flex items-center space-x-1">
                      {doc.starred && <Star className="h-4 w-4 text-amber-400" />}
                      {doc.shared && <Share2 className="h-4 w-4 text-blue-500" />}
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="px-4 py-3 font-medium">名称</th>
                    <th className="px-4 py-3 font-medium">所在文件夹</th>
                    <th className="px-4 py-3 font-medium">项目</th>
                    <th className="px-4 py-3 font-medium">大小</th>
                    <th className="px-4 py-3 font-medium">修改日期</th>
                    <th className="px-4 py-3 font-medium">版本</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredDocuments().map(doc => (
                    <tr 
                      key={doc.id} 
                      className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer ${selectedFile?.id === doc.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleFileClick(doc)}
                      onDoubleClick={() => navigate(`/documents/${doc.id}`)} // 双击跳转到文档详情页
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="mr-3 flex-shrink-0">
                            {getFileIcon(doc.type)}
                          </div>
                          <div>
                            <div className="font-medium flex items-center">
                              {doc.name}
                              {doc.starred && <Star className="h-4 w-4 text-amber-400 ml-2" />}
                              {doc.shared && <Share2 className="h-4 w-4 text-blue-500 ml-2" />}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              上传者: {doc.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <Folder className={`h-4 w-4 mr-2 text-${getFolderInfo(doc.folderId)?.color}-500`} />
                          {getFolderInfo(doc.folderId)?.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          {doc.project || '--'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{doc.size}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{formatDate(doc.lastModified)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{doc.version}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-blue-600">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* 文件预览区 */}
          {selectedFile && (
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-10 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">文件详情</h3>
                <button className="text-gray-500" onClick={() => setSelectedFile(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  {getFileIcon(selectedFile.type)}
                </div>
                <h3 className="text-lg font-medium text-center mb-4">{selectedFile.name}</h3>
                
                <div className="flex justify-center space-x-3 mb-6">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-amber-500">
                    <Star className={`h-5 w-5 ${selectedFile.starred ? 'text-amber-400' : ''}`} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">文件信息</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">类型:</div>
                        <div className="font-medium uppercase">{selectedFile.type}</div>
                        <div className="text-gray-500">大小:</div>
                        <div className="font-medium">{selectedFile.size}</div>
                        <div className="text-gray-500">版本:</div>
                        <div className="font-medium">{selectedFile.version}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">时间信息</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">创建日期:</span>
                          <span className="font-medium">{formatDate(selectedFile.createDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">修改日期:</span>
                          <span className="font-medium">{formatDate(selectedFile.lastModified)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">归属信息</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">创建者:</span>
                          <span className="font-medium">{selectedFile.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">所在文件夹:</span>
                          <div className="flex items-center font-medium">
                            <Folder className={`h-4 w-4 mr-1 text-${getFolderInfo(selectedFile.folderId)?.color}-500`} />
                            {getFolderInfo(selectedFile.folderId)?.name}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">关联项目:</span>
                          <span className="font-medium">{selectedFile.project || '--'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">共享信息</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {selectedFile.shared ? (
                        <div className="text-sm">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">共享状态:</span>
                            <span className="text-green-600 font-medium">已共享</span>
                          </div>
                          <div className="text-gray-600 text-xs mt-1">共享给5名成员</div>
                          <div className="flex items-center mt-2">
                            <div className="flex -space-x-2">
                              <div className="h-6 w-6 rounded-full bg-blue-100 border-2 border-white text-blue-600 flex items-center justify-center text-xs font-medium">ZM</div>
                              <div className="h-6 w-6 rounded-full bg-green-100 border-2 border-white text-green-600 flex items-center justify-center text-xs font-medium">LH</div>
                              <div className="h-6 w-6 rounded-full bg-purple-100 border-2 border-white text-purple-600 flex items-center justify-center text-xs font-medium">WQ</div>
                              <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white text-gray-600 flex items-center justify-center text-xs font-medium">+2</div>
                            </div>
                            <button className="ml-auto text-xs text-blue-600">管理</button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm flex justify-between">
                          <span className="text-gray-500">共享状态:</span>
                          <span className="text-gray-600 font-medium">未共享</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 上传文件模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">上传文件</h3>
              <button className="text-gray-500" onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">拖放文件到此处，或</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  浏览文件
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">文件名</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="保持原文件名"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">选择文件夹</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">关联项目</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">无</option>
                  <option value="智能工厂控制系统">智能工厂控制系统</option>
                  <option value="水处理自动化项目">水处理自动化项目</option>
                  <option value="电气自动化设计项目">电气自动化设计项目</option>
                </select>
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="share-upload" className="mr-2" />
                  <label htmlFor="share-upload" className="text-sm">上传后共享给项目成员</label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowUploadModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowUploadModal(false)}
                >
                  上传
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 新建文件夹模态框 */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">新建文件夹</h3>
              <button className="text-gray-500" onClick={() => setShowFolderModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">文件夹名称</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="输入文件夹名称"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">文件夹颜色</label>
                <div className="flex space-x-2 mt-1">
                  {['blue', 'green', 'red', 'purple', 'amber', 'indigo'].map(color => (
                    <button 
                      key={color} 
                      className={`h-8 w-8 rounded-full bg-${color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">关联项目（可选）</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">无</option>
                  <option value="智能工厂控制系统">智能工厂控制系统</option>
                  <option value="水处理自动化项目">水处理自动化项目</option>
                  <option value="电气自动化设计项目">电气自动化设计项目</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowFolderModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowFolderModal(false)}
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;