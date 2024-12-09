import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Card, Alert } from 'react-bootstrap';
import '../styling/JobRecommendationContent.css';

function JobRecommendationPageContent() {
  const [formData, setFormData] = useState({
    jobDescription: "",
});
  const [jobSearch, setJobSearch] = useState('');
  const [showJobs, setShowJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const sampleJobs = [
    {
      id: 1,
      name: 'Software Engineer',
      skillsGap: 'JavaScript, React',
      matchingScore: 85,
      description: 'Develop and maintain software applications.',
      responsibilities: 'Coding, testing, debugging.',
      skillsRequired: 'JavaScript, React, Node.js',
    },
    {
      id: 2,
      name: 'Data Scientist',
      skillsGap: 'Python, SQL',
      matchingScore: 90,
      description: 'Analyze data to help make business decisions.',
      responsibilities: 'Data cleaning, modeling, and visualization.',
      skillsRequired: 'Python, SQL, Machine Learning',
    },
    {
      id: 3,
      name: 'Product Manager',
      skillsGap: 'Agile, Communication',
      matchingScore: 80,
      description: 'Lead product development and define product strategy.',
      responsibilities: 'Managing cross-functional teams, roadmap planning.',
      skillsRequired: 'Agile, Project Management, Communication',
    },
  ];

  const validateForm = () => {
    if (!jobSearch.trim()) {
      setErrorMessage('Please enter a job title.');
      return false;
    }
    if(!formData.jobDescription){
      setErrorMessage('Please enter a job Description.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setJobs(sampleJobs);
    setShowJobs(true);
  };

  const handleChange = (e) => {
    // const { name, checked } = e.target;
    // setFilters({
    //   ...filters,
    //   [name]: checked,
    // });
    const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
  };

  const handleJobClick = (job) => {
    navigate('/JobDetails', { state: { job } });
  };

  return (
    <div className="job-recommendation-container">
      <div className="search-section">
        <h1>Job Search</h1>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="jobSearch">
            <Form.Label>Search for a job:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job title or keywords"
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
            />
          </Form.Group>
          <br />
          <div className="form-section">
                    {/* <h3>Job Description</h3> */}
                    <Form.Group controlId="formJobDescription">
                        <Form.Label>Describe the job:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter the job description"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

          {/* <h3>Filters</h3>
          <Form.Group>
            <Form.Check 
              type="checkbox"
              label="Full Time"
              name="fullTime"
              checked={filters.fullTime}
              onChange={handleChange}
            />
            <Form.Check 
              type="checkbox"
              label="Part Time"
              name="partTime"
              checked={filters.partTime}
              onChange={handleChange}
            />
            <Form.Check 
              type="checkbox"
              label="Remote"
              name="remote"
              checked={filters.remote}
              onChange={handleChange}
            />
            <Form.Check 
              type="checkbox"
              label="Internship"
              name="internship"
              checked={filters.internship}
              onChange={handleChange}
            />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </div>

      {showJobs && (
        <div className="job-listing-section mt-4">
          <h2>Job Listings</h2>
          {jobs.map((job) => (
            // <Card key={job.id} className="mb-3" onClick={() => handleJobClick(job)}>
            //   <Card.Body>
            //     <Row>
            //       <Col md={4}>
            //         <Card.Title>{job.name}</Card.Title>
            //       </Col>
            //       <Col md={4}>
            //         <Button variant="outline-success">Save Job</Button>
            //       </Col>
            //       <br />
            //       <Col md={4}>
            //         <Button variant="outline-success">Tailor Resume</Button>
            //       </Col>
            //       <Col md={4}>
            //         <p>Skill Gap: {job.skillsGap}</p>
            //         <p>Matching Score: {job.matchingScore}</p>
            //       </Col>
            //     </Row>
            //   </Card.Body>
            // </Card>
              <Card key={job.id} className="mb-3">
  <Card.Body>
    <Row>
      <Col md={4}>
        <Card.Title>{job.name}</Card.Title>
      </Col>
      <Col md={4}>
        {/* Save Job Button */}
        <Button
          variant="outline-success"
          onClick={() => handleJobClick(job)}
        >
          Save Job
        </Button>
      </Col>
      <br />
      <Col md={4}>
        {/* Tailor Resume Button */}
        <Button
          variant="outline-success"
          onClick={() => navigate('/resume-generation', { state: { job } })}
        >
          Tailor Resume
        </Button>
      </Col>
      <Col md={4}>
        <p>Skill Gap: {job.skillsGap}</p>
        <p>Matching Score: {job.matchingScore}</p>
      </Col>
    </Row>
  </Card.Body>
</Card>

          ))}
        </div>
      )}
    </div>
  );
}

