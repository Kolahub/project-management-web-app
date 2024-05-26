import { useState, useContext } from 'react'
import { ProjectsContext } from '../store/ProjectContext.jsx'
function NewTask() {
const [enteredTask, setEnteredTask] = useState('')
const [err, setErr] = useState(false)

const { handleAddTask, selectedProjectId } = useContext(ProjectsContext)
let inputStyle = 'w-64 px-2 py-1 rounded-sm bg-stone-200'
if(err) {
    inputStyle += ' w-64 px-2 py-1 rounded-sm bg-stone-200 border-2 border-red-400'
    setTimeout(() => {
    inputStyle += ''
    }, 3000)
}

function handleChange (e) {
    setEnteredTask(e.target.value)
}

function handleClick () {
    if (enteredTask.trim() === '') {
        setErr(true)
        setTimeout(() => {
            setErr(false)
        }, 3000)
        return
    }
    // console.log(id, '😂👸📚');
    // const id = project.id
    handleAddTask(enteredTask, selectedProjectId)
    setEnteredTask('')
}

  return (
    <div className="">
            <div>
        <input type="text" placeholder='Add a new Task' value={enteredTask} className={inputStyle} onChange={(e) => handleChange(e)}/>
        <button className='text-white px-2 py-1 ml-3 bg-stone-700 hover:bg-stone-900 rounded-sm' onClick={handleClick} >Add Task</button>
    </div>
   {err && <p className='text-sm text-red-600'>Please enter a task</p>}
    </div>

  )
}

export default NewTask