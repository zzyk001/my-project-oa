import React, { useState } from 'react';
import { ChevronDown, Settings, Bell, Search, ChevronLeft, ChevronRight, Calendar, Clock, Users, List, Grid, Filter, Plus, X, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // 获取当前月份的天数
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // 获取当前月份的第一天是星期几
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // 生成月视图的日期数组
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // 上个月的日期
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i)
      });
    }
    
    // 当前月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year,
        date: new Date(year, month, i)
      });
    }
    
    // 下个月的日期，补齐到42个格子（6行7列）
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }
    
    return days;
  };
  
  // 生成周视图的日期数组
  const generateWeekDays = () => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day;
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(diff + i);
      weekDays.push({
        day: newDate.getDate(),
        isCurrentMonth: newDate.getMonth() === currentDate.getMonth(),
        isToday: new Date().toDateString() === newDate.toDateString(),
        date: newDate
      });
    }
    
    return weekDays;
  };
  
  // 格式化月份名称
  const formatMonth = (date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };
  
  // 切换到上一个月/周
  const prevPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };
  
  // 切换到下一个月/周
  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };
  
  // 切换到今天
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // 模拟日历事件数据
  const events = [
    { id: 1, title: '智能工厂项目启动会', date: new Date(2025, 3, 15), time: '10:00-12:00', project: '智能工厂控制系统', type: 'meeting', role: '项目经理' },
    { id: 2, title: '需求分析讨论', date: new Date(2025, 3, 16), time: '14:00-16:00', project: '智能工厂控制系统', type: 'meeting', role: '需求分析师' },
    { id: 3, title: '提交设计方案', date: new Date(2025, 3, 18), time: '全天', project: '智能工厂控制系统', type: 'task', role: '方案设计师' },
    { id: 4, title: '采购清单确认', date: new Date(2025, 3, 20), time: '15:00-16:00', project: '智能工厂控制系统', type: 'task', role: '采购经理' },
    { id: 5, title: '水处理项目评审', date: new Date(2025, 3, 15), time: '14:00-16:00', project: '水处理自动化项目', type: 'meeting', role: '技术总监' },
    { id: 6, title: '电气项目客户会议', date: new Date(2025, 3, 17), time: '09:30-11:30', project: '电气自动化设计项目', type: 'meeting', role: '客户代表' },
    { id: 7, title: '测试计划制定', date: new Date(2025, 3, 19), time: '全天', project: '水处理自动化项目', type: 'task', role: '测试工程师' },
    { id: 8, title: '项目进度汇报', date: new Date(2025, 3, 22), time: '16:00-17:00', project: '智能工厂控制系统', type: 'meeting', role: '项目经理' },
  ];
  
  // 获取指定日期的事件
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // 获取指定日期的事件（按时间排序）
  const getDayEvents = (date) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.sort((a, b) => {
      if (a.time === '全天') return -1;
      if (b.time === '全天') return 1;
      return a.time.localeCompare(b.time);
    });
  };
  
  // 获取一周每天的事件，用于周视图
  const getWeekEvents = () => {
    const weekDays = generateWeekDays();
    return weekDays.map(day => ({
      ...day,
      events: getDayEvents(day.date)
    }));
  };
  
  // 日视图的时间段
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8);
  
  // 生成日视图的事件
  const getDayViewEvents = (date) => {
    const dayEvents = getEventsForDate(date);
    const eventsWithTime = dayEvents.filter(event => event.time !== '全天');
    const allDayEvents = dayEvents.filter(event => event.time === '全天');
    
    return {
      allDayEvents,
      eventsWithTime: eventsWithTime.map(event => {
        const times = event.time.split('-');
        const startHour = parseInt(times[0].split(':')[0]);
        let endHour = times.length > 1 ? parseInt(times[1].split(':')[0]) : startHour + 1;
        const startMinute = parseInt(times[0].split(':')[1] || 0);
        const endMinute = times.length > 1 ? parseInt(times[1].split(':')[1] || 0) : startMinute;
        
        return {
          ...event,
          startHour,
          startMinute,
          endHour,
          endMinute,
          duration: (endHour - startHour) + (endMinute - startMinute) / 60
        };
      })
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* 日历工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">我的日历</h2>
            <div className="flex space-x-1">
              <button 
                className={`px-3 py-1 text-sm rounded-lg ${viewType === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewType('month')}
              >
                月视图
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-lg ${viewType === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewType('week')}
              >
                周视图
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-lg ${viewType === 'day' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setViewType('day')}
              >
                日视图
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600" onClick={goToToday}>
              今天
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-l-lg text-gray-600" onClick={prevPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-medium min-w-24 text-center">
                {viewType === 'month' 
                  ? formatMonth(currentDate)
                  : viewType === 'week'
                  ? `${generateWeekDays()[0].date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })} - ${generateWeekDays()[6].date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}`
                  : currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
                }
              </span>
              <button className="p-2 border border-gray-300 rounded-r-lg text-gray-600" onClick={nextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
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
              添加事件
            </button>
          </div>
        </div>
      </div>

      {/* 主日历视图 */}
      <div className="flex-1 p-6">
        {/* 月视图 */}
        {viewType === 'month' && (
          <div className="bg-white rounded-lg shadow">
            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-0 border-b">
              {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
                <div key={index} className="py-3 text-center text-gray-600 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            {/* 日期网格 */}
            <div className="grid grid-cols-7 grid-rows-6 h-full">
              {generateMonthDays().map((day, index) => (
                <div 
                  key={index} 
                  className={`border-b border-r min-h-24 p-1 ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                  } ${
                    day.isToday ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm p-1 ${day.isToday ? 'bg-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center' : ''}`}>
                      {day.day}
                    </span>
                    {getEventsForDate(day.date).length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">
                        {getEventsForDate(day.date).length}个事件
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                    {getEventsForDate(day.date).slice(0, 3).map(event => (
                      <div 
                        key={event.id} 
                        className={`text-xs p-1 rounded truncate ${
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}
                        title={event.title}
                      >
                        {event.time !== '全天' ? `${event.time} ` : ''}
                        {event.title}
                      </div>
                    ))}
                    {getEventsForDate(day.date).length > 3 && (
                      <div className="text-xs text-gray-500 px-1">
                        + {getEventsForDate(day.date).length - 3} 更多...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 周视图 */}
        {viewType === 'week' && (
          <div className="bg-white rounded-lg shadow">
            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-0 border-b">
              {generateWeekDays().map((day, index) => (
                <div key={index} className={`py-3 text-center ${day.isToday ? 'bg-blue-50' : ''}`}>
                  <div className="text-gray-600 font-medium">
                    {['日', '一', '二', '三', '四', '五', '六'][index]}
                  </div>
                  <div className={`mt-1 ${day.isToday ? 'bg-blue-500 text-white rounded-full h-7 w-7 mx-auto flex items-center justify-center' : ''}`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
            
            {/* 时间和事件 */}
            <div className="grid grid-cols-7 gap-0">
              {getWeekEvents().map((day, dayIndex) => (
                <div key={dayIndex} className={`min-h-96 border-r ${day.isToday ? 'bg-blue-50' : ''}`}>
                  {/* 全天事件 */}
                  {day.events.filter(e => e.time === '全天').map(event => (
                    <div 
                      key={event.id} 
                      className="m-1 p-2 text-xs bg-green-100 text-green-600 rounded border-l-4 border-green-500"
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs mt-1 truncate">{event.project}</div>
                    </div>
                  ))}
                  
                  {/* 具体时间的事件 */}
                  <div className="space-y-1 p-1">
                    {day.events.filter(e => e.time !== '全天').map(event => (
                      <div 
                        key={event.id} 
                        className="p-2 text-xs bg-blue-100 text-blue-600 rounded border-l-4 border-blue-500"
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="flex justify-between mt-1">
                          <div className="flex items-center text-xs">
                            <Clock className="h-3 w-3 mr-1" /> 
                            {event.time}
                          </div>
                          <div className="text-xs truncate">{event.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 日视图 */}
        {viewType === 'day' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </h3>
            </div>
            
            <div className="flex flex-col p-4">
              {/* 全天事件 */}
              {getDayViewEvents(currentDate).allDayEvents.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">全天事件</h4>
                  {getDayViewEvents(currentDate).allDayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="p-3 mb-2 bg-green-100 text-green-600 rounded border-l-4 border-green-500"
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="flex justify-between mt-1 text-sm">
                        <div>{event.project}</div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" /> 
                          {event.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 时间表 */}
              <div className="flex flex-col space-y-1">
                {timeSlots.map(hour => (
                  <div key={hour} className="flex border-t border-gray-100 h-20 relative">
                    <div className="w-16 text-right pr-4 py-2 text-sm text-gray-500">
                      {hour}:00
                    </div>
                    <div className="flex-1 relative">
                      {getDayViewEvents(currentDate).eventsWithTime
                        .filter(event => event.startHour <= hour && event.endHour > hour)
                        .map(event => {
                          const top = (event.startHour === hour) ? (event.startMinute / 60) * 100 : 0;
                          const height = (event.startHour === hour && event.endHour === hour + 1) 
                            ? ((60 - event.startMinute + event.endMinute) / 60) * 100 
                            : (event.startHour === hour ? (60 - event.startMinute) / 60 * 100 : 
                              (event.endHour === hour + 1 ? (event.endMinute / 60) * 100 : 100));
                            
                          return (
                            <div 
                              key={event.id} 
                              className="absolute left-0 right-0 bg-blue-100 text-blue-600 rounded border-l-4 border-blue-500 p-2 overflow-hidden"
                              style={{ 
                                top: `${top}%`, 
                                height: `${height}%`, 
                                zIndex: (event.endHour - event.startHour) * 10 
                              }}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="flex justify-between mt-1 text-xs">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" /> 
                                  {event.time}
                                </div>
                                <div className="truncate">{event.role}</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 添加事件模态框 */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">添加日历事件</h3>
              <button className="text-gray-500" onClick={() => setShowTaskModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">事件标题</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="输入事件标题"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">事件类型</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="meeting">会议</option>
                  <option value="task">任务</option>
                  <option value="reminder">提醒</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={currentDate.toISOString().split('T')[0]}
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <input type="checkbox" id="all-day" className="mr-2" />
                  <label htmlFor="all-day" className="text-sm font-medium text-gray-700">全天事件</label>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="09:00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="10:00"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">关联项目</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">选择项目</option>
                  <option value="1">智能工厂控制系统</option>
                  <option value="2">水处理自动化项目</option>
                  <option value="3">电气自动化设计项目</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="">选择角色</option>
                  <option value="项目经理">项目经理</option>
                  <option value="需求分析师">需求分析师</option>
                  <option value="方案设计师">方案设计师</option>
                  <option value="采购经理">采购经理</option>
                  <option value="测试工程师">测试工程师</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="输入事件描述"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => setShowTaskModal(false)}
                >
                  取消
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowTaskModal(false)}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 筛选模态框 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">筛选日历事件</h3>
              <button className="text-gray-500" onClick={() => setShowFilterModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">事件类型</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="type-meeting" className="mr-2" checked />
                    <label htmlFor="type-meeting" className="text-sm">会议</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="type-task" className="mr-2" checked />
                    <label htmlFor="type-task" className="text-sm">任务</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="type-reminder" className="mr-2" checked />
                    <label htmlFor="type-reminder" className="text-sm">提醒</label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">项目</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="project-1" className="mr-2" checked />
                    <label htmlFor="project-1" className="text-sm">智能工厂控制系统</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="project-2" className="mr-2" checked />
                    <label htmlFor="project-2" className="text-sm">水处理自动化项目</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="project-3" className="mr-2" checked />
                    <label htmlFor="project-3" className="text-sm">电气自动化设计项目</label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="role-1" className="mr-2" checked />
                    <label htmlFor="role-1" className="text-sm">项目经理</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="role-2" className="mr-2" checked />
                    <label htmlFor="role-2" className="text-sm">需求分析师</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="role-3" className="mr-2" checked />
                    <label htmlFor="role-3" className="text-sm">方案设计师</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="role-4" className="mr-2" checked />
                    <label htmlFor="role-4" className="text-sm">采购经理</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-3 py-1 text-sm text-blue-600"
                >
                  重置
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

export default CalendarView;