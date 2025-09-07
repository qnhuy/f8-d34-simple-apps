let uniqId = 0

function TodoList() {
    const [inputValue, setInputValue] = React.useState('')
    let [tasks, setTasks] = React.useState([])

    function handleAddTask() {
        if (inputValue.trim()) {
            const newTask = { id: ++uniqId, content: inputValue, completed: false }
            setTasks([...tasks, newTask])
        }
        // reset input value after add task
        setInputValue('')
    }

    function handleInputOnchange(e) {
        setInputValue(e.target.value)
    }

    function handleMarkTask(taskId) {
        setTasks(prev => prev.map(task => (
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )))
    }

    function handleDeleteTask(taskId) {
        if (confirm(`Are you sure to delete task ${tasks.find(task => task.id === taskId).content}?`)) {
            tasks = tasks.filter(task => task.id !== taskId)
            setTasks(tasks)
        }
    }

    return (
        <div className='wrapper'>
            <div className="header">
                <h2 className="header-content">Todo List</h2>
                <i className="header-icon fa-solid fa-book"></i>
            </div>

            <div className="task-statuses">
                <div className="task-status task-total">
                    <i className="task-status__icon fa-solid fa-circle-dot"></i>
                    <p className="task-status__content">Total: </p>
                    <p className="task-number">{tasks.length}</p>
                </div>
                <div className="task-status task-completed">
                    <i className="task-status__icon fa-solid fa-circle-check"></i>
                    <p className="task-status__content">Complete: </p>
                    <p className="task-number">{tasks.filter(task => task.completed).length}</p>
                </div>
                <div className="task-status task-uncompleted">
                    <i className="task-status__icon fa-solid fa-circle-minus"></i>
                    <p className="task-status__content">Uncomplete: </p>
                    <p className="task-number">{tasks.filter(task => !task.completed).length}</p>
                </div>
            </div>

            <div className="add-task">
                <input type="text" className="task-input" placeholder="Add your task!"
                    value={inputValue}
                    onChange={handleInputOnchange}
                />
                <button className="submit-btn"
                    onClick={handleAddTask}
                    onKeyDown={e => e.key === 'Enter' ? handleAddTask : null}
                >
                    Add
                </button>
            </div>

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input type="checkbox" className="task-checkbox"
                            checked={task.completed}
                            onChange={() => handleMarkTask(task.id)}
                        />
                        <p className="task-content">{task.content}</p>
                        <i className="task-delete fa-solid fa-xmark" onClick={() => handleDeleteTask(task.id)}></i>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const app = <>
    <TodoList />
</>

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(app)