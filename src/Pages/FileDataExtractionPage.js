// Work experience and Projects working properly
import React, { useState } from 'react';

const FileDataExtractionPage = ({ onExtract }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            setErrorMessage("Please upload a PDF file.");
            setSelectedFile(null);
            return;
        }
        setErrorMessage(''); 
        setSelectedFile(file);
    };

    const handleUploadClick = () => {
        if (!selectedFile) {
            setErrorMessage('Please select a file.');
            return;
        }

        setIsLoading(true); // Start loading indicator
        const formData = new FormData();
        formData.append('pdfFile', selectedFile);

        fetch('http://localhost:5000/extract-text', {
            method: 'POST',
            body: formData,
        })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // Get response as plain text
                })
                .then((text) => {
                    setErrorMessage('');
                    setExtractedText(text);
                    // Check if the response contains both sections
                    // const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
                    // const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*)/i);

                    // const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
                    // const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*Skills:/i);
                    // const skillsMatch = text.match(/Skills:\s*([\s\S]*)/i);

                    // const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
                    // const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*Skills:/i);
                    // const skillsMatch = text.match(/Skills:\s*([\s\S]*?)\n\s*Education:/i);
                    // const educationMatch = text.match(/Education:\s*([\s\S]*)/i);

                    const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
                    const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*Skills:/i);
                    const skillsMatch = text.match(/Skills:\s*([\s\S]*?)\n\s*Education:/i);
                    const educationMatch = text.match(/Education:\s*([\s\S]*?)\n\s*Languages:/i);
                    const languagesMatch = text.match(/Languages:\s*([\s\S]*)/i);

                    // const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
                    // const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*Skills:/i);
                    // const skillsMatch = text.match(/Skills:\s*([\s\S]*?)\n\s*Education:/i);
                    // const educationMatch = text.match(/Education:\s*([\s\S]*?)\n\s*Languages:/i);
                    // const languagesMatch = text.match(/Languages:\s*([\s\S]*?)\n\s*Certificates:/i);
                    // const certificatesMatch = text.match(/Certificates:\s*([\s\S]*)/i);


                    const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : '';
                    const projects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : '';
                    const skills =  skillsMatch ? skillsMatch[1].trim() : '';
                    const education = educationMatch ? educationMatch[1].trim() : '';
                    const Languages = languagesMatch ? languagesMatch[1].trim() : '';
                    // const certificates = certificatesMatch ? certificatesMatch[1].trim() : '';


                    // console.log("Extracted Work Experience:", workExperience); // Debug log
                    // console.log("Extracted Projects:", projects); // Debug log
                    // console.log("Extracted skills:", skills);
                    // console.log("Extracted education:", education);

                    // Call the onExtract prop with the extracted text
                    onExtract({ workExperience, projects, skills, education, Languages }); // Adjusted to send both sections
                })
                .catch((error) => {
                    setErrorMessage('Error extracting text from PDF: ' + error.message);
                });
        
    };

    return (
        <div>
            <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
            <button type="button" id="btnUpload" onClick={handleUploadClick} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <br />
            <br />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <textarea
                style={{ width: '700px', height: '150px' }}
                id="resultText"
                value={extractedText}
                placeholder="Text will appear here.."
                readOnly
            ></textarea>
        </div>
    );
};

export default FileDataExtractionPage;

// // import React, { useState } from 'react';

// // const FileDataExtractionPage = ({ onExtract }) => {
// //     const [selectedFile, setSelectedFile] = useState(null);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const [extractedText, setExtractedText] = useState('');

// //     const handleFileChange = (e) => {
// //         setSelectedFile(e.target.files[0]);
// //     };

// //     const handleUploadClick = () => {
// //         if (!selectedFile) {
// //             setErrorMessage('Please select a file.');
// //             return;
// //         }

