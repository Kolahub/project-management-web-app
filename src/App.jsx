import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSeleted from "./components/NoProjectSeleted.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [ projectsState, setProjectsState ] = useState({
    seletedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        seletedProjectId: id, 
      }
    });
  }

  function handleDeleteSelectedProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        seletedProjectId: undefined, 
        projects: prevState.projects.filter((project) => project.id !== prevState.seletedProjectId)
      }
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        seletedProjectId: null, 
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        seletedProjectId: undefined, 
      }
    });
  }

  function handleAddProject (projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
          id: projectId
      }
      return {
        ...prevState,
        seletedProjectId: undefined, 
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleAddTask (text) {
    setProjectsState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.seletedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask (id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.seletedProjectId)

  let content = <SelectedProject
   project={selectedProject}
   onDelete ={handleDeleteSelectedProject}
   onAddTask= {handleAddTask}
   onDeleteTask ={handleDeleteTask}
   tasks = {projectsState.tasks}
   />

  if (projectsState.seletedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectsState.seletedProjectId === undefined) {
    content =       <NoProjectSeleted onStartAddProject={handleStartAddProject}/>
  }

  return (
     <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.seletedProjectId}/>
      {content}
     </main>
  );
}

export default App;
