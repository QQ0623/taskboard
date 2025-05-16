'use client'; // 這個標記告訴 Next.js 這是一個客戶端組件，可以使用瀏覽器的 API 和 React hooks
import { useEffect,useState } from "react";// 導入 useState 和 useEffect Hook，用於狀態管理和副作用處理

export default function TodosPage() {
    const [todos, setTodos] = useState([]); // 創建一個空陣列來儲存所有的任務項目
    const [newTodo, setNewTodo] = useState('');// 創建一個空字串來儲存用戶正在輸入的新任務
    const [loading, setLoading] = useState(true); // 創建一個布林值來表示是否正在加載任務列表
    useEffect(() => {
        async function fetchTodos() {
            try{
                const res = await fetch(
                    'https://jsonplaceholder.typicode.com/todos?_limit=20'); // 使用 fetch API 獲取任務列表，限制為 20 條
                console.log(res);
                if (!res.ok) {
                    throw new Error('Failed to fetch'); // 如果響應不成功，則拋出錯誤
                }
                await new Promise((resolve) => setTimeout(resolve, 3000)); // 模擬延遲 1 秒
                const data = await res.json(); // 將響應轉換為 JSON 格式
                setTodos(data); // 將獲取的任務設置到 todos 狀態中
            }catch (err) {console.log(err.message)}finally{setLoading(false)}
        }
        fetchTodos(); // 調用 fetchTodos 函數以獲取任務列表
    }, [])

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Todos</h1>

            {loading && <p>loading...</p>} {/* 如果正在加載，則顯示 loading 提示 */}
            {!loading && (
            <ul className="space-y-2">
                {todos.map((todos)=>(
                    <li key={todos.id} className="border p-2 rounded">
                        <h2 className="font-semibold">
                            {todos.title} {todos.completed ? 'Done' : ''}
                        </h2>
                    </li>
                ))}
            </ul>
        )}
        </main>
    );
}