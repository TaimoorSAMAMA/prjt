    import React, { useState } from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import '../styling/Dashboard.css';
    import { Button } from 'react-bootstrap';
    import ProfilePageContent from '../PagesContent/ProfilePageContent';
    import ResumeGenerationPageContent from '../PagesContent/ResumeGenerationPageContent'; 
    import JobRecommendationPageContent from '../PagesContent/JobRecommendationPageContent';
    import CoverLetterPageContent from '../PagesContent/CoverLetterPageContent';
    import { FaUser, FaFileAlt, FaEnvelope, FaBriefcase, FaRoute, FaChartBar } from 'react-icons/fa';

    function Sidebar() {
        const [isSidebarOpen, setSidebarOpen] = useState(false);
        const location = useLocation();
        const navigate = useNavigate();

        const toggleSidebar = () => {
            setSidebarOpen(!isSidebarOpen);
        };

        // Array of paths where <h2> and <p> should be hidden
        const hiddenPaths = ['/profile', '/resume-generation', '/cover-letter', '/job-recommendation', '/career-path-guidance', '/skills-gap-analysis'];

        // Check if the current path is in the array
        const hideHeaderAndParagraph = hiddenPaths.includes(location.pathname);

        const renderContent = () => {
            switch (location.pathname) {
                case '/profile':
                    return (
                        <>
                        {/* <FaUser style={{ marginRight: '10px' }} /> */}
                        <ProfilePageContent />
                        </>
                    );
                case '/resume-generation':
                    return (<>
                    <ResumeGenerationPageContent />
                    </>);
                case '/cover-letter':
                    return(
                        <>
                        <CoverLetterPageContent />
                        </>
                    )
                    // return <div>Your custom content for Cover Letter</div>;
                case '/job-recommendation':
                    return (
                        <>
                        <JobRecommendationPageContent />
                        </>
                    )
                    // return <div>Your custom content for Job Recommendation</div>;
                case '/career-path-guidance':
                    return <div class>Your custom content for Career Path Guidance</div>;
                case '/skills-gap-analysis':
                    return <div>Your custom content for Skills Gap Analysis</div>;
                default:
                    return (
                        <div>
                            <h2>Welcome to GenResume Dashboard</h2>
                            <p>
                                Welcome! Please use the sidebar to navigate through different features.
                                You can generate your resume, create cover letters, get job recommendations, and more.
                            </p>
                        </div>
                    );
            }
        };

        const handleLogout = () => {
            navigate('/LoginPage');
        };
        
        
        return (
            <div className="dashboard">
                {!isSidebarOpen && (
                    <button className="menu-toggle" onClick={toggleSidebar}>
                        ☰
                    </button>
                )}
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                {isSidebarOpen && (
                    <><button className="close-btn" onClick={toggleSidebar}>
                    ✕
                </button>
                
                </>
                    
                    
                )}
                    {!hideHeaderAndParagraph &&  (
                        <>
                            {/* <h2 className="sidebar-title">GenResume</h2> */}
                        </>
                    )}
                    <h2 className="sidebar-title">GenResume</h2>
                    {/* <ul className="sidebar-links">
                        <li>
                            <Link to="/profile">
                                <FaUser style={{ marginRight: '10px' }} />

                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/resume-generation">
                                <FaFileAlt style={{ marginRight: '10px' }} />
                                Resume Generation
                            </Link>
                        </li>
                        <li>
                            <Link to="/cover-letter">
                                <FaEnvelope style={{ marginRight: '10px' }} />
                                Cover Letter
                            </Link>
                        </li>
                        <li>
                            <Link to="/job-recommendation">
                                <FaBriefcase style={{ marginRight: '10px' }} />
                                Job Recommendation
                            </Link>
                        </li>
                        <li>
                            <Link to="/career-path-guidance">
                                <FaRoute style={{ marginRight: '10px' }} />
                                Career Path Guidance
                            </Link>
                        </li>
                        <li>
                            <Link to="/skills-gap-analysis">
                                <FaChartBar style={{ marginRight: '10px' }} />
                                Skills Gap Analysis
                            </Link>
                        </li>
                    </ul> */}
<ul className="sidebar-links">
    <li>
        <Link to="/profile">
            <FaUser /> Profile
        </Link>
    </li>
    <li>
        <Link to="/resume-generation">
            <FaFileAlt /> Resume Generation
        </Link>
    </li>
    <li>
        <Link to="/cover-letter">
            <FaEnvelope /> Cover Letter
        </Link>
    </li>
    <li>
        <Link to="/job-recommendation">
            <FaBriefcase /> Job Recommendation
        </Link>
    </li>
    <li>
        <Link to="/career-path-guidance">
            <FaRoute /> Career Path Guidance
        </Link>
    </li>
    <li>
        <Link to="/skills-gap-analysis">
            <FaChartBar /> Skills Gap Analysis
        </Link>
    </li>
</ul>

                    <Button variant="danger" className="mt-4 w-100" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>

                <div className="main-content">
                    {renderContent()}
                </div>
            </div>  
        );
    }

    export default Sidebar;