// //         const formData = new FormData();
// //         formData.append('pdfFile', selectedFile);

        // fetch('http://localhost:5000/extract-text', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.text(); // Get response as plain text
        //     })
        //     .then((text) => {
        //         setErrorMessage('');
        //         setExtractedText(text);
        //         // Check if the response contains all sections
        //         const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
        //         const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*Skills & Tools:/i);
        //         const skillsMatch = text.match(/Skills & Tools:\s*([\s\S]*)/i);
                
        //         const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : '';
        //         const projects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : '';
        //         const skills = skillsMatch ? skillsMatch[1].trim() : ''; // Extract Skills

        //         console.log("Extracted Work Experience:", workExperience); // Debug log
        //         console.log("Extracted Projects:", projects); // Debug log
        //         console.log("Extracted Skills:", skills); // Debug log

        //         // Call the onExtract prop with the extracted text
        //         onExtract({ workExperience, projects, skills }); // Adjusted to send all sections
        //     })
        //     .catch((error) => {
        //         setErrorMessage('Error extracting text from PDF: ' + error.message);
        //     });
// //     };

// //     return (
// //         <div>
// //             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
// //             <button type="button" id="btnUpload" onClick={handleUploadClick}>
// //                 Upload
// //             </button>
// //             <br />
// //             <br />
// //             <textarea
// //                 style={{ width: '700px', height: '150px' }}
// //                 id="resultText"
// //                 value={extractedText}
// //                 placeholder="Text will appear here.."
// //                 readOnly
// //             ></textarea>
// //             {errorMessage && <div className="error-message">{errorMessage}</div>}
// //         </div>
// //     );
// // };

// // export default FileDataExtractionPage;

// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [extractedText, setExtractedText] = useState('');

