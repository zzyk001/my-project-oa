import React from 'react';
import { Link } from 'react-router-dom'; // 用于链接到详情页

const ProjectList = () => {
  // 在这里你需要调用 API 获取项目列表数据
  // const [projects, setProjects] = useState([]);
  // useEffect(() => { ... fetch projects ... }, []);

  // 临时静态数据
  const projects = [
      { projectId: 1, name: '项目A', status: 'RUNNING', templateName: '标准审批流程' },
      { projectId: 2, name: '项目B', status: 'PENDING', templateName: '请假流程' },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">项目列表</h2>
      {/* 在这里渲染项目列表 */}
      <ul>
        {projects.map(p => (
          <li key={p.projectId} className="mb-2 p-2 border rounded hover:bg-gray-50">
            <Link to={`/projects/${p.projectId}`} className="text-blue-600 hover:underline">
              {p.name}
            </Link>
             - {p.templateName} ({p.status})
          </li>
        ))}
      </ul>
      {/* 可以添加创建项目的按钮 */}
      {/* <button>创建新项目</button> */}
    </div>
  );
};

export default ProjectList;