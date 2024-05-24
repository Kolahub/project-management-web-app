import { useState } from 'react'

function NewTask({ onAdd , id}) {
const [enteredTask, setEnteredTask] = useState('')
const [err, setErr] = useState(false)

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
    onAdd(enteredTask, id)
    setEnteredTask('')
}

  return (
    <div className="">
            <div>
        <input type="text" placeholder='Add a new Task' value={enteredTask} className={inputStyle} onChange={(e) => handleChange(e)}/>
        <button className='text-stone-700 hover:text-stone-950 ml-3' onClick={handleClick} >Add Task</button>
    </div>
   {err && <p className='text-sm text-red-600'>Please enter a task</p>}
    </div>

  )
}

export default NewTask