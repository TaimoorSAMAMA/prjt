import React from 'react';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function AppFeatures() {
    return (
        <div className="stylish-section">
            <div className="container content">
                <h2 id="features" className="text-center mb-5">Featured In</h2>
                <ul className="features-list row">
                    {/* Bootstrap column classes for responsive layout */}
                    <li className="feature-item col-md-4 mb-3" id="resume-generation">Resume Generation</li>
                    <li className="feature-item col-md-4 mb-3" id="cover-letter">Cover Letter</li>
                    <li className="feature-item col-md-4 mb-3" id="job-recommendation">Job Recommendation</li>
                    <li className="feature-item col-md-4 mb-3" id="career-guidance">Career Path Guidance</li>
                    <li className="feature-item col-md-4 mb-3" id="skill-gap-analysis">Skill Gap Analysis</li>
                    <li className="feature-item col-md-4 mb-3" id="market-trends">Market Trends</li>
                </ul>
            </div>
        </div>
    );
}

export default AppFeatures;

// import React from 'react';

// function AppFeatures() {
//     return (
//         <div className="stylish-section">
//             <div className="content">
//                 <h2 id="features">Featured In</h2>
//                 <ul className="features-list">
//                     {/* List of Features */}
//                     <li className="feature-item" id="resume-generation">Resume Generation</li>
//                     <li className="feature-item" id="cover-letter">Cover Letter</li>
//                     <li className="feature-item" id="job-recommendation">Job Recommendation</li>
//                     <li className="feature-item" id="career-guidance">Career Path Guidance</li>
//                     <li className="feature-item" id="skill-gap-analysis">Skill Gap Analysis</li>
//                     <li className="feature-item" id="market-trends">Market Trends</li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default AppFeatures;

// import React from 'react';

// function AppFeatures() {
//     return (
//         <div className="stylish-section">
//             <div className="content">
//                 <h2 id="features">Featured In</h2>
//                 <ul className="features-list">
//                     <li className="feature-item" id="resume-generation">Resume Generation</li>
//                     <li className="feature-item" id="cover-letter">Cover Letter</li>
//                     <li className="feature-item" id="job-recommendation">Job Recommendation</li>
//                     <li className="feature-item" id="career-guidance">Career Path Guidance</li>
//                     <li className="feature-item" id="skill-gap-analysis">Skill Gap Analysis</li>
//                     <li className="feature-item" id="market-trends">Market Trends</li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default AppFeatures;
