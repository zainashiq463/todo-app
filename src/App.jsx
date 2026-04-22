import { useState } from 'react'
import './App.css'

function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  function addTask(event) {
    event.preventDefault()

    if (taskText.trim() === '') {
      return
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
    setTaskText('')
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }

        return task
      }),
    )
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return task.completed === false
    }

    if (filter === 'done') {
      return task.completed === true
    }

    return true
  })

  const remainingTasks = tasks.filter((task) => task.completed === false).length

  return (
    <div className="app">
      <div className="todo-box">
        <h1>Todo App</h1>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Add a task"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            type="button"
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
            type="button"
          >
            Active
          </button>
          <button
            className={filter === 'done' ? 'active' : ''}
            onClick={() => setFilter('done')}
            type="button"
          >
            Done
          </button>
        </div>

        <p className="task-count">{remainingTasks} tasks remaining</p>

        {filteredTasks.length === 0 ? (
          <p className="empty-message">No tasks to show.</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className="task-item">
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </span>
                </label>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
