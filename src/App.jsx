import { useState, useEffect } from 'react'
import { FaThumbtack } from "react-icons/fa";
import './App.css'

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");



  // Add Task 
  const addTasks = () => {
    const txt = task.trim()
    if (txt === "") return;

    const newTask = {
      id: Date.now(),
      text: txt,
      done: false,
      pinned: false, // reserved for later
    }

    setTasks(prev => [...prev, newTask])
    setTask("")
  }

  // Toggle pin/unpin
  const togglePin = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t)
    );
  };


  // Delete by id
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Toggle done state
  const toggleDone = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  // Optional: press Enter to add (keeps UX snappy)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTasks()
  }

  // Save tasks whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Start editing a task
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited text
  const saveEdit = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, text: editingText } : t)
    );
    setEditingId(null);
    setEditingText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };


  return (
    <div className='min-h-screen bg-gray-900 flex text-white justify-center p-12'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-18'> Task Manager ✅</h1>

        <div className='flex gap-2 mb-12'>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 px-8 py-2 rounded-2xl text-white outline-none bg-gray-700 '
            placeholder='Enter Tasks...'
          />
          <button
            onClick={addTasks}
            className='px-8 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition ease-in'
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3 w-120">
          {tasks.length > 0 ? (
            [...tasks]
              .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1))
              .map((t) => (
                <div key={t.id} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {/* Done toggle button */}
                    <button
                      onClick={() => toggleDone(t.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition ${t.done ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      title={t.done ? "Mark as undone" : "Mark as done"}
                    >
                      {t.done ? '✓' : ''}
                    </button>

                    {/* Either editing input or normal text */}
                    {editingId === t.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1 px-2 py-1 rounded bg-gray-700 text-white outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(t.id)}
                          className="bg-green-600 px-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-600 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => toggleDone(t.id)}
                        className={`break-words cursor-pointer ${t.done ? 'line-through opacity-60' : ''}`}
                      >
                        {t.text}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => togglePin(t.id)}
                    className={`ml-3 text-xl ${t.pinned ? 'text-violet-600 hover:text-violet-800' : 'text-gray-400 hover:text-gray-600'}`}
                    title={t.pinned ? "Unpin" : "Pin"}
                  >
                    <FaThumbtack className={t.pinned ? '' : 'opacity-50'} />
                  </button>




                  {/* Edit + Delete buttons */}
                  {editingId !== t.id && (
                    <button
                      onClick={() => startEdit(t.id, t.text)}
                      className="text-yellow-400 hover:text-yellow-600 ml-3"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400 hover:text-red-600 ml-3"
                  >
                    Delete
                  </button>
                </div>

              ))
          ) : (
            <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default App