export default JobRecommendationPageContent;

// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Card, Alert } from 'react-bootstrap';
// import '../styling/JobRecommendationContent.css'; // Assuming you will create this CSS file

// function JobRecommendationPageContent() {
//   const [jobSearch, setJobSearch] = useState('');
//   const [filters, setFilters] = useState({
//     fullTime: false,
//     partTime: false,
//     remote: false,
//     internship: false,
//   });
//   const [showJobs, setShowJobs] = useState(false);
//   const [jobs, setJobs] = useState([]); // For job listings
//   const [errorMessage, setErrorMessage] = useState('');

//   // Sample job data (for demonstration purposes)
//   const sampleJobs = [
//     { name: 'Software Engineer', skillsGap: 'JavaScript, React', matchingScore: 85 },
//     { name: 'Data Scientist', skillsGap: 'Python, SQL', matchingScore: 90 },
//     { name: 'Product Manager', skillsGap: 'Agile, Communication', matchingScore: 80 },
//   ];

//   const validateForm = () => {
//     if (!jobSearch.trim()) {
//       setErrorMessage('Please enter a job title.');
//       return false;
//     }
//     setErrorMessage('');
//     return true;
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Only proceed if validation passes

//     // Here, you could implement real search logic.
//     // For demo purposes, we'll show the sample jobs when searching.
//     setJobs(sampleJobs);
//     setShowJobs(true);
//   };

//   const handleChange = (e) => {
//     const { name, checked } = e.target;
//     setFilters({
//       ...filters,
//       [name]: checked,
//     });
//   };

//   return (
//     <div className="job-recommendation-container">
//       <div className="search-section">
//         <h1>Job Search</h1>
//         {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//         <Form onSubmit={handleSearch}>
//           <Form.Group controlId="jobSearch">
//             <Form.Label>Search for a job:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter job title or keywords"
//               value={jobSearch}
//               onChange={(e) => setJobSearch(e.target.value)}
//             />
//           </Form.Group>
//           <br />
//           <h3>Filters</h3>
//           <Form.Group>
//             <Form.Check 
//               type="checkbox"
//               label="Full Time"
//               name="fullTime"
//               checked={filters.fullTime}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Part Time"
//               name="partTime"
//               checked={filters.partTime}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Remote"
//               name="remote"
//               checked={filters.remote}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Internship"
//               name="internship"
//               checked={filters.internship}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Search
//           </Button>
//         </Form>
//       </div>

//       {showJobs && (
//         <div className="job-listing-section mt-4">
//           <h2>Job Listings</h2>
//           {jobs.map((job, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Body>
//                 <Row>
//                   <Col md={4}>
//                     <Card.Title>{job.name}</Card.Title>
//                   </Col>
//                   <Col md={4}>
//                     <Button variant="outline-success">Save Job</Button>
//                   </Col>
//                   <Col md={4}>
//                     <p>Skill Gap: {job.skillsGap}</p>
//                     <p>Matching Score: {job.matchingScore}</p>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobRecommendationPageContent;
// //////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Card, Alert } from 'react-bootstrap';
// import '../styling/JobRecommendationContent.css'; // Assuming you will create this CSS file

// function JobRecommendationPageContent() {
//   const [jobSearch, setJobSearch] = useState('');
//   const [filters, setFilters] = useState({
//     fullTime: false,
//     partTime: false,
//     remote: false,
//     internship: false,
//   });
//   const [showJobs, setShowJobs] = useState(false);
//   const [jobs, setJobs] = useState([]); // For job listings
//   const [errorMessage, setErrorMessage] = useState('');

//   // Sample job data (for demonstration purposes)
//   const sampleJobs = [
//     { name: 'Software Engineer', skillsGap: 'JavaScript, React', matchingScore: 85 },
//     { name: 'Data Scientist', skillsGap: 'Python, SQL', matchingScore: 90 },
//     { name: 'Product Manager', skillsGap: 'Agile, Communication', matchingScore: 80 },
//   ];

//   const validateForm = () => {
//     if (!jobSearch.trim() && !Object.values(filters).some(Boolean)) {
//       setErrorMessage('Please enter a job title or select at least one filter.');
//       return false;
//     }
//     setErrorMessage('');
//     return true;
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Only proceed if validation passes

//     // Here, you could implement real search logic.
//     // For demo purposes, we'll show the sample jobs when searching.
//     setJobs(sampleJobs);
//     setShowJobs(true);
//   };

//   const handleChange = (e) => {
//     const { name, checked } = e.target;
//     setFilters({
//       ...filters,
//       [name]: checked,
//     });
//   };