//     // const handleFileChange = (e) => {
//     //     setSelectedFile(e.target.files[0]);
//     // };
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type !== "application/pdf") {
//             setErrorMessage("Please upload a PDF file.");
//             setSelectedFile(null);
//             return;
//         }
//         setErrorMessage(''); // Clear any previous error
//         setSelectedFile(file);
//     };
    
//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         // fetch('http://localhost:5000/extract-text', {
//             fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text(); // Get response as plain text
//             })
//             .then((text) => {
//                 setErrorMessage('');
//                 setExtractedText(text);
//                 // Check if the response contains both sections
//                 const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
//                 const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*)/i);
                
//                 const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : '';
//                 const projects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : ''; // Renamed to projects

//                 console.log("Extracted Work Experience:", workExperience); // Debug log
//                 console.log("Extracted Projects:", projects); // Debug log

//                 // Call the onExtract prop with the extracted text
//                 onExtract({ workExperience, projects }); // Adjusted to send both sections
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     // const handleUploadClick = () => {
//     //     if (!selectedFile) {
//     //         setErrorMessage('Please select a file.');
//     //         return;
//     //     }
    
//     //     const formData = new FormData();
//     //     formData.append('pdfFile', selectedFile);
    
//     //     fetch('http://localhost:5000/extract-text', {
//     //         method: 'POST',
//     //         body: formData,
//     //     })
//     //         .then((response) => {
//     //             if (!response.ok) {
//     //                 throw new Error('Failed to extract text from PDF. Network response was not ok.');
//     //             }
//     //             return response.text();
//     //         })
//     //         .then((text) => {
//     //             setErrorMessage('');
                
//     //             // Match sections for "Work Experience", "Professional Projects", "Skills", and "Education"
//     //             const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*(Professional Projects:|Skills:|Education:|$)/i);
//     //             const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*(Work Experience:|Skills:|Education:|$)/i);
//     //             const skillsMatch = text.match(/Skills:\s*([\s\S]*?)\n\s*(Work Experience:|Professional Projects:|Education:|$)/i);
//     //             const educationMatch = text.match(/Education:\s*([\s\S]*?)\n\s*(Work Experience:|Professional Projects:|Skills:|$)/i);
    
//     //             const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : 'Work Experience section not found';
//     //             const projects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : 'Professional Projects section not found';
//     //             const skills = skillsMatch ? skillsMatch[1].trim() : 'Skills section not found';
//     //             const education = educationMatch ? educationMatch[1].trim() : 'Education section not found';
    
//     //             console.log("Extracted Work Experience:", workExperience);
//     //             console.log("Extracted Projects:", projects);
//     //             console.log("Extracted Skills:", skills);
//     //             console.log("Extracted Education:", education);
    
//     //             // Call onExtract with all four sections
//     //             onExtract({ workExperience, projects, skills, education });
//     //         })
//     //         .catch((error) => {
//     //             setErrorMessage(`Error extracting text from PDF: ${error.message}`);
//     //         });
//     // };
//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }
    
//         setIsLoading(true); // Start loading
//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);
    
//         // fetch('http://localhost:5000/extract-text', {
//         //     method: 'POST',
//         //     body: formData,
//         // })
//         //     .then((response) => {
//         //         setIsLoading(false); // Stop loading
//         //         if (!response.ok) {
//         //             throw new Error('Failed to extract text from PDF. Network response was not ok.');
//         //         }
//         //         return response.text();
//         //     })
//         //     .then((text) => {
//         //         setErrorMessage('');
//         //         setExtractedText(text);
//         //         // Match each section, allowing flexibility for missing sections
//         //         const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*(Professional Projects:|Skills:|Education:|$)/i);
//         //         const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*?)\n\s*(Work Experience:|Skills:|Education:|$)/i);
//         //         // const skillsMatch = text.match(/Skills:\s*([\s\S]*?)\n\s*(Work Experience:|Professional Projects:|Education:|$)/i);
//         //         // const educationMatch = text.match(/Education:\s*([\s\S]*?)\n\s*(Work Experience:|Professional Projects:|Skills:|$)/i);
//         //         const educationMatch = text.match(/Academic Background:\s*([\s\S]*?)(?=\n\s*(Work Experience:|Professional Projects:|Career Aim:|References:|Certifications:|Skills:|$))/i);

//         //         // Extract text for each section or provide default message
//         //         const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : 'Work Experience section not found';
//         //         const projects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : 'Professional Projects section not found';
//         //         // const skills = skillsMatch ? skillsMatch[1].trim() : 'Skills section not found';
//         //         const education = educationMatch ? educationMatch[1].trim() : 'Education section not found';
                
//         //         // const education = educationMatch ? educationMatch[1].trim() : 'Education section not found';

//         //         console.log("Extracted Work Experience:", workExperience);
//         //         console.log("Extracted Projects:", projects);
//         //         // console.log("Extracted Skills:", skills);
//         //         console.log("Extracted Education:", education);
    
//         //         // Pass extracted data to parent component
//         //         // onExtract({ workExperience, projects, education });
//         //         onExtract({
//         //             workExperience: workExperience.trim(),
//         //             projects: projects.trim(),
//         //             education: education.trim()
//         //         });
                
                

//         //     })
//         //     .catch((error) => {
//         //         setIsLoading(false); // Stop loading on error
//         //         setErrorMessage(`Error extracting text from PDF: ${error.message}`);
//         //     });
//         // }
//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => {
//                 setIsLoading(false); // Stop loading indicator
//                 if (!response.ok) {
//                     throw new Error('Failed to extract text from PDF. Network response was not ok.');
//                 }
//                 return response.text();
//             })
//             .then((text) => {
//                 setErrorMessage('');
//                 setExtractedText(text);
//                 const educationMatch = text.match(/Academic Background:\s*([\s\S]*?)(?=\n\s*(Work Experience:|Professional Projects:|Career Aim:|References:|Certifications:|Skills:|$))/i);
//                 // /Work Experience|Professional Projects|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/
//                 // Extract each section or provide default messages if not found
//                 const education = educationMatch ? educationMatch[1].trim() : 'Education section not found';
        
//                 // Log extracted sections to console for verification

//                 console.log("Extracted Education:", education);
        
//                 // Pass extracted data to parent component or further processing
//                 onExtract({ education : text.trim() });
//             })
//             .catch((error) => {
//                 setIsLoading(false); // Stop loading indicator in case of error
//                 setErrorMessage(`Error extracting text from PDF: ${error.message}`);
//             });
        
//     };
    
//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
//     // return (
//     //     <div>
//     //         <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//     //         <button type="button" id="btnUpload" onClick={handleUploadClick} disabled={isLoading}>
//     //             {isLoading ? 'Uploading...' : 'Upload'}
//     //         </button>
//     //         <br />
//     //         <br />
//     //         {errorMessage && <div className="error-message">{errorMessage}</div>}
//     //     </div>
//     // );
//     // return (
//     //     <div>
//     //         <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//     //         <button type="button" id="btnUpload" onClick={handleUploadClick} > 
//     //         {/* disabled={isLoading}   */}
//     //             { 'Upload'}
//     //             {/* setExtractedText(text); */}
//     //         </button>
//     //         <br />
//     //         <br />
//     //         <textarea
//     //             style={{ width: '700px', height: '150px' }}
//     //             id="resultText"
//     //             value={extractedText}
//     //             placeholder="Text will appear here.."
//     //             readOnly
//     //         ></textarea>
//     //         {errorMessage && <div className="error-message">{errorMessage}</div>}
//     //     </div>
//     // );
    
// };

// export default FileDataExtractionPage;

// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text(); // Get response as plain text
//             })
//             .then((text) => {
//                 setErrorMessage('');
                
//                 // Check if the response contains both sections
//                 const workExperienceMatch = text.match(/Work Experience:\s*([\s\S]*?)\n\s*Professional Projects:/i);
//                 const professionalProjectsMatch = text.match(/Professional Projects:\s*([\s\S]*)/i);
                
//                 const workExperience = workExperienceMatch ? workExperienceMatch[1].trim() : '';
//                 const professionalProjects = professionalProjectsMatch ? professionalProjectsMatch[1].trim() : '';

//                 // Call the onExtract prop with the extracted text
//                 onExtract({ workExperience, professionalProjects }); // Adjusted to send both sections
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
// };

// export default FileDataExtractionPage;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sb sahi hai is my
// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [extractedText, setExtractedText] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.text();
//             })
//             .then((text) => {
//                 setExtractedText(text);
//                 setErrorMessage('');
//                 // Call the onExtract prop with the extracted text
//                 onExtract({ projects: text }); // You can adjust the key as needed
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}

