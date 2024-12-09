import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import "../styling/ResumeGenerationContent.css";
import jsPDF from "jspdf";
import { useLocation } from 'react-router-dom';
// import { Form } from 'react-bootstrap';

// Import your templates as components
import Template1 from "../Templates/tem1";
import Template2 from "../Templates/tem2";
import Template3 from "../Templates/tem3";


function ResumeGenerationPageContent() {
    const location = useLocation();
    const { job } = location.state || {};

    const [formData, setFormData] = useState({
        jobDescription: "",
    });
 useEffect(() => {
    if (job) {
      setFormData((prevData) => ({
        ...prevData,
        jobDescription: job.description || "",
      }));
    }
  }, [job]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form validation
    const validateForm = () => {
        if (!formData.jobDescription) {
            setErrorMessage("Please provide a job description.");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowModal(true); // Open modal for template selection
        }
    };

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template); // Set selected template
        setShowModal(false); // Close modal
    };

    // Placeholder functions for other buttons
    const handleEditResume = () => {
        console.log("Edit Resume clicked");
    };

    // const handleDownloadResume = () => {
    //     console.log("Download Resume clicked");
    // };
    const handleDownloadResume = () => {
        console.log("Download Resume clicked");
    
        // Create a new PDF document
        const doc = new jsPDF();
    
        // Add content to the PDF
        doc.setFontSize(18);
        doc.text("Resume", 10, 20); // Title
    
        doc.setFontSize(12);
        doc.text("Name: John Doe", 10, 40);
        doc.text("Email: johndoe@example.com", 10, 50);
        doc.text("Phone: 123-456-7890", 10, 60);
    
        doc.setFontSize(14);
        doc.text("Skills:", 10, 80);
        doc.setFontSize(12);
        doc.text("- JavaScript", 10, 90);
        doc.text("- React", 10, 100);
        doc.text("- Node.js", 10, 110);
    
        doc.setFontSize(14);
        doc.text("Experience:", 10, 130);
        doc.setFontSize(12);
        doc.text("Software Engineer at ABC Corp", 10, 140);
        doc.text("Responsibilities:", 10, 150);
        doc.text("- Developed web applications using React and Node.js", 10, 160);
    
        // Save the PDF
        doc.save("Resume.pdf");
    };

    const handleViewSavedResume = () => {
        console.log("View Saved Resume clicked");
    };

    return (
        <div className="resume-form-container">
            <Form onSubmit={handleSubmit}>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <h1>Resume Generation</h1>

                <div className="form-section">
                    <h3>Job Description</h3>

                    {/* <Form.Group controlId="formJobDescription">
                        <Form.Label>Describe the job:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter the job description"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                    {/* <h1>Tailor Resume for {job?.name}</h1> */}
      <Form.Group controlId="formJobDescription">
        {/* <Form.Label>Describe the job:</Form.Label> */}
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
                <Button className="mt-3" variant="primary" type="submit">
                    Select Template
                </Button>
                <Button className="mt-3" variant="primary" type="button">
                    Generate Resume
                </Button>
            </Form>

            {/* Modal for template selection */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button
                        variant="outline-primary"
                        className="mb-2"
                        onClick={() => handleSelectTemplate("template1")}
                    >
                        Template 1
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={() => handleSelectTemplate("template2")}
                    >
                        Template 2
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="mb-2"
                        onClick={() => handleSelectTemplate("template3")}
                    >
                        Template3
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Render the selected template */}
            <div className="template-container mt-4">
                {selectedTemplate === "template1" && <Template1 />}
                {selectedTemplate === "template2" && <Template2 />}
                {selectedTemplate === "template3" && <Template3 />}
            </div>

            {/* Additional buttons */}
            <div className="button-container mt-4">
                <Button variant="secondary" onClick={handleEditResume}>
                    Edit Resume
                </Button>
                <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={handleDownloadResume}
                >
                    Download Resume
                </Button>
                <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={handleViewSavedResume}
                >
                    View Saved Resume
                </Button>
            </div>
        </div>
    );
}

export default ResumeGenerationPageContent;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import '../styling/ResumeGenerationContent.css';

// function ResumeGenerationPageContent() {
//     const [formData, setFormData] = useState({
//         jobDescription: '',
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

//     // Form validation
//     const validateForm = () => {
//         if (!formData.jobDescription) {
//             setErrorMessage('Please provide a job description.');
//             return false;
//         }
//         setErrorMessage('');
//         return true;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         validateForm();
//     };

//     // Placeholder functions for new buttons
//     const handleEditResume = () => {
//         // Logic for editing the resume goes here
//         console.log("Edit Resume clicked");
//     };

//     const handleDownloadResume = () => {
//         // Logic for downloading the resume goes here
//         console.log("Download Resume clicked");
//     };

//     const handleViewSavedResume = () => {
//         // Logic for viewing saved resume goes here
//         console.log("View Saved Resume clicked");
//     };

//     return (
//         <div className="resume-form-container">
//             <Form onSubmit={handleSubmit}>
//                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                 <h1>Resume Generation</h1>

//                 <div className="form-section">
//                     <h3>Job Description</h3>
//                     <Form.Group controlId="formJobDescription">
//                         <Form.Label>Describe the job:</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter the job description"
//                             name="jobDescription"
//                             value={formData.jobDescription}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>
//                 <Button className="mt-3" variant="primary" type="submit">
//                     Select Template
//                 </Button>
//                 <Button className="mt-3" variant="primary" type="submit">
//                     Generate Resume
//                 </Button>
//             </Form>

//             {/* New div with buttons for editing, downloading, and viewing saved resume */}
//             <div className="button-container mt-4">
//                 <Button variant="secondary" onClick={handleEditResume}>
//                     Edit Resume
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleDownloadResume}>
//                     Download Resume
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleViewSavedResume}>
//                     View Saved Resume
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default ResumeGenerationPageContent;