//   return (
//     <div className="job-recommendation-container">
//       <div className="search-section">
//         <h1>Job Search</h1>
//         {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//         <Form onSubmit={handleSearch}>
//           <Form.Group controlId="jobSearch">
//             <Form.Label>Search for a job:</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter job title or keywords"
//               value={jobSearch}
//               onChange={(e) => setJobSearch(e.target.value)}
//             />
//           </Form.Group>
//           <br />
//           <h3>Filters</h3>
//           <Form.Group>
//             <Form.Check 
//               type="checkbox"
//               label="Full Time"
//               name="fullTime"
//               checked={filters.fullTime}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Part Time"
//               name="partTime"
//               checked={filters.partTime}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Remote"
//               name="remote"
//               checked={filters.remote}
//               onChange={handleChange}
//             />
//             <Form.Check 
//               type="checkbox"
//               label="Internship"
//               name="internship"
//               checked={filters.internship}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Search
//           </Button>
//         </Form>
//       </div>

//       {showJobs && (
//         <div className="job-listing-section mt-4">
//           <h2>Job Listings</h2>
//           {jobs.map((job, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Body>
//                 <Row>
//                   <Col md={4}>
//                     <Card.Title>{job.name}</Card.Title>
//                   </Col>
//                   <Col md={4}>
//                     <Button variant="outline-success">Save Job</Button>
//                   </Col>
//                   <Col md={4}>
//                     <p>Skill Gap: {job.skillsGap}</p>
//                     <p>Matching Score: {job.matchingScore}</p>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobRecommendationPageContent;

// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Card } from 'react-bootstrap';
// import '../styling/JobRecommendationContent.css'; // Assuming you will create this CSS file

// function JobRecommendationPageContent() {
//   const [jobSearch, setJobSearch] = useState('');
//   const [filters, setFilters] = useState({
//     fullTime: false,
//     partTime: false,
//     remote: false,
//     internship: false,
//   });
//   const [showJobs, setShowJobs] = useState(false);
//   const [jobs, setJobs] = useState([]); // For job listings

//   // Sample job data (for demonstration purposes)
//   const sampleJobs = [
//     { name: 'Software Engineer', skillsGap: 'JavaScript, React', matchingScore: 85 },
//     { name: 'Data Scientist', skillsGap: 'Python, SQL', matchingScore: 90 },
//     { name: 'Product Manager', skillsGap: 'Agile, Communication', matchingScore: 80 },
//   ];

//   const handleSearch = () => {
//     // Here, you could implement real search logic.
//     // For demo purposes, we'll show the sample jobs when searching.
//     setJobs(sampleJobs);
//     setShowJobs(true);
//   };

//   const handleChange = (e) => {
//     const { name, checked } = e.target;
//     setFilters({
//       ...filters,
//       [name]: checked,
//     });
//   };

//   return (
//     <div className="job-recommendation-container">
//       <div className="search-section">
//         <h1>Job Search</h1>
//         <Form.Group controlId="jobSearch">
//           <Form.Label>Search for a job:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter job title or keywords"
//             value={jobSearch}
//             onChange={(e) => setJobSearch(e.target.value)}
//           />
//         </Form.Group>
//         <br />
//         <h3>Filters</h3>
//         <Form.Group>
//           <Form.Check 
//             type="checkbox"
//             label="Full Time"
//             name="fullTime"
//             checked={filters.fullTime}
//             onChange={handleChange}
//           />
//           <Form.Check 
//             type="checkbox"
//             label="Part Time"
//             name="partTime"
//             checked={filters.partTime}
//             onChange={handleChange}
//           />
//           <Form.Check 
//             type="checkbox"
//             label="Remote"
//             name="remote"
//             checked={filters.remote}
//             onChange={handleChange}
//           />
//           <Form.Check 
//             type="checkbox"
//             label="Internship"
//             name="internship"
//             checked={filters.internship}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Button variant="primary" onClick={handleSearch}>
//           Search
//         </Button>
//       </div>

//       {showJobs && (
//         <div className="job-listing-section mt-4">
//           <h2>Job Listings</h2>
//           {jobs.map((job, index) => (
//             <Card key={index} className="mb-3">
//               <Card.Body>
//                 <Row>
//                   <Col md={4}>
//                     <Card.Title>{job.name}</Card.Title>
//                   </Col>
//                   <Col md={4}>
//                     <Button variant="outline-success">Save Job</Button>
//                   </Col>
//                   <Col md={4}>
//                     <p>Skill Gap: {job.skillsGap}</p>
//                     <p>Matching Score: {job.matchingScore}</p>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobRecommendationPageContent;
