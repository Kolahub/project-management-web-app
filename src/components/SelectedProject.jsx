import {useContext} from 'react'
import { ProjectsContext } from '../store/ProjectContext.jsx'
import Tasks from './Tasks.jsx'

function SelectedProject() {
    const { project, handleDeleteSelectedProject } = useContext(ProjectsContext)
    const formattedDate = new Date (project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

  return (
    <div className='sm:w-[35rem] mt-16'>
        <header className='pb-4 mb-4 border-b-2 border-stone-300'>
            <div className="flex items-center justify-between text-stone-600 mb-2">
                <h1>Title: {project.title}</h1>
                <button className='text-stone-600 hover:text-stone-950' onClick={handleDeleteSelectedProject}>Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>Due Date: {formattedDate}</p>
            <p className='text-stone-600 whitespace-pre-wrap'>Description: {project.description}</p>
        </header>
        <Tasks />
    </div>
  )
}

export default SelectedProject