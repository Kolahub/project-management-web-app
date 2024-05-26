import { createContext } from 'react';


export const ProjectsContext = createContext({
    projects: [],
    projects: {},
    selectedProjectId: 0,
    startAddProject: () => {},
    selectProject: () => {},
    handleAddProject:() => {},
    handleCancelAddProject: () => {},
    handleDeleteSelectedProject: () => {},
    handleAddTask: () => {},
    handleDeleteTask: () => {}
}
)