//             {/* Display the extracted text here */}
//             <textarea
//                 style={{ width: '700px', height: '150px' }}
//                 id="resultText"
//                 value={extractedText}
//                 placeholder="Text will appear here.."
//                 readOnly
//             ></textarea>
//         </div>
//     );
// };

// export default FileDataExtractionPage;

//////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle file change event
//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     // Handle file upload and data extraction
//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         fetch('http://localhost:3000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//         .then((response) => response.text())  // Use response.text() for plain text
//         .then((text) => {
//             // Parse the plain text response for "Professional Projects"
//             const extractedData = extractProfessionalProjects(text);

//             if (extractedData) {
//                 onExtract(extractedData);  // Pass extracted data to parent component
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage('Could not extract the "Professional Projects" section from the PDF.');
//             }
//         })
//         .catch((error) => {
//             setErrorMessage('Error extracting data from PDF: ' + error.message);
//         });
//     };

//     // Helper function to extract the "Professional Projects" section
//     const extractProfessionalProjects = (text) => {
//         const startKeyword = /Professional Projects/i;
//         const endKeyword = /Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

//         // Find the start of "Professional Projects" section
//         const startIndex = text.search(startKeyword);
//         if (startIndex === -1) {
//             return null; // "Professional Projects" section not found
//         }

//         // Find the end of the section or the next section
//         const endIndex = text.slice(startIndex).search(endKeyword);
//         const professionalProjectsSection = (endIndex !== -1)
//             ? text.slice(startIndex, startIndex + endIndex)
//             : text.slice(startIndex); // Extract till the next section or end of text

//         return professionalProjectsSection.trim();
//     };

//     return (
//         <div>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" onClick={handleUploadClick}>
//                 Upload and Extract Data
//             </button>
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
// };

// export default FileDataExtractionPage;

// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle file change event
//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     // Handle file upload and data extraction
//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//         .then((response) => response.text())  // Use response.text() for plain text
//         .then((text) => {
//             // Parse the plain text response
//             const extractedData = parsePlainText(text);

//             if (extractedData) {
//                 onExtract(extractedData);  // Pass extracted data to parent component
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage('Could not extract the required data from the PDF.');
//             }
//         })
//         .catch((error) => {
//             setErrorMessage('Error extracting data from PDF: ' + error.message);
//         });
//     };

