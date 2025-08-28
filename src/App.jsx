import { useState } from 'react'
import './App.css'

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTasks = () => {
    if (!task.trim() !== "") return;

    setTasks([...tasks, task])
    setTask("")
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };


  return (
    <div className='min-h-screen bg-gray-900 flex text-white justify-center p-12'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-18'> Task Manager ✅</h1>

        <div className='flex gap-2 mb-12'>
          <input type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
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
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((t, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
              >
                <span>{t}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-600"
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
