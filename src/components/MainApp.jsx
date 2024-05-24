import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import Profile from './Profile.jsx';
import NewProject from './NewProject.jsx';
import NoProjectSeleted from './NoProjectSeleted.jsx';
import ProjectSidebar from './ProjectSidebar.jsx';
import SelectedProject from './SelectedProject.jsx';

function MainApp() {
  const auth = getAuth();
  const db = getFirestore();

  const [projectsState, setProjectsState] = useState({
    seletedProjectId: 0,
    projects: [],
    tasks: [],
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        const userInfoRef = doc(db, 'UserInfo', user.uid);
        const unsubscribeSnapshot = onSnapshot(userInfoRef, snapshot => {
          const userData = snapshot.data();
          if (userData) {
            setProjectsState(userData.projectsState);
          }
        });
        return unsubscribeSnapshot;
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, [auth, db]);

  useEffect(() => {
    if (projectsState.seletedProjectId !== 0) {
      update(projectsState);
    }
  }, [projectsState]);

  async function update(obj) {
    const user = auth.currentUser;
    if (user) {
      const userInfoRef = doc(db, 'UserInfo', user.uid);
      await updateDoc(userInfoRef, {
        projectsState: obj,
      });
    }
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => ({
      ...prevState,
      seletedProjectId: id,
    }));
  }

  function handleDeleteSelectedProject() {
    setProjectsState(prevState => {
      const updatedProjects = prevState.projects.filter(project => project.id !== prevState.seletedProjectId);
      const newState = {
        ...prevState,
        seletedProjectId: 0,
        projects: updatedProjects,
      };

      update(newState);
      return newState;
    });
  }

  function handleAddProject(projectData) {
    const projectId = uuidv4();
    const newProject = {
      ...projectData,
      id: projectId,
      tasks: [], // Ensure tasks array is initialized
    };
  
    setProjectsState(prevState => {
      const newState = {
        ...prevState,
        seletedProjectId: 0, // Select the newly added project
        projects: [...prevState.projects, newProject],
      };
  
      // Update the database with the new state
      update(newState);
      return newState;
    });
  }
  

  function handleStartAddProject() {
    setProjectsState(prevState => ({
      ...prevState,
      seletedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => ({
      ...prevState,
      seletedProjectId: 0,
    }));
  }


  function handleAddTask(text, id) {
    setProjectsState(prevState => {
      const updatedProjects = prevState.projects.map(item => (item.id === id ? { ...item, tasks: [{ text, id: uuidv4() }, ...item.tasks] } : item));
      return { ...prevState, projects: updatedProjects };
    });
  }

  function handleDeleteTask(projectId, taskId) {
    setProjectsState(prevState => {
      const updatedProjects = prevState.projects.map(item => (item.id === projectId ? { ...item, tasks: item.tasks.filter(task => task.id !== taskId) } : item));
      return { ...prevState, projects: updatedProjects };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.seletedProjectId);

  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteSelectedProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} selectedProjectId={projectsState.seletedProjectId} />
  );

  if (projectsState.seletedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.seletedProjectId === 0) {
    content = <NoProjectSeleted onStartAddProject={handleStartAddProject} />;
  }

  return (
    <div className='px-4 sm:px-0'>
      <Profile />
      <main className="h-screen my-8 flex flex-col sm:flex-row sm:gap-8">
        <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.seletedProjectId} />
        {content}
      </main>
    </div>
  );
}

export default MainApp;
