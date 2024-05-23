import React from 'react'
import Tasks from './Tasks.jsx'

function SelectedProject({ project, onDelete, onAddTask, onDeleteTask, tasks }) {
    const formattedDate = new Date (project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
  return (
    <div className='w-[35rem] mt-16'>
        <header className='pb-4 mb-4 border-b-2 border-stone-300'>
            <div className="flex items-center justify-between text-stone-600 mb-2">
                <h1>{project.title}</h1>
                <button className='text-stone-600 hover:text-stone-950' onClick={onDelete}>Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>{formattedDate}</p>
            <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
        </header>
        <Tasks tasks={tasks} onAdd={onAddTask} onDelete={onDeleteTask}/>
    </div>
  )
}

export default SelectedProject