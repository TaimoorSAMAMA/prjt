
// const pdfParse = require('pdf-parse');
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const fileUpload = require("express-fileupload");

// const extractTextFromPDF = (pdfData) => {
//     return pdfParse(pdfData).then(data => {
//         const text = data.text;

//         // Define start keywords for both sections
//         const workExperienceStart = /Work Experience/i;
//         const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//         const professionalProjectsStart = /Professional Projects/i;
//         const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

       

//         // Extract "Work Experience" section
//         const workExperienceStartIndex = text.search(workExperienceStart);
//         let workExperienceSection = '';
//         if (workExperienceStartIndex !== -1) {
//             const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//             workExperienceSection = workExperienceEndIndex !== -1
//                 ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
//                 : text.slice(workExperienceStartIndex);
//             workExperienceSection = cleanText(workExperienceSection);
//         } else {
//             throw new Error("Work Experience section not found.");
//         }

//         // Extract "Professional Projects" section only if it exists after Work Experience
//         const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//         let professionalProjectsSection = '';
//         if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//             const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//             professionalProjectsSection = professionalProjectsEndIndex !== -1
//                 ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
//                 : text.slice(professionalProjectsStartIndex);
//             professionalProjectsSection = cleanText(professionalProjectsSection);
//             console.log("Trimm")
//         } else {
//             throw new Error("Professional Projects section not found.");
//         }

//         // Combine both sections into plain text
//         const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;
//         return combinedText;
//     }).catch(error => {
//         throw new Error('Error extracting data from PDF: ' + error.message);
//     });
// };
// const cleanText = (section) => {
//     return section
//         .split('\n')
//         // .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//         .filter(line => line !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//         .join('\n')
//         .trim();
// };
// // Function to clean the extracted text

// module.exports = { extractTextFromPDF };

// // const pdfParse = require('pdf-parse');

// // const extractTextFromPDF = (pdfData) => {
// //     return pdfParse(pdfData).then(data => {
// //         const text = data.text;

// //         // Define start keywords for both sections
// //         const workExperienceStart = /Work Experience/i;
// //         const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

// //         const professionalProjectsStart = /Professional Projects/i;
// //         const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;
// //         // const cleanText = (section) => {
// //         //     return section
// //         //         .split('\n')
// //         //         // .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
// //         //         .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
// //         //         .join('\n')
// //         //         .trim();
// //         // };
// //         const cleanText = (section) => {
// //             return section
// //                 .split('\n')
// //                 .filter(line => line.trim() !== '' && !/^_+\s*$/.test(line)) // Remove empty lines and lines with only underscores
// //                 .join('\n')
// //                 .trim();
// //                 console.log("trim ho ra ha")
// //         };
// //         // Extract "Work Experience" section
// //         const workExperienceStartIndex = text.search(workExperienceStart);
// //         let workExperienceSection = '';
// //         if (workExperienceStartIndex !== -1) {
// //             const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
// //             workExperienceSection = workExperienceEndIndex !== -1
// //                 ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
// //                 : text.slice(workExperienceStartIndex);
// //             workExperienceSection = cleanText(workExperienceSection);
// //         } else {
// //             throw new Error("Work Experience section not found.");
// //         }

// //         // Extract "Professional Projects" section only if it exists after Work Experience
// //         const professionalProjectsStartIndex = text.search(professionalProjectsStart);
// //         let professionalProjectsSection = '';
// //         if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
// //             const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
// //             professionalProjectsSection = professionalProjectsEndIndex !== -1
// //                 ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
// //                 : text.slice(professionalProjectsStartIndex);
// //             professionalProjectsSection = cleanText(professionalProjectsSection);
// //         } else {
// //             throw new Error("Professional Projects section not found.");
// //         }

// //         // Combine both sections into plain text
// //         const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;
// //         return combinedText;
// //     }).catch(error => {
// //         throw new Error('Error extracting data from PDF: ' + error.message);
// //     });
// // };

// // // Function to clean the extracted text
// // // const cleanText = (section) => {
// // //     return section
// // //         .split('\n')
// // //         .filter(line => line.trim() !== '' && !/^_+$/.test(line)) // Remove empty lines and lines with only underscores
// // //         .join('\n')
// // //         .trim();
// // // };
// // // Function to clean the extracted text


// // module.exports = { extractTextFromPDF };
