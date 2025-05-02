// ==================== React 組件基礎 ====================
// TaskList：子組件，專門負責渲染任務列表
// 1. 組件參數：
//    - 使用解構賦值 { tasks } 接收 props
//    - props 是 React 組件間傳遞數據的方式
//    - 單向數據流：父組件傳遞數據給子組件

// ==================== 組件設計理念 ====================
// 1. 單一職責原則：
//    - 僅負責展示任務列表
//    - 不包含業務邏輯
// 2. 可重用性：
//    - 可在不同父組件中使用
//    - 通過 props 接收數據，保持靈活性
export default function TaskList({ tasks }) {
    return (
        // ==================== JSX 結構說明 ====================
        // 1. ul 元素：無序列表
        // 2. Tailwind CSS 類名解析：
        //    - space-y-2：設置子元素之間的垂直間距為 8px (2 * 0.25rem)
        <ul className="space-y-2">
            {/* ==================== 數組渲染 ==================== */}
            {/* 1. Array.map() 方法：
                   - 遍歷 tasks 數組中的每個任務
                   - 返回新的 JSX 元素數組
                2. 參數說明：
                   - task：當前任務內容
                   - index：當前索引，用於 key prop */}
            {tasks.map((task, index) => (
                // ==================== 列表項渲染 ====================
                // 1. key prop：
                //    - React 需要 key 來追蹤列表項
                //    - 幫助高效更新 DOM
                //    - 生產環境應使用唯一 ID，而不是索引
                // 2. Tailwind CSS 類名解析：
                //    - border：添加 1px 邊框
                //    - p-2：內邊距 8px (2 * 0.25rem)
                //    - rounded：圓角邊框 (border-radius: 0.25rem)
                <li
                    key={index}
                    className="border p-2 rounded"
                >
                    {/* 3. 內容渲染：
                           - 直接顯示任務文本
                           - 使用 {} 在 JSX 中嵌入 JavaScript 表達式 */}
                    {task}
                </li>
            ))}
        </ul>
    );
}