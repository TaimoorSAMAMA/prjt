// Work experience and Projects working properly
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; //, Col, Row
import FileDataExtractionPage from '../Pages/FileDataExtractionPage';
import '../styling/ProfileContent.css';

function ProfileContent() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
        education: [{ degree: '', institution: '', graduationYear: '' }],
        skills: '',
        certifications: '',
        achievements: '',
        languages: '',
        projects: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // const addEntry = (type) => {
    //     const newEntry = type === 'workExperience'
    //         ? { jobTitle: '', company: '', date: '', responsibilities: '' }
    //         : { degree: '', institution: '', graduationYear: '' };

    //     setFormData({
    //         ...formData,
    //         [type]: [...formData[type], newEntry],
    //     });
    // };

    // const handleArrayChange = (index, e, type) => {
    //     const { name, value } = e.target;

    //     const newArray = [...formData[type]];
    //     newArray[index][name] = value;
    
    //     setFormData({
    //         ...formData,
    //         [type]: newArray,
    //     });
    // };

    // Function to validate the form
    const validateForm = () => {
        if (!formData.projects) {
            setErrorMessage('Please fill out the Projects/Portfolio field.');
            return false;
        }
        if (!formData.workExperience) {
            setErrorMessage('Please fill out the Work Experience field.');
            return false;
        }
        return true;
    };
    useEffect(() => {
        // console.log('Languages updated:', formData.languages); // Confirm `languages` update
    }, [formData.languages]);
    const handleDataExtraction = (extractedData) => {
        console.log('Extracted Data:', extractedData);
        // console.log('certificates', formData.certifications)
        
        // Merge extracted data into formData
        setFormData((prevData) => ({
            ...prevData,
            ...extractedData, // This should populate both `projects` and `workExperience`
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Languages field before submit:', formData.languages);
        if (!validateForm()) {
            return;
        }

        try {
            const submitData = new FormData();
            submitData.append('skills', formData.skills);
            submitData.append('education', formData.education);
            submitData.append('Professional Projects', formData.Professionalprojects); // Use extracted projects
            submitData.append('workExperience', formData.workExperience); // Add work experience
            submitData.append('Languages', formData.Languages);
            // submitData.append('Certificates', formData.certifications);

            // console.log('Languages found', formData.languages)
            
            const response = await fetch('http://localhost:5000/api/profiles', {
                method: 'POST',
                body: submitData,
            });

            const data = await response.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setErrorMessage('Failed to submit profile: ' + error.message);
        }
    };

    return (
        <div className="profile-form-container">
            {!submitted ? (
                <Form onSubmit={handleSubmit}>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <h1>Profile Creation</h1>
                    <FileDataExtractionPage onExtract={handleDataExtraction} />
                    <div className="form-section">
                        <h3>Contact Information</h3>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label className='mt-2'>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className='mt-2'>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    {/* Work Experience, Education, Skills, Projects, languages, achievements */}
                    {/* <div className="form-section">
                        <h3 className='mt-3'>Work Experience</h3>
                        {formData.workExperience.map((work, index) => (
                            <Row key={index}>
                                <Col>
                                    <Form.Group controlId={`formJobTitle${index}`}>
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control
                                            className='mb-2'
                                            type="text"
                                            placeholder="Enter job title"
                                            name="jobTitle"
                                            value={work.jobTitle}
                                            onChange={(e) => handleArrayChange(index, e, 'workExperience')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`formCompany${index}`}>
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter company name"
                                            name="company"
                                            value={work.company}
                                            onChange={(e) => handleArrayChange(index, e, 'workExperience')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`formDate${index}`}>
                                        <Form.Label>Dates</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g., 01/2020 - 03/2022"
                                            name="date"
                                            value={work.date}
                                            onChange={(e) => handleArrayChange(index, e, 'workExperience')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`formResponsibilities${index}`}>
                                        <Form.Label>Responsibilities</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder="Enter responsibilities"
                                            name="responsibilities"
                                            value={work.responsibilities}
                                            onChange={(e) => handleArrayChange(index, e, 'workExperience')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Button variant="outline-secondary" onClick={() => addEntry('workExperience')} className='mt-4'>
                                    Add Work Experience
                                </Button>
                            </Row>
                        ))}
                    </div> */}

                    {/* <div className="form-section">
                        <h3 className='mt-3'>Education</h3>
                        {formData.education.map((edu, index) => (
                            <Row key={index}>
                                <Col>
                                    <Form.Group controlId={`formDegree${index}`}>
                                        <Form.Label>Degree</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter degree"
                                            name="degree"
                                            value={edu.degree}
                                            onChange={(e) => handleArrayChange(index, e, 'education')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`formInstitution${index}`}>
                                        <Form.Label>Institution</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter institution"
                                            name="institution"
                                            value={edu.institution}
                                            onChange={(e) => handleArrayChange(index, e, 'education')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId={`formGraduationYear${index}`}>
                                        <Form.Label>Graduation Year</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter graduation year"
                                            name="graduationYear"
                                            value={edu.graduationYear}
                                            onChange={(e) => handleArrayChange(index, e, 'education')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Button variant="outline-secondary" onClick={() => addEntry('education')} className='mt-4'>
                                    Add Education
                                </Button>
                            </Row>
                        ))}
                    </div> */}
                    {/* <div className="form-section">
                    <Form.Group controlId="formlanguages">
                    <Form.Label>Languages</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter languages you speak"
                        name="languages"
                        value={formData.languages} // Should reflect extracted `languages` data
                        onChange={handleChange}
                    />
                    </Form.Group>
                    </div> */}

                    <div className="form-section">
                    <Form.Group controlId="formLanguages">
                    <Form.Label>Languages</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter languages you speak"
                        name="languages"
                        value={formData.Languages} // Should reflect extracted `languages` data
                        onChange={handleChange}
                    />
                    </Form.Group>
                    </div>


                        <div className="form-section">
                            <Form.Group controlId="formEducation">
                                <Form.Label>Education</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter your education background"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
            
                    <div className="form-section">
                        <Form.Group controlId="formSkills">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="form-section">
                        <Form.Group controlId="formCertifications">
                            <Form.Label>Certifications</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your certifications"
                                name="certifications"
                                value={formData.Certifications}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    <div className="form-section">
                        <Form.Group controlId="formAchievements">
                            <Form.Label>Achievements/Awards</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your achievements"
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>


                    <div className="form-section">
                        <Form.Group controlId="formProjects">
                            <Form.Label>Projects/Portfolio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your projects or portfolio links"
                                name="projects"
                                value={formData.projects}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>

                    {/* <div className="form-section">
                        <Form.Group controlId="formProjects">
                            <Form.Label>Projects/Portfolio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your projects or portfolio links"
                                name="projects"
                                value={formData.projects}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div> */}

                    <div className="form-section">
                        <Form.Group controlId="formWorkExperience">
                            <Form.Label>Work Experience</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your work experience"
                                name="workExperience" // Match the state field
                                value={formData.workExperience}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    

                    <Button variant="primary" type="submit" className="mt-4">
                        Submit Profile
                    </Button>
                </Form>
            ) : (
                <div>
                    <h1>Profile Submitted Successfully!</h1>
                    <h3>Profile Data:</h3>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ProfileContent;

///////////////////////////////////////////////////////////////////////////////////////////////////
// snb sahi ha is my
// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import FileDataExtractionPage from '../Pages/FileDataExtractionPage';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         projects: '',
//         workExperience: '',
//     });
//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }
//         if (!formData.workExperience) {
//             setErrorMessage('Please fill out the Work Experience field.');
//             return false;
//         }
//         return true;
//     };

//     // Function to handle data extraction from PDF
//     const handleDataExtraction = (extractedData) => {
//         // Merge extracted data into formData
//         setFormData((prevData) => ({
//             ...prevData,
//             ...extractedData,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const submitData = new FormData();
//             submitData.append('Professional Projects', formData.projects); // Use extracted projects
//             submitData.append('workExperience', formData.workExperience);

//             const response = await fetch('http://localhost:5000/api/profiles', {
//                 method: 'POST',
//                 body: submitData,  // No need to stringify, since FormData handles this
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setSubmitted(true);
//             } else {
//                 throw new Error(data.message);
//             }
//         } catch (error) {
//             setErrorMessage('Failed to submit profile: ' + error.message);
//         }
//     };

//     return (
//         <div className="profile-form-container">
//             {!submitted ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                     <h1>Profile Creation</h1>
//                     <FileDataExtractionPage onExtract={handleDataExtraction} />
//                     <div className="form-section">
//                         <Form.Group controlId="formProjects">
//                             <Form.Label>Projects/Portfolio</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your projects or portfolio links"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//     <Form.Group controlId="formWorkExperience">
//         <Form.Label>Work Experience</Form.Label>
//         <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter your work experience"
//             name="workExperience"
//             value={formData.workExperience}
//             onChange={handleChange}
//         />
//     </Form.Group>
// </div>


//                     <Button variant="primary" type="submit" className="mt-4">
//                         Submit Profile
//                     </Button>
//                 </Form>
//             ) : (
//                 <div>
//                     <h1>Profile Submitted Successfully!</h1>
//                     <h3>Profile Data:</h3>
//                     <pre>{JSON.stringify(formData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import FileDataExtractionPage from '../Pages/FileDataExtractionPage';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         projects: '',
//     });

//     const [errorMessage, setErrorMessage] = useState(''); 

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle form submission
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     if (!validateForm()) {
//     //         return;
//     //     }

//     //     // try {
//     //     //     const response = await fetch('http://localhost:5000/api/profiles', {
//     //     //         method: 'POST',
//     //     //         headers: {
//     //     //             'Content-Type': 'application/json',
//     //     //         },
//     //     //         body: JSON.stringify(formData)
//     //     //     });
//     //     //     const data = await response.json();
//     //     //     if (data.success) {
//     //     //         setSubmitted(true);
//     //     //     } else {
//     //     //         throw new Error(data.message);
//     //     //     }
//     //     // } catch (error) {
//     //     //     setErrorMessage('Failed to submit profile: ' + error.message);
//     //     // }
//     //     try {
//     //         const formData = new FormData();
//     //         formData.append('name', formData.name);
//     //         formData.append('phone', formData.phone);
//     //         formData.append('email', formData.email);
            
//     //         // Add more fields as needed
        
//     //         const response = await fetch('http://localhost:5000/api/profiles', {
//     //             method: 'POST',
//     //             body: formData,  // No need to stringify, since FormData handles this
//     //         });
        
//     //         const data = await response.json();
//     //         if (data.success) {
//     //             setSubmitted(true);
//     //         } else {
//     //             throw new Error(data.message);
//     //         }
//     //     } catch (error) {
//     //         setErrorMessage('Failed to submit profile: ' + error.message);
//     //     }
        
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
    
//         try {
//             const submitData = new FormData();  // Use a different name than formData
//             submitData.append('Professional Projects', formData.projects);  // Add projects or other fields as needed
    
//             const response = await fetch('http://localhost:5000/api/profiles', {
//                 method: 'POST',
//                 body: submitData,  // No need to stringify, since FormData handles this
//             });
    
//             const data = await response.json();
//             if (data.success) {
//                 setSubmitted(true);
//             } else {
//                 throw new Error(data.message);
//             }
//         } catch (error) {
//             setErrorMessage('Failed to submit profile: ' + error.message);
//         }
//     };
    
//     // Function to validate the form
//     const validateForm = () => {
//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }

//         return true;
//     };

//     // Function to handle data extraction from PDF
//     const handleDataExtraction = (extractedData) => {
//         // Merge extracted data into formData
//         setFormData((prevData) => ({
//             ...prevData,
//             ...extractedData,
//         }));
//     };

//     return (
//         <div className="profile-form-container">
//             {!submitted ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                     <h1>Profile Creation</h1>
//                     <FileDataExtractionPage onExtract={handleDataExtraction} />
//                     <div className="form-section">
//                         <Form.Group controlId="formProjects">
//                             <Form.Label>Projects/Portfolio</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your projects or portfolio links"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>


//                     <Button variant="primary" type="submit" className="mt-4">
//                         Submit Profile
//                     </Button>
//                 </Form>
//             ) : (
//                 <div>
//                     <h1>Profile Submitted Successfully!</h1>
//                     <h3>Profile Data:</h3>
//                     <pre>{JSON.stringify(formData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;

// import React, { useState } from 'react';
// import { Form, Button,  Alert } from 'react-bootstrap'; // Col, Row,
// import FileDataExtractionPage from '../Pages/FileDataExtractionPage';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     // const handleArrayChange = (index, e, type) => {
//     //     const { name, value } = e.target;

//     //     const newArray = [...formData[type]];
//     //     newArray[index][name] = value;

//     //     setFormData({
//     //         ...formData,
//     //         [type]: newArray,
//     //     });
//     // };

//     // Add new Work Experience or Education entry
//     // const addEntry = (type) => {
//     //     const newEntry = type === 'workExperience'
//     //         ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//     //         : { degree: '', institution: '', graduationYear: '' };

//     //     setFormData({
//     //         ...formData,
//     //         [type]: [...formData[type], newEntry],
//     //     });
//     // };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5000/api/profiles', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const data = await response.json();
//             if (data.success) {
//                 console.log('Profile saved:', data.profile);
//                 setDisplayData(data.profile);
//                 setSubmitted(true);
//             } else {
//                 throw new Error(data.message);
//             }
//         } catch (error) {
//             setErrorMessage('Failed to submit profile: ' + error.message);
//         }
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//             setErrorMessage('Please enter a valid phone number (11 digits).');
//             return false;
//         }

//         return true; // Form is valid
//     };

//     // Function to handle data extraction from PDF
//     const handleDataExtraction = (extractedData) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             ...extractedData,
//         }));
//     };

//     return (
//         <div className="profile-form-container">
//             {/* PDF Data Extraction Component */}
            

//             {/* Form to collect data */}
//             {!submitted ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Error message display */}
//                     <h1>Profile Creation</h1><FileDataExtractionPage onExtract={handleDataExtraction} />
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPhone">
//                             <Form.Label className='mt-2'>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label className='mt-2'>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>
//                     {/* Work Experience, Education, Skills, Projects, languages, achievements */}


//                     <Button variant="primary" type="submit" className="mt-4">
//                         Submit Profile
//                     </Button>
//                 </Form>
//             ) : (
//                 <div>
//                     <h1>Profile Submitted Successfully!</h1>
//                     <h3>Profile Data:</h3>
//                     <pre>{JSON.stringify(displayData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;
//////////////////////////////////////////////////////////////////////////////////
//  Sb sahi chl rha hai idhr
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
// import FileDataExtractionPage from '../Pages/FileDataExtractionPage';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;

//         const newArray = [...formData[type]];
//         newArray[index][name] = value;

//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5000/api/profiles', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });
//             const data = await response.json();
//             if (data.success) {
//                 console.log('Profile saved:', data.profile);
//                 setDisplayData(data.profile);
//                 setSubmitted(true);
//             } else {
//                 throw new Error(data.message);
//             }
//         } catch (error) {
//             setErrorMessage('Failed to submit profile: ' + error.message);
//         }
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//             setErrorMessage('Please enter a valid phone number (11 digits).');
//             return false;
//         }

//         // Check if any work experience or education entries are empty
//         for (const work of formData.workExperience) {
//             if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//                 setErrorMessage('Please fill out all fields in Work Experience.');
//                 return false;
//             }

//             // Validate Date format for Work Experience
//             const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//             if (!datePattern.test(work.date)) {
//                 setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//                 return false;
//             }

//             // Split the date range and validate start and end dates
//             const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//             const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//             const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//             // Check if end date is earlier than start date
//             if (endDate < startDate) {
//                 setErrorMessage('End date cannot be earlier than start date.');
//                 return false;
//             }
//         }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }

//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }

//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }

//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }

//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }

//         return true; // Form is valid
//     };

//     // Function to handle data extraction from PDF
//     const handleDataExtraction = (extractedData) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             ...extractedData,
//         }));
//     };

//     return (
//         <div className="profile-form-container">
//             {/* PDF Data Extraction Component */}
            

//             {/* Form to collect data */}
//             {!submitted ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Error message display */}
//                     <h1>Profile Creation</h1><FileDataExtractionPage onExtract={handleDataExtraction} />
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPhone">
//                             <Form.Label className='mt-2'>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label className='mt-2'>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>
//                     {/* Work Experience, Education, Skills, Projects, languages, achievements */}
//                     <div className="form-section">
//                         <h3 className='mt-3'>Work Experience</h3>
//                         {formData.workExperience.map((work, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formJobTitle${index}`}>
//                                         <Form.Label>Job Title</Form.Label>
//                                         <Form.Control
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter job title"
//                                             name="jobTitle"
//                                             value={work.jobTitle}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formCompany${index}`}>
//                                         <Form.Label>Company</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter company name"
//                                             name="company"
//                                             value={work.company}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formDate${index}`}>
//                                         <Form.Label>Dates</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 01/2020 - 03/2022"
//                                             name="date"
//                                             value={work.date}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formResponsibilities${index}`}>
//                                         <Form.Label>Responsibilities</Form.Label>
//                                         <Form.Control
//                                             as="textarea"
//                                             rows={2}
//                                             placeholder="Enter responsibilities"
//                                             name="responsibilities"
//                                             value={work.responsibilities}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Button variant="outline-secondary" onClick={() => addEntry('workExperience')} className='mt-4'>
//                                     Add Work Experience
//                                 </Button>
//                             </Row>
//                         ))}
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Education</h3>
//                         {formData.education.map((edu, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formDegree${index}`}>
//                                         <Form.Label>Degree</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter degree"
//                                             name="degree"
//                                             value={edu.degree}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formInstitution${index}`}>
//                                         <Form.Label>Institution</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter institution"
//                                             name="institution"
//                                             value={edu.institution}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formGraduationYear${index}`}>
//                                         <Form.Label>Graduation Year</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter graduation year"
//                                             name="graduationYear"
//                                             value={edu.graduationYear}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Button variant="outline-secondary" onClick={() => addEntry('education')} className='mt-4'>
//                                     Add Education
//                                 </Button>
//                             </Row>
//                         ))}
//                     </div>

//                     <div className="form-section">
//                         <Form.Group controlId="formSkills">
//                             <Form.Label>Skills</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your skills"
//                                 name="skills"
//                                 value={formData.skills}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <Form.Group controlId="formCertifications">
//                             <Form.Label>Certifications</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your certifications"
//                                 name="certifications"
//                                 value={formData.certifications}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <Form.Group controlId="formAchievements">
//                             <Form.Label>Achievements/Awards</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your achievements"
//                                 name="achievements"
//                                 value={formData.achievements}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <Form.Group controlId="formLanguages">
//                             <Form.Label>Languages</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter languages you speak"
//                                 name="languages"
//                                 value={formData.languages}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <Form.Group controlId="formProjects">
//                             <Form.Label>Projects/Portfolio</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your projects or portfolio links"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>


//                     <Button variant="primary" type="submit" className="mt-4">
//                         Submit Profile
//                     </Button>
//                 </Form>
//             ) : (
//                 <div>
//                     <h1>Profile Submitted Successfully!</h1>
//                     <h3>Profile Data:</h3>
//                     <pre>{JSON.stringify(displayData, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
// import '../styling/ProfileContent.css'

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     // const [editing, setEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;

//         const newArray = [...formData[type]];
//         newArray[index][name] = value;

//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
    
//         try {
//             const response = await fetch('http://localhost:5000/api/profiles', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
                
//             });
//             const data = await response.json();
//             if (data.success) {
//                 console.log('Profile saved:', data.profile);
//                 setDisplayData(data.profile);
//                 setSubmitted(true);
//             } else {
//                 throw new Error(data.message);
                
//             }
//         } catch (error) {
//             setErrorMessage('Failed to submit profile: ' + error.message);
//         }
//     };
//         // const handleEdit = () => {
//         //              setEditing(true); // Enable editing mode
//         //     };
//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//             setErrorMessage('Please enter a valid phone number (11 digits).');
//             return false;
//         }

//         // Check if any work experience or education entries are empty
//         for (const work of formData.workExperience) {
//             if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//                 setErrorMessage('Please fill out all fields in Work Experience.');
//                 return false;
//             }

//             // Validate Date format for Work Experience
//             const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//             if (!datePattern.test(work.date)) {
//                 setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//                 return false;
//             }

//             // Split the date range and validate start and end dates
//             const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//             const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//             const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//             // Check if end date is earlier than start date
//             if (endDate < startDate) {
//                 setErrorMessage('End date cannot be earlier than start date.');
//                 return false;
//             }
//         }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }

//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }

//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }

//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }

//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }

//         // Additional checks can be added as needed

//         return true; // Form is valid
//     };

//     return (
        
//         <div className="profile-form-container">
//             {/* Form to collect data */}
//             {!submitted ? ( // || editing
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Error message display */}
//                     <h1>Profile Creation</h1>
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPhone">
//                             <Form.Label className='mt-2'>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label className='mt-2'>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Work Experience</h3>
//                         {formData.workExperience.map((work, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formJobTitle${index}`}>
//                                         <Form.Label>Job Title</Form.Label>
//                                         <Form.Control 
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter job title"
//                                             name="jobTitle"
//                                             value={work.jobTitle}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formCompany${index}`}>
//                                         <Form.Label>Company</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter company name"
//                                             name="company"
//                                             value={work.company}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formDate${index}`}>
//                                         <Form.Label>Dates</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 01/2020 - 03/2022"
//                                             name="date"
//                                             value={work.date}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formResponsibilities${index}`}>
//                                         <Form.Label>Responsibilities</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter responsibilities"
//                                             name="responsibilities"
//                                             value={work.responsibilities}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Education</h3>
//                         {formData.education.map((edu, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formDegree${index}`}>
//                                         <Form.Label>Degree</Form.Label>
//                                         <Form.Control
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter degree"
//                                             name="degree"
//                                             value={edu.degree}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formInstitution${index}`}>
//                                         <Form.Label>Institution</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter institution name"
//                                             name="institution"
//                                             value={edu.institution}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formGraduationYear${index}`}>
//                                         <Form.Label>Graduation Year</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter graduation year"
//                                             name="graduationYear"
//                                             value={edu.graduationYear}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                     </div>

                    // <div className="form-section">
                    //     <h3 className='mt-3'>Skills</h3>
                    //     <Form.Group controlId="formSkills">
                    //         <Form.Control
                    //             as="textarea"
                    //             rows={3}
                    //             placeholder="List your skills"
                    //             name="skills"
                    //             value={formData.skills}
                    //             onChange={handleChange}
                    //         />
                    //     </Form.Group>
                    // </div>

                    // <div className="form-section">
                    //     <h3 className='mt-3'>Certifications</h3>
                    //     <Form.Group controlId="formCertifications">
                    //         <Form.Control
                    //             as="textarea"
                    //             rows={3}
                    //             placeholder="List your certifications"
                    //             name="certifications"
                    //             value={formData.certifications}
                    //             onChange={handleChange}
                    //         />
                    //     </Form.Group>
                    // </div>

                    // <div className="form-section">
                    //     <h3 className='mt-3'>Achievements</h3>
                    //     <Form.Group controlId="formAchievements">
                    //         <Form.Control
                    //             as="textarea"
                    //             rows={3}
                    //             placeholder="List your achievements"
                    //             name="achievements"
                    //             value={formData.achievements}
                    //             onChange={handleChange}
                    //         />
                    //     </Form.Group>
                    // </div>

                    // <div className="form-section">
                    //     <h3 className='mt-3'>Projects</h3>
                    //     <Form.Group controlId="formProjects">
                    //         <Form.Control
                    //             as="textarea"
                    //             rows={3}
                    //             placeholder="List your projects"
                    //             name="projects"
                    //             value={formData.projects}
                    //             onChange={handleChange}
                    //         />
                    //     </Form.Group>
                    // </div>
                    // <div className="form-section">
                    //     <h3 className='mt-3'>Languages</h3>
                    //     <Form.Group controlId="formLanguages">
                    //         <Form.Control
                    //             as="textarea"
                    //             rows={3}
                    //             placeholder="List languages you speak"
                    //             name="languages"
                    //             value={formData.languages}
                    //             onChange={handleChange}
                    //         />
                    //     </Form.Group>
                    // </div>

                    

//                     <Button variant="primary" type="submit">Submit</Button>
//            {/* <Button variant="primary" className="mt-3" type="submit">
//                      {editing ? 'Update Profile' : 'Submit'}
//                  </Button> */}
//                 </Form>
//             ) : (
//                 <div className="display-data">
//                     <h2>Submitted Information</h2>
                    
//                     {/* Contact Information */}
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <p><strong>Name:</strong> {displayData.name}</p>
//                         <p><strong>Phone:</strong> {displayData.phone}</p>
//                         <p><strong>Email:</strong> {displayData.email}</p>
//                     </div>

//                     {/* Work Experience */}
//                     <div className="form-section">
//                         <h3>Work Experience</h3>
//                         {displayData.workExperience.map((work, index) => (
//                             <div key={index}>
//                                 <p><strong>Job Title:</strong> {work.jobTitle}</p>
//                                 <p><strong>Company:</strong> {work.company}</p>
//                                 <p><strong>Dates:</strong> {work.date}</p>
//                                 <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Education */}
//                     <div className="form-section">
//                         <h3>Education</h3>
//                         {displayData.education.map((edu, index) => (
//                             <div key={index}>
//                                 <p><strong>Degree:</strong> {edu.degree}</p>
//                                 <p><strong>Institution:</strong> {edu.institution}</p>
//                                 <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Skills */}
//                     <div className="form-section">
//                         <h3>Skills</h3>
//                         <p>{displayData.skills}</p>
//                     </div>

//                     {/* Certifications */}
//                     <div className="form-section">
//                         <h3>Certifications</h3>
//                         <p>{displayData.certifications}</p>
//                     </div>

//                     {/* Achievements */}
//                     <div className="form-section">
//                         <h3>Achievements</h3>
//                         <p>{displayData.achievements}</p>
//                     </div>

//                     {/* Languages */}
//                     <div className="form-section">
//                         <h3>Languages</h3>
//                         <p>{displayData.languages}</p>
//                     </div>

//                     {/* Projects */}
//                     <div className="form-section">
//                         <h3>Projects</h3>
//                         <p>{displayData.projects}</p>
//                     </div>

//                     {/* Edit Button */}
//                     <Button variant="secondary" onClick={() => {
                        
//                         setSubmitted(false);
//                         setFormData(displayData); // Populate the form with existing data
//                     }}>
//                         Edit
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // ProfileContent.js

// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
// import '../styling/ProfileContent.css'

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     // const [editing, setEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;

//         const newArray = [...formData[type]];
//         newArray[index][name] = value;

//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validation
//         const isFormValid = validateForm();
//         if (!isFormValid) {
//             return; // Stop the submission if validation fails
//         }

//         // Handle form submission (e.g., send data to server or API)
//         console.log('Submitted Data:', formData);
//         setDisplayData(formData);  // Set the display data to the submitted form data
//         // Clear error message on successful submission
//         setErrorMessage('');
//         setSubmitted(true);
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//             setErrorMessage('Please enter a valid phone number (11 digits).');
//             return false;
//         }

//         // Check if any work experience or education entries are empty
//         for (const work of formData.workExperience) {
//             if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//                 setErrorMessage('Please fill out all fields in Work Experience.');
//                 return false;
//             }

//             // Validate Date format for Work Experience
//             const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//             if (!datePattern.test(work.date)) {
//                 setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//                 return false;
//             }

//             // Split the date range and validate start and end dates
//             const [startDateStr, endDateStr] = work.date.split(' - ');
//             const startDate = new Date(`${startDateStr}/01`);
//             const endDate = new Date(`${endDateStr}/01`);
//             // Check if end date is earlier than start date
//             if (endDate < startDate) {
//                 setErrorMessage('End date cannot be earlier than start date.');
//                 return false;
//             }
//         }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/;
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }

//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }

//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }

//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }

//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }

        

//         return true;
//     };

//     return (
//         <div className="profile-form-container">
            
//             {!submitted ? ( // || editing
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                     <h1>Profile Creation</h1>
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPhone">
//                             <Form.Label className='mt-2'>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label className='mt-2'>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Work Experience</h3>
//                         {formData.workExperience.map((work, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formJobTitle${index}`}>
//                                         <Form.Label>Job Title</Form.Label>
//                                         <Form.Control 
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter job title"
//                                             name="jobTitle"
//                                             value={work.jobTitle}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formCompany${index}`}>
//                                         <Form.Label>Company</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter company name"
//                                             name="company"
//                                             value={work.company}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formDate${index}`}>
//                                         <Form.Label>Dates</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 01/2020 - 03/2022"
//                                             name="date"
//                                             value={work.date}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formResponsibilities${index}`}>
//                                         <Form.Label>Responsibilities</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter responsibilities"
//                                             name="responsibilities"
//                                             value={work.responsibilities}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Education</h3>
//                         {formData.education.map((edu, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formDegree${index}`}>
//                                         <Form.Label>Degree</Form.Label>
//                                         <Form.Control
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter degree"
//                                             name="degree"
//                                             value={edu.degree}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formInstitution${index}`}>
//                                         <Form.Label>Institution</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter institution name"
//                                             name="institution"
//                                             value={edu.institution}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formGraduationYear${index}`}>
//                                         <Form.Label>Graduation Year</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter graduation year"
//                                             name="graduationYear"
//                                             value={edu.graduationYear}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Skills</h3>
//                         <Form.Group controlId="formSkills">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your skills"
//                                 name="skills"
//                                 value={formData.skills}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Certifications</h3>
//                         <Form.Group controlId="formCertifications">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your certifications"
//                                 name="certifications"
//                                 value={formData.certifications}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Achievements</h3>
//                         <Form.Group controlId="formAchievements">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your achievements"
//                                 name="achievements"
//                                 value={formData.achievements}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>
                    
//                     <div className="form-section">
//                         <h3 className='mt-3'>Projects</h3>
//                         <Form.Group controlId="formProjects">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your projects"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Languages</h3>
//                         <Form.Group controlId="formLanguages">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List languages you speak"
//                                 name="languages"
//                                 value={formData.languages}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

                    

//                     <Button variant="primary" type="submit">Submit</Button>
//            {/* <Button variant="primary" className="mt-3" type="submit">
//                      {editing ? 'Update Profile' : 'Submit'}
//                  </Button> */}
//                 </Form>
//             ) : (
//                 <div className="display-data">
//                     <h2>Submitted Information</h2>
                    
//                     {/* Contact Information */}
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <p><strong>Name:</strong> {displayData.name}</p>
//                         <p><strong>Phone:</strong> {displayData.phone}</p>
//                         <p><strong>Email:</strong> {displayData.email}</p>
//                     </div>

//                     {/* Work Experience */}
//                     <div className="form-section">
//                         <h3>Work Experience</h3>
//                         {displayData.workExperience.map((work, index) => (
//                             <div key={index}>
//                                 <p><strong>Job Title:</strong> {work.jobTitle}</p>
//                                 <p><strong>Company:</strong> {work.company}</p>
//                                 <p><strong>Dates:</strong> {work.date}</p>
//                                 <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Education */}
//                     <div className="form-section">
//                         <h3>Education</h3>
//                         {displayData.education.map((edu, index) => (
//                             <div key={index}>
//                                 <p><strong>Degree:</strong> {edu.degree}</p>
//                                 <p><strong>Institution:</strong> {edu.institution}</p>
//                                 <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Skills */}
//                     <div className="form-section">
//                         <h3>Skills</h3>
//                         <p>{displayData.skills}</p>
//                     </div>

//                     {/* Certifications */}
//                     <div className="form-section">
//                         <h3>Certifications</h3>
//                         <p>{displayData.certifications}</p>
//                     </div>

//                     {/* Achievements */}
//                     <div className="form-section">
//                         <h3>Achievements</h3>
//                         <p>{displayData.achievements}</p>
//                     </div>

//                     {/* Languages */}
//                     <div className="form-section">
//                         <h3>Languages</h3>
//                         <p>{displayData.languages}</p>
//                     </div>

//                     {/* Projects */}
//                     <div className="form-section">
//                         <h3>Projects</h3>
//                         <p>{displayData.projects}</p>
//                     </div>

//                     {/* Edit Button */}
//                     <Button variant="secondary" onClick={() => {
                        
//                         setSubmitted(false);
//                         setFormData(displayData); // Populate the form with existing data
//                     }}>
//                         Edit
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
// import '../styling/ProfileContent.css'

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;

//         const newArray = [...formData[type]];
//         newArray[index][name] = value;

//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validation
//         const isFormValid = validateForm();
//         if (!isFormValid) {
//             return; // Stop the submission if validation fails
//         }

//         // Handle form submission (e.g., send data to server or API)
//         console.log('Submitted Data:', formData);
//         setDisplayData(formData);  // Set the display data to the submitted form data
//         // Clear error message on successful submission
//         setErrorMessage('');
//         setSubmitted(true);
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//             setErrorMessage('Please enter a valid phone number (11 digits).');
//             return false;
//         }

//         // Check if any work experience or education entries are empty
//         for (const work of formData.workExperience) {
//             if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//                 setErrorMessage('Please fill out all fields in Work Experience.');
//                 return false;
//             }

//             // Validate Date format for Work Experience
//             const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//             if (!datePattern.test(work.date)) {
//                 setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//                 return false;
//             }

//             // Split the date range and validate start and end dates
//             const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//             const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//             const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//             // Check if end date is earlier than start date
//             if (endDate < startDate) {
//                 setErrorMessage('End date cannot be earlier than start date.');
//                 return false;
//             }
//         }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }

//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }

//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }

//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }

//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }

//         // Additional checks can be added as needed

//         return true; // Form is valid
//     };

//     return (
//         <div className="profile-form-container">
//             {/* Form to collect data */}
//             {!submitted ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Error message display */}
                    
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPhone">
//                             <Form.Label className='mt-2'>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label className='mt-2'>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Work Experience</h3>
//                         {formData.workExperience.map((work, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formJobTitle${index}`}>
//                                         <Form.Label>Job Title</Form.Label>
//                                         <Form.Control 
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter job title"
//                                             name="jobTitle"
//                                             value={work.jobTitle}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formCompany${index}`}>
//                                         <Form.Label>Company</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter company name"
//                                             name="company"
//                                             value={work.company}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formDate${index}`}>
//                                         <Form.Label>Dates</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 01/2020 - 03/2022"
//                                             name="date"
//                                             value={work.date}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formResponsibilities${index}`}>
//                                         <Form.Label>Responsibilities</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter responsibilities"
//                                             name="responsibilities"
//                                             value={work.responsibilities}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
                        
//                         <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Education</h3>
//                         {formData.education.map((edu, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formDegree${index}`}>
//                                         <Form.Label>Degree</Form.Label>
//                                         <Form.Control
//                                             className='mb-2'
//                                             type="text"
//                                             placeholder="Enter degree"
//                                             name="degree"
//                                             value={edu.degree}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formInstitution${index}`}>
//                                         <Form.Label>Institution</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter institution name"
//                                             name="institution"
//                                             value={edu.institution}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col>
//                                     <Form.Group controlId={`formGraduationYear${index}`}>
//                                         <Form.Label>Graduation Year</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter graduation year"
//                                             name="graduationYear"
//                                             value={edu.graduationYear}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Skills</h3>
//                         <Form.Group controlId="formSkills">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your skills"
//                                 name="skills"
//                                 value={formData.skills}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Certifications</h3>
//                         <Form.Group controlId="formCertifications">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your certifications"
//                                 name="certifications"
//                                 value={formData.certifications}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Achievements</h3>
//                         <Form.Group controlId="formAchievements">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your achievements"
//                                 name="achievements"
//                                 value={formData.achievements}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Languages</h3>
//                         <Form.Group controlId="formLanguages">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List languages you speak"
//                                 name="languages"
//                                 value={formData.languages}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section">
//                         <h3 className='mt-3'>Projects</h3>
//                         <Form.Group controlId="formProjects">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="List your projects"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <Button variant="primary" type="submit">Submit</Button>
//                 </Form>
//             ) : (
//                 <div className="display-data">
//                     <h2>Submitted Information</h2>
                    
//                     {/* Contact Information */}
//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <p><strong>Name:</strong> {displayData.name}</p>
//                         <p><strong>Phone:</strong> {displayData.phone}</p>
//                         <p><strong>Email:</strong> {displayData.email}</p>
//                     </div>

//                     {/* Work Experience */}
//                     <div className="form-section">
//                         <h3>Work Experience</h3>
//                         {displayData.workExperience.map((work, index) => (
//                             <div key={index}>
//                                 <p><strong>Job Title:</strong> {work.jobTitle}</p>
//                                 <p><strong>Company:</strong> {work.company}</p>
//                                 <p><strong>Dates:</strong> {work.date}</p>
//                                 <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Education */}
//                     <div className="form-section">
//                         <h3>Education</h3>
//                         {displayData.education.map((edu, index) => (
//                             <div key={index}>
//                                 <p><strong>Degree:</strong> {edu.degree}</p>
//                                 <p><strong>Institution:</strong> {edu.institution}</p>
//                                 <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Skills */}
//                     <div className="form-section">
//                         <h3>Skills</h3>
//                         <p>{displayData.skills}</p>
//                     </div>

//                     {/* Certifications */}
//                     <div className="form-section">
//                         <h3>Certifications</h3>
//                         <p>{displayData.certifications}</p>
//                     </div>

//                     {/* Achievements */}
//                     <div className="form-section">
//                         <h3>Achievements</h3>
//                         <p>{displayData.achievements}</p>
//                     </div>

//                     {/* Languages */}
//                     <div className="form-section">
//                         <h3>Languages</h3>
//                         <p>{displayData.languages}</p>
//                     </div>

//                     {/* Projects */}
//                     <div className="form-section">
//                         <h3>Projects</h3>
//                         <p>{displayData.projects}</p>
//                     </div>

//                     {/* Edit Button */}
//                     <Button variant="secondary" onClick={() => {
//                         setSubmitted(false);
//                         setFormData(displayData); // Populate the form with existing data
//                     }}>
//                         Edit
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProfileContent;

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  Sb sahi chal rha hai + kuch or chezain add kre ahin
//////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert, Card } from 'react-bootstrap';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false); // Track if the profile is submitted
//     const [editing, setEditing] = useState(false); // Track if user is in editing mode
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null); // To hold the submitted data for display
//     const [errorMessage, setErrorMessage] = useState(''); // Error message state

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle array input changes (for work experience and education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;
//         const newArray = [...formData[type]];
//         newArray[index][name] = value;
//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate form before submission
//         if (!validateForm()) {
//             return; // Stop the submission if validation fails
//         }

//         if (editing) {
//             // If editing, update the display data with the modified form data
//             setDisplayData(formData);
//             setEditing(false); // Exit editing mode
//         } else {
//             // If creating new, show the data and mark as submitted
//             setDisplayData(formData);
//             setSubmitted(true);
//         }

//         setErrorMessage(''); // Clear any error messages
//     };

//     // Handle clicking the Edit button
//     // const handleEdit = () => {
//     //     setEditing(true); // Enable editing mode
//     // };

//     // Function to validate the form (simplified version for this example)
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();

//     //     // Validate form before submission
//     //     if (!validateForm()) {
//     //         return; // Stop the submission if validation fails
//     //     }

//     //     if (editing) {
//     //         // If editing, update the display data with the modified form data
//     //         setDisplayData(formData);
//     //         setEditing(false); // Exit editing mode
//     //     } else {
//     //         // If creating new, show the data and mark as submitted
//     //         setDisplayData(formData);
//     //         setSubmitted(true);
//     //     }

//     //     setErrorMessage(''); // Clear any error messages
//     // };

//     // Handle clicking the Edit button
//     const handleEdit = () => {
//         setEditing(true); // Enable editing mode
//     };


//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//         setErrorMessage('Please enter a valid phone number (11 digits).');
//         return false;
//         }

//         // Check if any work experience or education entries are empty
// for (const work of formData.workExperience) {
//     if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//         setErrorMessage('Please fill out all fields in Work Experience.');
//         return false;
//     }

//     // Validate Date format for Work Experience
//     const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//     if (!datePattern.test(work.date)) {
//         setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//         return false;
//     }

//     // Split the date range and validate start and end dates
//     const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//     const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//     const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//     // Check if end date is earlier than start date
//     if (endDate < startDate) {
//         console.log("Start Date:", startDate);
//         console.log("End Date:", endDate);
//         setErrorMessage('End date cannot be earlier than start date.');
//         return false;
//     }
// }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }
    
//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }
    
//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }
    
//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }
    
//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }
    
//         // Additional checks can be added as needed

//         return true; // Form is valid
//     };
//     return (
//         <div className="profile-form-container">
//             {/* Show the profile data if submitted and not editing */}
//             {submitted && !editing && displayData && (
//                 <Card className="mb-4">
//                     <Card.Header><h3>User Profile</h3></Card.Header>
//                     <Card.Body>
//                         <p><strong>Name:</strong> {displayData.name}</p>
//                         <p><strong>Phone:</strong> {displayData.phone}</p>
//                         <p><strong>Email:</strong> {displayData.email}</p>
                        
//                         {/* Display Work Experience */}
//                         <h5>Work Experience</h5>
//                         {displayData.workExperience.map((work, index) => (
//                             <div key={index}>
//                                 <p><strong>Job Title:</strong> {work.jobTitle}</p>
//                                 <p><strong>Company:</strong> {work.company}</p>
//                                 <p><strong>Dates:</strong> {work.date}</p>
//                                 <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
//                             </div>
//                         ))}

//                         {/* Display Education */}
//                         <h5>Education</h5>
//                         {displayData.education.map((edu, index) => (
//                             <div key={index}>
//                                 <p><strong>Degree:</strong> {edu.degree}</p>
//                                 <p><strong>Institution:</strong> {edu.institution}</p>
//                                 <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
//                             </div>
//                         ))}

//                         {/* Display Skills */}
//                         <p><strong>Skills:</strong> {displayData.skills}</p>
//                         {/* Display Certifications */}
//                         <p><strong>Certifications:</strong> {displayData.certifications}</p>
//                         {/* Display Achievements */}
//                         <p><strong>Achievements:</strong> {displayData.achievements}</p>
//                         {/* Display Languages */}
//                         <p><strong>Languages:</strong> {displayData.languages}</p>
//                         {/* Display Projects */}
//                         <p><strong>Projects:</strong> {displayData.projects}</p>

//                         <Button variant="primary" onClick={handleEdit}>Edit</Button>
//                     </Card.Body>
//                 </Card>
//             )}

//             {/* Show the form only if not submitted or in editing mode */}
//             {!submitted || editing ? (
//                 <Form onSubmit={handleSubmit}>
//                     {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Show error messages */}

//                     <div className="form-section">
//                         <h3>Contact Information</h3>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formPhone" className="mt-2">
//                             <Form.Label>Phone Number</Form.Label>
//                             <Form.Control
//                                 type="tel"
//                                 placeholder="Enter your phone number"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formEmail" className="mt-2">
//                             <Form.Label>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Work Experience</h3>
//                         {formData.workExperience.map((work, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formJobTitle${index}`}>
//                                         <Form.Label>Job Title</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter job title"
//                                             name="jobTitle"
//                                             value={work.jobTitle}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>

//                                 <Col>
//                                     <Form.Group controlId={`formCompany${index}`}>
//                                         <Form.Label>Company</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter company name"
//                                             name="company"
//                                             value={work.company}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>

//                                 <Col>
//                                     <Form.Group controlId={`formDate${index}`}>
//                                         <Form.Label>Dates</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 01/2020 - 03/2022"
//                                             name="date"
//                                             value={work.date}
//                                             onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}

//                         <Form.Group controlId={`formResponsibilities`}>
//                             <Form.Label>Responsibilities</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your responsibilities"
//                                 name="responsibilities"
//                                 value={formData.workExperience[0].responsibilities}
//                                 onChange={(e) => handleArrayChange(0, e, 'workExperience')}
//                             />
//                         </Form.Group>

//                         <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Education</h3>
//                         {formData.education.map((edu, index) => (
//                             <Row key={index}>
//                                 <Col>
//                                     <Form.Group controlId={`formDegree${index}`}>
//                                         <Form.Label>Degree</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter degree"
//                                             name="degree"
//                                             value={edu.degree}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>

//                                 <Col>
//                                     <Form.Group controlId={`formInstitution${index}`}>
//                                         <Form.Label>Institution</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Enter institution name"
//                                             name="institution"
//                                             value={edu.institution}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>

//                                 <Col>
//                                     <Form.Group controlId={`formGraduationYear${index}`}>
//                                         <Form.Label>Graduation Year</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g., 2022"
//                                             name="graduationYear"
//                                             value={edu.graduationYear}
//                                             onChange={(e) => handleArrayChange(index, e, 'education')}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
//                         ))}
//                         <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Skills</h3>
//                         <Form.Group controlId="formSkills">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your skills"
//                                 name="skills"
//                                 value={formData.skills}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Certifications</h3>
//                         <Form.Group controlId="formCertifications">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your certifications"
//                                 name="certifications"
//                                 value={formData.certifications}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Achievements</h3>
//                         <Form.Group controlId="formAchievements">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter your achievements"
//                                 name="achievements"
//                                 value={formData.achievements}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Languages</h3>
//                         <Form.Group controlId="formLanguages">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter languages you speak"
//                                 name="languages"
//                                 value={formData.languages}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <div className="form-section mt-3">
//                         <h3>Projects</h3>
//                         <Form.Group controlId="formProjects">
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter details about your projects"
//                                 name="projects"
//                                 value={formData.projects}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </div>

//                     <Button variant="primary" className="mt-3" type="submit">
//                         {editing ? 'Update Profile' : 'Submit'}
//                     </Button>
//                 </Form>
//             ) : null}
//         </div>
//     );
// }

// export default ProfileContent;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Sb sahi chal rha haa
///////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert, Card } from 'react-bootstrap';
// import '../styling/ProfileContent.css';

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false); // To track if profile is submitted
//     const [editing, setEditing] = useState(false); // To track if user is in editing mode
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [displayData, setDisplayData] = useState(null); // To hold the submitted data for display
//     const [errorMessage, setErrorMessage] = useState(''); // Error message state

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle array input changes (for work experience and education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;
//         const newArray = [...formData[type]];
//         newArray[index][name] = value;
//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate form before submission
//         if (!validateForm()) {
//             return; // Stop the submission if validation fails
//         }

//         if (editing) {
//             // If editing, update the display data with the modified form data
//             setDisplayData(formData);
//             setEditing(false); // Exit editing mode
//         } else {
//             // If creating new, show the data and mark as submitted
//             setDisplayData(formData);
//             setSubmitted(true);
//         }

//         setErrorMessage(''); // Clear any error messages
//     };

//     // Handle clicking the Edit button
//     const handleEdit = () => {
//         setEditing(true); // Enable editing mode
//     };


//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//         setErrorMessage('Please enter a valid phone number (11 digits).');
//         return false;
//         }

//         // Check if any work experience or education entries are empty
// for (const work of formData.workExperience) {
//     if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//         setErrorMessage('Please fill out all fields in Work Experience.');
//         return false;
//     }

//     // Validate Date format for Work Experience
//     const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//     if (!datePattern.test(work.date)) {
//         setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//         return false;
//     }

//     // Split the date range and validate start and end dates
//     const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//     const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//     const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//     // Check if end date is earlier than start date
//     if (endDate < startDate) {
//         console.log("Start Date:", startDate);
//         console.log("End Date:", endDate);
//         setErrorMessage('End date cannot be earlier than start date.');
//         return false;
//     }
// }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }
    
//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }
    
//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }
    
//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }
    
//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }
    
//         // Additional checks can be added as needed

//         return true; // Form is valid
//     };


//     return (
//         <div className="profile-form-container">
//             {/* Show the profile data if submitted and not editing */}
//             {submitted && !editing && displayData && (
//                 <Card className="mb-4">
//                     <Card.Header><h3>User Profile</h3></Card.Header>
//                     <Card.Body>
//                         <p><strong>Name:</strong> {displayData.name}</p>
//                         <p><strong>Phone:</strong> {displayData.phone}</p>
//                         <p><strong>Email:</strong> {displayData.email}</p>
                        
//                         {/* Display Work Experience */}
//                         <h5>Work Experience</h5>
//                         {displayData.workExperience.map((work, index) => (
//                             <div key={index}>
//                                 <p><strong>Job Title:</strong> {work.jobTitle}</p>
//                                 <p><strong>Company:</strong> {work.company}</p>
//                                 <p><strong>Dates:</strong> {work.date}</p>
//                                 <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
//                             </div>
//                         ))}

//                         {/* Display Education */}
//                         <h5>Education</h5>
//                         {displayData.education.map((edu, index) => (
//                             <div key={index}>
//                                 <p><strong>Degree:</strong> {edu.degree}</p>
//                                 <p><strong>Institution:</strong> {edu.institution}</p>
//                                 <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
//                             </div>
//                         ))}

//                         {/* Display Skills */}
//                         <p><strong>Skills:</strong> {displayData.skills}</p>
//                         {/* Display Certifications */}
//                         <p><strong>Certifications:</strong> {displayData.certifications}</p>
//                         {/* Display Achievements */}
//                         <p><strong>Achievements:</strong> {displayData.achievements}</p>
//                         {/* Display Languages */}
//                         <p><strong>Languages:</strong> {displayData.languages}</p>
//                         {/* Display Projects */}
//                         <p><strong>Projects:</strong> {displayData.projects}</p>

//                         <Button variant="primary" onClick={handleEdit}>Edit</Button>
//                     </Card.Body>
//                 </Card>
//             )}

//             {/* Show the form */}
//             <Form onSubmit={handleSubmit}>
//                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Show error messages */}

//                 <div className="form-section">
//                     <h3>Contact Information</h3>
//                     <Form.Group controlId="formName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter your name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="formPhone" className="mt-2">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="tel"
//                             placeholder="Enter your phone number"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>

//                     <Form.Group controlId="formEmail" className="mt-2">
//                         <Form.Label>Email Address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter your email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Work Experience</h3>
//                     {formData.workExperience.map((work, index) => (
//                         <Row key={index}>
//                             <Col>
//                                 <Form.Group controlId={`formJobTitle${index}`}>
//                                     <Form.Label>Job Title</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter job title"
//                                         name="jobTitle"
//                                         value={work.jobTitle}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col>
//                                 <Form.Group controlId={`formCompany${index}`}>
//                                     <Form.Label>Company</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter company name"
//                                         name="company"
//                                         value={work.company}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col>
//                                 <Form.Group controlId={`formDate${index}`}>
//                                     <Form.Label>Dates</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="e.g., 01/2020 - 03/2022"
//                                         name="date"
//                                         value={work.date}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col>
//                                 <Form.Group controlId={`formResponsibilities${index}`}>
//                                     <Form.Label>Responsibilities</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter responsibilities"
//                                         name="responsibilities"
//                                         value={work.responsibilities}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                     ))}
//                     <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Education</h3>
//                     {formData.education.map((edu, index) => (
//                         <Row key={index}>
//                             <Col>
//                                 <Form.Group controlId={`formDegree${index}`}>
//                                     <Form.Label>Degree</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter your degree"
//                                         name="degree"
//                                         value={edu.degree}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col>
//                                 <Form.Group controlId={`formInstitution${index}`}>
//                                     <Form.Label>Institution</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter institution name"
//                                         name="institution"
//                                         value={edu.institution}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>

//                             <Col>
//                                 <Form.Group controlId={`formGraduationYear${index}`}>
//                                     <Form.Label>Graduation Year</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="e.g., 2022"
//                                         name="graduationYear"
//                                         value={edu.graduationYear}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                     ))}
//                     <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Skills</h3>
//                     <Form.Group controlId="formSkills">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter your skills"
//                             name="skills"
//                             value={formData.skills}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Certifications</h3>
//                     <Form.Group controlId="formCertifications">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter your certifications"
//                             name="certifications"
//                             value={formData.certifications}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Achievements</h3>
//                     <Form.Group controlId="formAchievements">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter your achievements"
//                             name="achievements"
//                             value={formData.achievements}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Languages</h3>
//                     <Form.Group controlId="formLanguages">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter languages you speak"
//                             name="languages"
//                             value={formData.languages}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section mt-3">
//                     <h3>Projects</h3>
//                     <Form.Group controlId="formProjects">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter details about your projects"
//                             name="projects"
//                             value={formData.projects}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <Button variant="primary" className="mt-3" type="submit">
//                     {editing ? 'Update Profile' : 'Submit'}
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default ProfileContent;

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
// import '../styling/ProfileContent.css'

// function ProfileContent() {
//     const [submitted, setSubmitted] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         workExperience: [{ jobTitle: '', company: '', date: '', responsibilities: '' }],
//         education: [{ degree: '', institution: '', graduationYear: '' }],
//         skills: '',
//         certifications: '',
//         achievements: '',
//         languages: '',
//         projects: '',
//     });

//     const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle dynamic field changes (for Work Experience and Education)
//     const handleArrayChange = (index, e, type) => {
//         const { name, value } = e.target;

//         const newArray = [...formData[type]];
//         newArray[index][name] = value;

//         setFormData({
//             ...formData,
//             [type]: newArray,
//         });
//     };

//     // Add new Work Experience or Education entry
//     const addEntry = (type) => {
//         const newEntry = type === 'workExperience'
//             ? { jobTitle: '', company: '', date: '', responsibilities: '' }
//             : { degree: '', institution: '', graduationYear: '' };

//         setFormData({
//             ...formData,
//             [type]: [...formData[type], newEntry],
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validation
//         const isFormValid = validateForm();
//         if (!isFormValid) {
//             return; // Stop the submission if validation fails
//         }

//         // Handle form submission (e.g., send data to server or API)
//         // console.log('Submitted Data:', formData);
//         // Clear error message on successful submission
//         setErrorMessage('');
//         setSubmitted(true);
//     };

//     // Function to validate the form
//     const validateForm = () => {
//         // Check required fields
//         if (!formData.name || !formData.phone || !formData.email) {
//             setErrorMessage('Please fill out all required fields (Name, Phone, Email).');
//             return false;
//         }
//         // Validate Phone Number
//         const phonePattern = /^[0-9]{11}$/; // Adjust this for your specific phone format
//         if (!phonePattern.test(formData.phone)) {
//         setErrorMessage('Please enter a valid phone number (11 digits).');
//         return false;
//         }

//         // Check if any work experience or education entries are empty
// for (const work of formData.workExperience) {
//     if (!work.jobTitle || !work.company || !work.date || !work.responsibilities) {
//         setErrorMessage('Please fill out all fields in Work Experience.');
//         return false;
//     }

//     // Validate Date format for Work Experience
//     const datePattern = /^(0[1-9]|1[0-2])\/\d{4} - (0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY - MM/YYYY
//     if (!datePattern.test(work.date)) {
//         setErrorMessage('Please enter dates in MM/YYYY format (e.g., 01/2020 - 12/2022).');
//         return false;
//     }

//     // Split the date range and validate start and end dates
//     const [startDateStr, endDateStr] = work.date.split(' - ');  // e.g., "01/2020 - 12/2022"
//     const startDate = new Date(`${startDateStr}/01`);  // Convert to a Date object (start of month)
//     const endDate = new Date(`${endDateStr}/01`);      // Convert to a Date object (start of month)
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//     // Check if end date is earlier than start date
//     if (endDate < startDate) {
//         console.log("Start Date:", startDate);
//         console.log("End Date:", endDate);
//         setErrorMessage('End date cannot be earlier than start date.');
//         return false;
//     }
// }

//         for (const edu of formData.education) {
//             if (!edu.degree || !edu.institution || !edu.graduationYear) {
//                 setErrorMessage('Please fill out all fields in Education.');
//                 return false;
//             }
//             // Validate Graduation Year
//             const graduationYearPattern = /^\d{4}$/; // Four-digit year
//             if (!graduationYearPattern.test(edu.graduationYear)) {
//                 setErrorMessage('Please enter a valid four-digit Graduation Year.');
//                 return false;
//             }
//         }
//         if (!formData.skills) {
//             setErrorMessage('Please fill out the Skills field.');
//             return false;
//         }
    
//         if (!formData.certifications) {
//             setErrorMessage('Please fill out the Certifications field.');
//             return false;
//         }
    
//         if (!formData.achievements) {
//             setErrorMessage('Please fill out the Achievements/Awards field.');
//             return false;
//         }
    
//         if (!formData.languages) {
//             setErrorMessage('Please fill out the Languages field.');
//             return false;
//         }
    
//         if (!formData.projects) {
//             setErrorMessage('Please fill out the Projects/Portfolio field.');
//             return false;
//         }
    
//         // Additional checks can be added as needed

//         return true; // Form is valid
//     };

//     return (
//         <div className="profile-form-container">
//             <Form onSubmit={handleSubmit}>
//                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Error message display */}
//                 <h1>Profile Creation</h1>
//                 <div className="form-section">
//                     <h3>Contact Information</h3>
//                     <Form.Group controlId="formName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter your name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formPhone">
//                         <Form.Label className='mt-2'>Phone Number</Form.Label>
//                         <Form.Control
//                             type="tel"
//                             placeholder="Enter your phone number"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formEmail">
//                         <Form.Label className='mt-2'>Email Address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter your email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section">
//                     <h3 className='mt-3'>Work Experience</h3>
//                     {formData.workExperience.map((work, index) => (
//                         <Row key={index}>
//                             <Col>
//                                 <Form.Group controlId={`formJobTitle${index}`}>
//                                     <Form.Label >Job Title</Form.Label>
//                                     <Form.Control 
//                                         className='mb-2'
//                                         type="text"
//                                         placeholder="Enter job title"
//                                         name="jobTitle"
//                                         value={work.jobTitle}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId={`formCompany${index}`}>
//                                     <Form.Label>Company</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter company name"
//                                         name="company"
//                                         value={work.company}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId={`formDate${index}`}>
//                                     <Form.Label>Dates</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="e.g., 01/2020 - 03/2022"
//                                         name="date"
//                                         value={work.date}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId={`formResponsibilities${index}`}>
//                                     <Form.Label>Responsibilities</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter responsibilities"
//                                         name="responsibilities"
//                                         value={work.responsibilities}
//                                         onChange={(e) => handleArrayChange(index, e, 'workExperience')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                     ))}
//                     <Button variant="primary" onClick={() => addEntry('workExperience')}>Add Work Experience</Button>
//                 </div>

//                 <div className="form-section">
//                     <h3>Education</h3>
//                     {formData.education.map((edu, index) => (
//                         <Row key={index}>
//                             <Col>
//                                 <Form.Group controlId={`formDegree${index}`}>
//                                     <Form.Label>Degree</Form.Label>
//                                     <Form.Control
//                                     className='mb-2'
//                                         type="text"
//                                         placeholder="Enter degree"
//                                         name="degree"
//                                         value={edu.degree}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId={`formInstitution${index}`}>
//                                     <Form.Label>Institution</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter institution name"
//                                         name="institution"
//                                         value={edu.institution}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group controlId={`formGraduationYear${index}`}>
//                                     <Form.Label>Graduation Year</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter graduation year"
//                                         name="graduationYear"
//                                         value={edu.graduationYear}
//                                         onChange={(e) => handleArrayChange(index, e, 'education')}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                     ))}
//                     <Button variant="primary" onClick={() => addEntry('education')}>Add Education</Button>
//                 </div>

//                 <div className="form-section">
//                     <h3>Skills</h3>
//                     <Form.Group controlId="formSkills">
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter your skills (Technical and Soft Skills)"
//                             name="skills"
//                             value={formData.skills}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section">
//                     <h3>Certifications</h3>
//                     <Form.Group controlId="formCertifications">
//                         <Form.Control
//                             as="textarea"
//                             rows={2}
//                             placeholder="Enter relevant licenses or certifications"
//                             name="certifications"
//                             value={formData.certifications}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section">
//                     <h3>Achievements/Awards</h3>
//                     <Form.Group controlId="formAchievements">
//                         <Form.Control
//                             as="textarea"
//                             rows={2}
//                             placeholder="Enter your achievements or awards"
//                             name="achievements"
//                             value={formData.achievements}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section">
//                     <h3>Languages</h3>
//                     <Form.Group controlId="formLanguages">
//                         <Form.Control
//                             as="textarea"
//                             rows={2}
//                             placeholder="Enter languages and proficiency levels"
//                             name="languages"
//                             value={formData.languages}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <div className="form-section">
//                     <h3>Projects/Portfolio</h3>
//                     <Form.Group controlId="formProjects">
//                         <Form.Control
//                             as="textarea"
//                             rows={2}
//                             placeholder="Enter details about your projects or portfolio"
//                             name="projects"
//                             value={formData.projects}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <Button variant="success" type="submit" className="mt-4">Submit</Button>
//                 {submitted && (
//                             <Alert variant="success" className="mt-3">
//                                 Information Stored Successful!
//                             </Alert>
//                         )}
//             </Form>
            
//         </div>
//     );
// }

// export default ProfileContent;