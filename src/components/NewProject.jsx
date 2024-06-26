import { useRef, useContext } from 'react'
import { ProjectsContext } from '../store/ProjectContext.jsx'
import Input from './Input.jsx'
import Modal from './Modal.jsx'

function NewProject() {
  const title = useRef()
  const description = useRef()
  const dueDate = useRef()

  const modal = useRef()

  const { handleAddProject, handleCancelAddProject } = useContext(ProjectsContext)

  function handleSave () {
    const enteredTitle = title.current.value
    const enteredDescription = description.current.value
    const enteredDueDate = dueDate.current.value

    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
      modal.current.open()
      return;
    }

    handleAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      tasks: []
    })
  }

  return (
    <>
    <Modal ref={modal} btnCaption='Close'>
      <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
      <p className='text-stone-600 mb-4'>Oops ... looks you forget to enter a value</p>
      <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
    </Modal>

    <div className='sm:w-[35rem] mt-16 pr-2'>
        <menu className='flex items-center justify-end gap-4 my-4'>
           <li><button className='text-stone-800 hover:text-stone-950' onClick={handleCancelAddProject}>Cancel</button></li>
           <li><button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950' onClick={handleSave}>Save</button></li>
        </menu>
        <div>
            <Input type='text' ref={title} label='Title' />
            <Input ref={description} label='Description' textarea/>
            <Input type='date' ref={dueDate} label='Due Date' />
        </div>
    </div>
    </>
  )
}

export default NewProject