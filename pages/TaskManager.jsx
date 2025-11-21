// import React, { useState, useEffect } from 'react';
// import Button from '../src/components/Button';

// /**
//  * Custom hook for managing tasks with localStorage persistence
//  */
// const useLocalStorageTasks = () => {
//   // Initialize state from localStorage or with empty array
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   // Update localStorage when tasks change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Add a new task
//   const addTask = (text) => {
//     if (text.trim()) {
//       setTasks([
//         ...tasks,
//         {
//           id: Date.now(),
//           text,
//           completed: false,
//           createdAt: new Date().toISOString(),
//         },
//       ]);
//     }
//   };

//   // Toggle task completion status
//   const toggleTask = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return { tasks, addTask, toggleTask, deleteTask };
// };

// /**
//  * TaskManager component for managing tasks
//  */
// const TaskManager = () => {
//   const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
//   const [newTaskText, setNewTaskText] = useState('');
//   const [filter, setFilter] = useState('all');

//   // Filter tasks based on selected filter
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'active') return !task.completed;
//     if (filter === 'completed') return task.completed;
//     return true; // 'all' filter
//   });

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask(newTaskText);
//     setNewTaskText('');
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//       <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

//       {/* Task input form */}
//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newTaskText}
//             onChange={(e) => setNewTaskText(e.target.value)}
//             placeholder="Add a new task..."
//             className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
//           />
//           <Button type="submit" variant="primary">
//             Add Task
//           </Button>
//         </div>
//       </form>

//       {/* Filter buttons */}
//       <div className="flex gap-2 mb-4">
//         <Button
//           variant={filter === 'all' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('all')}
//         >
//           All
//         </Button>
//         <Button
//           variant={filter === 'active' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('active')}
//         >
//           Active
//         </Button>
//         <Button
//           variant={filter === 'completed' ? 'primary' : 'secondary'}
//           size="sm"
//           onClick={() => setFilter('completed')}
//         >
//           Completed
//         </Button>
//       </div>

//       {/* Task list */}
//       <ul className="space-y-2">
//         {filteredTasks.length === 0 ? (
//           <li className="text-gray-500 dark:text-gray-400 text-center py-4">
//             No tasks found
//           </li>
//         ) : (
//           filteredTasks.map((task) => (
//             <li
//               key={task.id}
//               className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleTask(task.id)}
//                   className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <span
//                   className={`${
//                     task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
//                   }`}
//                 >
//                   {task.text}
//                 </span>
//               </div>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 onClick={() => deleteTask(task.id)}
//                 aria-label="Delete task"
//               >
//                 Delete
//               </Button>
//             </li>
//           ))
//         )}
//       </ul>

//       {/* Task stats */}
//       <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
//         <p>
//           {tasks.filter((task) => !task.completed).length} tasks remaining
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TaskManager; 


import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Button from "../src/components/Button";
import Card from "../src/components/Card";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!taskText) return;
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleComplete = (id) =>
    setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const filteredTasks = tasks.filter(t =>
    filter === "All" ? true : filter === "Active" ? !t.completed : t.completed
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="flex gap-2 mb-4">
        {["All","Active","Completed"].map(f => (
          <Button key={f} variant="secondary" onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTasks.map(task => (
          <Card key={task.id} className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />{" "}
              <span className={task.completed ? "line-through" : ""}>{task.text}</span>
            </div>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
