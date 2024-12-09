import React from 'react';
import '../styling/Dashboard.css'; 
import Sidebar from '../components/Sidebar';

function Dashboard() {
    return (
        <Sidebar />    
    );
}

export default Dashboard;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import '../styling/Dashboard.css';

// function DashboardPage() {
//     const location = useLocation();

//     // Render different content for each route
//     const renderContent = () => {
//         switch (location.pathname) {
//             case '/profile':
//                 return <div>Your custom content for Profile page</div>;
//             case '/resume-generation':
//                 return <div>Your custom content for Resume Generation</div>;
//             case '/cover-letter':
//                 return <div>Your custom content for Cover Letter</div>;
//             case '/job-recommendation':
//                 return <div>Your custom content for Job Recommendation</div>;
//             case '/career-path-guidance':
//                 return <div>Your custom content for Career Path Guidance</div>;
//             case '/skills-gap-analysis':
//                 return <div>Your custom content for Skills Gap Analysis</div>;
//             default:
//                 // return <div>Welcome to GenResume Dashboard! Please select an option from the sidebar.</div>;
//         }
//     };

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <div className="main-content">
//                 {renderContent()}
//             </div>
//         </div>
//     );
// }

// export default DashboardPage;

