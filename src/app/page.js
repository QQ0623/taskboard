// ==================== Next.js 基礎知識 ====================
// 'use client' 指令詳解：
// 1. Next.js 的組件類型：
//    - 服務器組件（默認）：在服務器端渲染，不能使用瀏覽器API和React狀態
//    - 客戶端組件：在瀏覽器端運行，可以使用所有React功能
// 2. 'use client' 的作用：
//    - 將組件標記為客戶端組件
//    - 啟用瀏覽器端功能（如useState、useEffect、DOM操作等）
//    - 允許處理用戶交互和事件
'use client';

// ==================== 依賴導入說明 ====================
// 1. next/image：Next.js的圖片優化組件
//    - 自動進行圖片優化和壓縮
//    - 支持響應式圖片
//    - 提供延遲加載功能
import Link from "next/link";

// 2. useState：React的狀態管理Hook
//    - 用於在函數組件中添加狀態管理
//    - 返回一個數組：[當前狀態值, 更新狀態的函數]
//    - 當狀態更新時，組件會重新渲染
import { useState, useEffect, use } from "react";

// 3. TaskList：自定義組件
//    - 負責渲染任務列表
//    - 通過props接收任務數據
import TaskList from "./components/TaskList";

// ==================== 組件定義 ====================
// Home組件：應用的主要頁面組件
// 1. 組件生命週期：
//    - 組件創建時初始化狀態
//    - 根據狀態變化重新渲染
//    - 響應用戶交互更新狀態
export default function Home() {
  // ==================== React狀態管理 ====================
  // 1. 任務列表狀態管理
  //    const [狀態變量, 狀態更新函數] = useState(初始值);
  //    - 狀態變量：保存當前值
  //    - 狀態更新函數：用於修改狀態
  //    - 初始值：狀態的初始值
  const [tasks, setTasks] = useState([]);  // 初始化空數組

  // 2. 輸入框狀態管理
  //    - 這是一個受控組件的例子
  //    - 輸入框的值由React狀態控制
  //    - 當用戶輸入時，通過onChange更新狀態
  const [newTask, setNewTask] = useState('');
  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1); 
  } , []);

  // ==================== 事件處理函數 ====================
  // addTask函數：處理添加新任務的邏輯
  // 1. 函數執行流程：
  //    a) 記錄當前狀態
  //    b) 創建新的任務列表
  //    c) 更新狀態
  //    d) 重置輸入框
  const addTask = () => {
    // 2. 狀態追蹤
    console.log("Before:", tasks);  // 記錄更新前的狀態
    console.log("New Task:", newTask);  // 記錄新任務內容



    // 3. 數組操作（不可變性原則）
    //    [...tasks]：展開運算符
    //    - 創建當前任務列表的副本
    //    - 確保不直接修改原始狀態
    //    - React要求狀態更新必須是不可變的
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };
    const updateTasks = [...tasks, newTaskObj];

    // 4. 狀態更新
    //    setTasks：觸發React重新渲染
    //    - React會比較新舊狀態
    //    - 只更新必要的DOM部分
    setTasks(updateTasks);
    console.log("After:", updateTasks);  // 記錄更新後的狀態

    // 5. 清理工作
    //    - 重置輸入框狀態
    //    - 提供更好的用戶體驗
    setNewTask('');

    setNextId(nextId + 1);
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  };

const handleDelete = (id) => {
    console.log("Before:", tasks); // 記錄刪除前的任務列表狀態
    const index = tasks.findIndex((task) => task.id === id); // 根據任務 ID 找到要刪除的任務的索引
    const updatedTasks = tasks.filter((_, i) => i !== index); // 使用 filter 方法創建一個新的陣列，排除要刪除的任務
    setTasks(updatedTasks); // 更新狀態，觸發重新渲染
    console.log("After:", updatedTasks); // 記錄刪除後的任務列表狀態
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 將更新後的任務列表保存到 localStorage
  };

  // ==================== 組件渲染 ====================
  // 1. JSX語法：
  //    - 類似HTML的JavaScript擴展語法
  //    - 允許在JavaScript中寫UI結構
  //    - 大括號{}中可以寫JavaScript表達式
  return (
    // main 容器，使用 Tailwind CSS 添加內邊距
    <main className="p-4 max-w-md mx-auto">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Task Board</h1>
      {/* 輸入區域容器 */}
      <div className="flex gap-2 mb-4">
        {/* 任務輸入框 */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          // 當輸入內容改變時更新 newTask 狀態
          onChange={(e) => setNewTask(e.target.value)}
        />
        {/* 添加任務按鈕 */}
        <button
          className="bg-blue-500 text-white  px-4"
          onClick={addTask}
        >Add</button>
      </div>
      {/* 顯示任務列表組件，傳入任務數組作為 props */}
      <TaskList tasks={tasks} onDelete={handleDelete}/>
    </main>
  );
}