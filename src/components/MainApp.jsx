import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useReducer } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import Profile from './Profile.jsx';
import NewProject from './NewProject.jsx';
import NoProjectSeleted from './NoProjectSeleted.jsx';
import ProjectSidebar from './ProjectSidebar.jsx';
import SelectedProject from './SelectedProject.jsx';
import { ProjectsContext } from '../store/ProjectContext.jsx';

function projectsReducer(state, action) {
  if (action.type === 'UPDATE_PROJECTS') {
    return action.payload;
  }

  if (action.type === 'SELECT_PROJECT') {
    return {
      ...state,
      seletedProjectId: action.payload,
    };
  }

  if (action.type === 'DELETE_SELECT_PROJECT') {
    const updatedProjects = state.projects.filter(project => project.id !== state.seletedProjectId);
    const newState = {
      ...state,
      seletedProjectId: 0,
      projects: updatedProjects,
    };
    return newState;
  }

  if (action.type === 'ADD_PROJECT') {
    const projectId = uuidv4();
    const newProject = {
      ...action.payload,
      id: projectId,
      tasks: [], // Ensure tasks array is initialized
    };
    const newState = {
      ...state,
      seletedProjectId: 0, // Select the newly added project
      projects: [...state.projects, newProject],
    };
    return newState;
  }

  if (action.type === 'CANCEL_ADD_PROJECT') {
    return {
      ...state,
      seletedProjectId: 0,
    };
  }

  if (action.type === 'START_ADD_PROJECT') {
    return {
      ...state,
      seletedProjectId: null,
    };
  }

  if (action.type === 'ADD_TASK') {
    const updatedProjects = state.projects.map(item =>
      item.id === action.payload.id
        ? {
            ...item,
            tasks: [{ text: action.payload.text, id: uuidv4() }, ...item.tasks],
          }
        : item
    );
    return { ...state, projects: updatedProjects };
  }

  if (action.type === 'DELETE_TASK') {
    const updatedProjects = state.projects.map(item =>
      item.id === action.payload.projectId
        ? {
            ...item,
            tasks: item.tasks.filter(task => task.id !== action.payload.task),
          }
        : item
    );
    return { ...state, projects: updatedProjects };
  }

  return state;
}

function MainApp() {
  const auth = getAuth();
  const db = getFirestore();

  const [projectsReducerState, projectsReducerDispatch] = useReducer(projectsReducer, {
    seletedProjectId: 0,
    projects: [],
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      if (user) {
        const userInfoRef = doc(db, 'UserInfo', user.uid);
        const unsubscribeSnapshot = onSnapshot(userInfoRef, snapshot => {
          const userData = snapshot.data();
          if (userData) {
            projectsReducerDispatch({
              type: 'UPDATE_PROJECTS',
              payload: userData.projectsState,
            });
            setLoaded(true);
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
    if (loaded) {
      update(projectsReducerState);
    }
  }, [projectsReducerState]);

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
    projectsReducerDispatch({
      type: 'SELECT_PROJECT',
      payload: id,
    });
  }

  function handleDeleteSelectedProject() {
    projectsReducerDispatch({
      type: 'DELETE_SELECT_PROJECT',
    });
  }

  function handleAddProject(projectData) {
    projectsReducerDispatch({
      type: 'ADD_PROJECT',
      payload: projectData,
    });
  }

  function handleStartAddProject() {
    projectsReducerDispatch({
      type: 'START_ADD_PROJECT',
    });
  }

  function handleCancelAddProject() {
    projectsReducerDispatch({
      type: 'CANCEL_ADD_PROJECT',
    });
  }

  function handleAddTask(text, id) {
    projectsReducerDispatch({
      type: 'ADD_TASK',
      payload: {
        text,
        id,
      },
    });
  }

  function handleDeleteTask(projectId, taskId) {
    projectsReducerDispatch({
      type: 'DELETE_TASK',
      payload: {
        projectId,
        taskId,
      },
    });
  }

  const selectedProject = projectsReducerState.projects.find(
    project => project.id === projectsReducerState.seletedProjectId
  );

  let content = <SelectedProject />;

  if (projectsReducerState.seletedProjectId === null) {
    content = <NewProject />;
  } else if (projectsReducerState.seletedProjectId === 0) {
    content = <NoProjectSeleted />;
  }

  const ctxValue = {
    projects: projectsReducerState.projects,
    project: selectedProject,
    selectedProjectId: projectsReducerState.seletedProjectId,
    startAddProject: handleStartAddProject,
    selectProject: handleSelectProject,
    handleAddProject: handleAddProject,
    handleCancelAddProject: handleCancelAddProject,
    handleDeleteSelectedProject: handleDeleteSelectedProject,
    handleAddTask: handleAddTask,
    handleDeleteTask: handleDeleteTask,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      <div className="px-4 sm:px-0">
        <Profile />
        <main className="h-screen my-8 flex flex-col sm:flex-row sm:gap-8">
          <ProjectSidebar />
          {content}
        </main>
        {!loaded && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex justify-center items-center">
            <div className="w-40 h-40 border-8 border-t-8 border-t-stone-800 border-gray-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </ProjectsContext.Provider>
  );
}

export default MainApp;
