import React from "react";
import NewTask from "./NewTask.jsx";
import delImg from '../assets/archive-fill.svg'

function Tasks({ tasks, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 mb-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="px-4  mt-8 rounded-md bg-stone-100">
          {tasks.map((task, i) => (
            <li key={task.id} className={i !== tasks.length - 1 ? 'flex justify-between border-b-2 border-stone-400 py-3' : 'flex justify-between py-3'}>
              <span>{task.text}</span>
              <button className="text-stone-700  hover:text-red-500" onClick={() => onDelete(task.id)}>
                <img src={delImg} alt="bin svg" className="active:scale-75"/>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tasks;
