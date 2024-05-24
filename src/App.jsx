import { useState } from "react";
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import MainApp from "./components/MainApp.jsx";
// import NewProject from "./components/NewProject.jsx";
// import NoProjectSeleted from "./components/NoProjectSeleted.jsx";
// import ProjectSidebar from "./components/ProjectSidebar.jsx";
// import SelectedProject from "./components/SelectedProject.jsx";


const router = createBrowserRouter([
  {path: '/', element: <LandingPage />},
  {path: '/signup', element: <Signup />},
  {path: '/login', element: <Login />},
  { path: '/dashboard', element: <MainApp />},
  // { path: '/products', element: <Products /> }
]);

function App() {

  return (
    <>
<RouterProvider router={router} />
    {/* <Signup /> */}
    {/* <Login /> */}
    </>
    //  <main className="h-screen my-8 flex gap-8">
    //   <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.seletedProjectId}/>
    //   {content}
    //  </main>
  );
}

export default App;