//     // Helper function to parse plain text into the desired format
//     const parsePlainText = (text) => {
//         const nameMatch = text.match(/Name:\s*(.*)/);
//         const emailMatch = text.match(/Email:\s*(.*)/);
//         const phoneMatch = text.match(/Tel:\s*(.*)/);

//         if (nameMatch && emailMatch && phoneMatch) {
//             return {
//                 name: nameMatch[1],
//                 email: emailMatch[1],
//                 phone: phoneMatch[1],
//             };
//         }
//         return null;
//     };

//     return (
//         <div>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" onClick={handleUploadClick}>
//                 Upload and Extract Data
//             </button>
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
// };

// export default FileDataExtractionPage;

// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);
//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => response.json())  // Assuming server returns JSON with extracted fields
//             .then((data) => {
//                 // Assuming the server response contains extracted name, phone, email
//                 const { name, email, phone } = data;

//                 if (name && email && phone) {
//                     onExtract({ name, email, phone }); // Pass the extracted data to the parent component
//                     setErrorMessage('');
//                 } else {
//                     setErrorMessage('Could not extract the required data from the PDF.');
//                 }
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting data from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" onClick={handleUploadClick}>
//                 Upload and Extract Data
//             </button>
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
// };

// export default FileDataExtractionPage;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Is code my text area my pdf ka data show ho rha ha
///////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';

// const FileDataExtractionPage = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [extractedText, setExtractedText] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);
//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => response.text())
//             .then((text) => {
//                 setExtractedText(text);  // This updates the state
//                 setErrorMessage('');
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}

//             {/* Display the extracted text here */}
            // <textarea
            //     style={{ width: '700px', height: '150px' }}
            //     id="resultText"
            //     value={extractedText}
            //     placeholder="Text will appear here.."
            //     readOnly
            // ></textarea>
//         </div>
//     );
// };

// export default FileDataExtractionPage;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';

// const FileDataExtractionPage = ({ onExtract }) => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);
//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => response.json())  // Assuming server returns JSON
//             .then((data) => {
//                 // Pass extracted data to parent component via props
//                 onExtract({
//                     name: data.name || 'Name not found',
//                     phone: data.phone || 'Phone number not found',
//                     email: data.email || 'Email not found',
//                     workExperience: data.workExperience || [{ jobTitle: 'Not found', company: 'Not found', date: 'Not found', responsibilities: 'Not found' }],
//                     education: data.education || [{ degree: 'Not found', institution: 'Not found', graduationYear: 'Not found' }],
//                     skills: data.skills || 'Skills not found',
//                     certifications: data.certifications || 'Certifications not found',
//                     achievements: data.achievements || 'Achievements not found',
//                     languages: data.languages || 'Languages not found',
//                     projects: data.projects || 'Projects not found',
//                 });
//                 setErrorMessage('');
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//     );
// };

// export default FileDataExtractionPage;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';

// // Function to extract specific information from the extracted text
// const parseExtractedText = (text) => {
//     const data = {
//         name: 'Data not found',
//         phone: 'Data not found',
//         email: 'Data not found',
//         workExperience: [],
//         education: [],
//         skills: 'Data not found',
//         certifications: 'Data not found',
//         achievements: 'Data not found',
//         languages: 'Data not found',
//         projects: 'Data not found',
//     };

//     const lines = text.split('\n'); // Split the text into lines for easier processing

//     lines.forEach(line => {
//         if (line.includes('Name:')) {
//             data.name = line.split('Name:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Phone:')) {
//             data.phone = line.split('Phone:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Email:')) {
//             data.email = line.split('Email:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Experience:')) {
//             const experience = {
//                 jobTitle: 'Data not found',
//                 company: 'Data not found',
//                 dates: 'Data not found',
//                 responsibilities: 'Data not found',
//             };
//             data.workExperience.push(experience); // You can extract more specific details if needed
//         } else if (line.includes('Education:')) {
//             const education = {
//                 degree: 'Data not found',
//                 institution: 'Data not found',
//                 graduationYear: 'Data not found',
//             };
//             data.education.push(education);
//         } else if (line.includes('Skills:')) {
//             data.skills = line.split('Skills:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Certifications:')) {
//             data.certifications = line.split('Certifications:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Achievements:')) {
//             data.achievements = line.split('Achievements:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Languages:')) {
//             data.languages = line.split('Languages:')[1]?.trim() || 'Data not found';
//         } else if (line.includes('Projects:')) {
//             data.projects = line.split('Projects:')[1]?.trim() || 'Data not found';
//         }
//     });

