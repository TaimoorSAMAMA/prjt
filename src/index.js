import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GlobalWorkerOptions } from 'pdfjs-dist';
// import { pdfjs } from 'pdfjs-dist';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import ProfilePage from './Pages/ProfilePage';
import ResumeGenerationPage from './Pages/ResumeGenerationPage';
import CoverLetterPage from './Pages/CoverLetterPage';
import JobRecommendationPage from './Pages/JobRecommendationPage';
import CareerPathGuidancePage from './Pages/CareerPathGuidancePage';
import SkillsGapAnalysisPage from './Pages/SkillsGapAnalysisPage';
import JobDetails from './Pages/JobDetails';
import TestPage from './Pages/TestPage'
// import AppFeatures from './components/AppFeatures'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Set the workerSrc to the path of the worker file in pdfjs-dist
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc =  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js`
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`;


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  // {
  //   path: "/features",
  //   element: <AppFeatures />
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/RegisterPage",
    element: <RegisterPage />,
  },
  {
    path: "/DashboardPage",
    element: <DashboardPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/resume-generation",
    element: <ResumeGenerationPage />,
  },
  {
    path: "/cover-letter",
    element: <CoverLetterPage />,
  },
  {
    path: "/job-recommendation",
    element: <JobRecommendationPage />,
  },
  {
    path: "/career-path-guidance",
    element: <CareerPathGuidancePage />,
  }, 
  {
    path: "/skills-gap-analysis",
    element: <SkillsGapAnalysisPage />,
  },
  {
    path: "/JobDetails",
    element: <JobDetails />,
  },
  {
    path: "/test",
    element: <TestPage />,
  }

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