//     return data;
// };

// const FileDataExtractionPage = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [extractedData, setExtractedData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);

//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => response.text())
//             .then((text) => {
//                 const extracted = parseExtractedText(text);  // Parse the text into the structured data
//                 setExtractedData(extracted); // Set the extracted data
//                 setErrorMessage('');
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}

//             {/* Render the extracted data */}
//             {extractedData && (
//                 <div>
//                     <h3>Extracted Information</h3>
//                     <form>
//                         <div>
//                             <label>Name:</label>
//                             <input type="text" value={extractedData.name} readOnly />
//                         </div>
//                         <div>
//                             <label>Phone:</label>
//                             <input type="text" value={extractedData.phone} readOnly />
//                         </div>
//                         <div>
//                             <label>Email:</label>
//                             <input type="text" value={extractedData.email} readOnly />
//                         </div>
//                         <div>
//                             <label>Skills:</label>
//                             <input type="text" value={extractedData.skills} readOnly />
//                         </div>
//                         <div>
//                             <label>Certifications:</label>
//                             <input type="text" value={extractedData.certifications} readOnly />
//                         </div>
//                         <div>
//                             <label>Achievements:</label>
//                             <input type="text" value={extractedData.achievements} readOnly />
//                         </div>
//                         <div>
//                             <label>Languages:</label>
//                             <input type="text" value={extractedData.languages} readOnly />
//                         </div>
//                         <div>
//                             <label>Projects:</label>
//                             <input type="text" value={extractedData.projects} readOnly />
//                         </div>
//                         <h4>Work Experience</h4>
//                         {extractedData.workExperience.length > 0 ? (
//                             extractedData.workExperience.map((exp, index) => (
//                                 <div key={index}>
//                                     <div>
//                                         <label>Job Title:</label>
//                                         <input type="text" value={exp.jobTitle} readOnly />
//                                     </div>
//                                     <div>
//                                         <label>Company:</label>
//                                         <input type="text" value={exp.company} readOnly />
//                                     </div>
//                                     <div>
//                                         <label>Dates:</label>
//                                         <input type="text" value={exp.dates} readOnly />
//                                     </div>
//                                     <div>
//                                         <label>Responsibilities:</label>
//                                         <input type="text" value={exp.responsibilities} readOnly />
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div>No work experience found</div>
//                         )}

//                         <h4>Education</h4>
//                         {extractedData.education.length > 0 ? (
//                             extractedData.education.map((edu, index) => (
//                                 <div key={index}>
//                                     <div>
//                                         <label>Degree:</label>
//                                         <input type="text" value={edu.degree} readOnly />
//                                     </div>
//                                     <div>
//                                         <label>Institution:</label>
//                                         <input type="text" value={edu.institution} readOnly />
//                                     </div>
//                                     <div>
//                                         <label>Graduation Year:</label>
//                                         <input type="text" value={edu.graduationYear} readOnly />
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div>No education details found</div>
//                         )}
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FileDataExtractionPage;




// import React, { useState } from 'react';

// const FileDataExtractionPage = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [extractedText, setExtractedText] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setErrorMessage('Please select a file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdfFile', selectedFile);
//         fetch('http://localhost:5000/extract-text', {
//             method: 'POST',
//             body: formData,
//         })
//             .then((response) => response.text())
//             .then((text) => {
//                 setExtractedText(text);
//                 setErrorMessage('');
//             })
//             .catch((error) => {
//                 setErrorMessage('Error extracting text from PDF: ' + error.message);
//             });
//     };

//     return (
//         <div>
//             <input type="file" id="inpFile" accept=".pdf" onChange={handleFileChange} />
//             <button type="button" id="btnUpload" onClick={handleUploadClick}>
//                 Upload
//             </button>
//             <br />
//             <br />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
            
//         </div>
//     );
// };

// export default FileDataExtractionPage;

