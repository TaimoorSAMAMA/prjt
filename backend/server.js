// Work experience and Projects working properly
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
// const { extractTextFromPDF } = require('./pdfExtractor'); // Import the function

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Adjust as necessary
  credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use("/", express.static("public"));
app.use(fileUpload());

  app.post("/extract-text", (req, res) => {
    // Check if a PDF file was uploaded
    if (!req.files || !req.files.pdfFile) {
        return res.status(400).send("No PDF file uploaded."); // Send a response and return
    }

pdfParse(req.files.pdfFile.data)
  .then(data => {
      const text = data.text;

      // Define start keywords for both sections
      // const skillsStart = /Skills|Skills & Tools|Tools/i; // carrer aim
      const skillsStart = /Skills|/i; // contact info
      // const skillsStart = /Skills|Skills & Tools/i; // carrer aim
      // const skillsStart = /Skills[:\s]*/i;
      // const skillsStart = /Skills & Tools/i; // error


      const skillsEndKeywords = /CAREER AIM|Career Aim|Academic Background|Education|Work Experience|Professional Projects|Certifications|References|Summary|Profile/i;

      // const certificatesStart = /Certificates/i;
      // const certificatesEndKeywords = /CAREER AIM|Career Aim|Academic Background|Work Experience|Professional Projects|Skills|References|Summary|Profile|CAREER AIM/i;

      const workExperienceStart = /Work Experience/i;
      const workExperienceEndKeywords = /Professional Projects|Education|Academic Background|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

      const professionalProjectsStart = /Professional Projects/i;
      const professionalProjectsEndKeywords = /Work Experience|Education|Academic Background|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

      const educationStart = /Academic Background|Education/i;
      const educationEndKeywords = /CAREER AIM|Career Aim|Work Experience|Professional Projects|Skills|Certifications|References|Summary|Profile/i;
      
      // Function to clean up text and remove lines that are entirely underscores
      const cleanText = (section) => {
          return section
              .split('\n')
              // .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
              .filter(line => line !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
              .join('\n')
              .trim();
      };
      // Languages
      // Define common programming languages to search for
// List of common programming languages to search for in text
          const programmingLanguages = [
            'JavaScript', 'Python', 'Java', 'C\\+\\+', 'C#', 'PHP', 'Ruby', 'Swift', 'Go', 
            'Kotlin', 'R', 'TypeScript', 'SQL', 'Perl', 'Rust', 'Scala', 'Objective-C', 'Dart', 
            'Shell', 'PowerShell', 'MATLAB', 'Groovy'
          ];

          // Create a regular expression pattern to match any language in the list
          const programmingLanguagesPattern = new RegExp(`\\b(${programmingLanguages.join('|')})\\b`, 'gi');

          // Find all programming language matches in the provided text
          const matchedLanguages = text.match(programmingLanguagesPattern);

          // Remove duplicates from the list of matched languages
          const LanguagesSection = matchedLanguages ? [...new Set(matchedLanguages)] : [];

          // Output the result
          if (LanguagesSection.length > 0) {
            console.log("Programming Languages found:", LanguagesSection);
          } else {
            console.log("No programming languages found.");
          }

      // Certificates
      // const certificatesStartIndex = text.search(certificatesStart);
      // let certificateSection = '';
      // if(certificatesStartIndex !== -1)
      // {
      //   const CertificatesEndIndex = text.slice(certificatesStartIndex).search(certificatesEndKeywords);
      //   certificateSection = CertificatesEndIndex !== -1
      //   ? text.slice(certificatesStartIndex + 'Certificates'.length + 1, certificatesStartIndex + CertificatesEndIndex)
      //   : text.slice(certificatesStartIndex + 'Certificates'.length + 1).trim();

      //   certificateSection = cleanText(certificateSection);
      // }
      // else{
      //   return res.status(404).send("Certificates section not found.");
      // }

      // Skills
      const skillsStartIndex = text.search(skillsStart);
      let skillsSection = '';
      if(skillsStartIndex !== -1)
      {
        const skillsEndIndex = text.slice(skillsStartIndex).search(skillsEndKeywords);
        skillsSection = skillsEndIndex !== -1
        ? text.slice(skillsStartIndex + 'Skills & Tools'.length +1, skillsStartIndex + skillsEndIndex).trim()
        : text.slice(skillsStartIndex + 'Skills & Tools'.length +1).trim();

        skillsSection = cleanText(skillsSection);
      }
      else{
        return res.status(404).send("Skills & Tools section not found.");
      }

      // Education
      const educationStartIndex = text.search(educationStart);
      let educationSection = '';

      if(educationStartIndex !== -1){
        const educationEndIndex = text.slice(educationStartIndex).search(educationEndKeywords);
        educationSection = educationEndIndex !== -1
            ? text.slice(educationStartIndex + 'Education'.length + 1, educationStartIndex + educationEndIndex).trim()
            : text.slice(educationStartIndex + 'Education'.length + 1).trim();

            // console.log("Raw Education Section:", educationSection);
        educationSection = cleanText(educationSection);
      }
      else{
        return res.status(404).send("Education section not found.");
      }

      // Extract "Work Experience" section
      const workExperienceStartIndex = text.search(workExperienceStart);
      let workExperienceSection = '';
      if (workExperienceStartIndex !== -1) {
          const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
          // Capture content after the heading
          workExperienceSection = workExperienceEndIndex !== -1
              ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim() // Ignore heading
              : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading

          // Clean the section text
          workExperienceSection = cleanText(workExperienceSection);
      } else {
          return res.status(404).send("Work Experience section not found.");
      }

      // Extract "Professional Projects" section only if it exists after Work Experience
      const professionalProjectsStartIndex = text.search(professionalProjectsStart);
      let professionalProjectsSection = '';
      if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
        // extraction logic for professionalProjectsSection
        const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
          // Capture content after the heading
          professionalProjectsSection = professionalProjectsEndIndex !== -1
              ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim() // Ignore heading
              : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading

          // Clean the section text
          professionalProjectsSection = cleanText(professionalProjectsSection);
          professionalProjectsSection = cleanText(professionalProjectsSection);
        
    } else {
        professionalProjectsSection = 'Professional Projects section not found';
    }
    
    
    // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;
    // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nSkills:\n${skillsSection}`;
    // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nSkills:\n${skillsSection}\n\nEducation:\n${educationSection}`;
    const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nSkills:\n${skillsSection}\n\nEducation:\n${educationSection}\n\nLanguages:\n${LanguagesSection}`;
    // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nSkills:\n${skillsSection}\n\nEducation:\n${educationSection}\n\nLanguages:\n${LanguagesSection}\n\nCertifications:\n${certificateSection}`;

    // console.log('final outpus of education', educationSection);

      // Send plain-text response
      res.set('Content-Type', 'text/plain');
      res.send(combinedText);
  })
  .catch(error => {
      console.error('Detailed error:', error);
      console.log('Detailed error:', error);
      res.status(500).send('Error extracting data from PDF: ' + error.message);
});
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define Routes
app.use('/api', authRoutes);

// Listen on the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is being running on port ${PORT}`);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   extractTextFromPDF(req.files.pdfFile.data)
//         .then(combinedText => {
//             res.set('Content-Type', 'text/plain');
//             res.send(combinedText);
//         })
//         .catch(error => {
//             console.error('Detailed error:', error);
//             res.status(500).send(error.message);
//         });
// });
// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err));

// // Define Routes
// app.use('/api', authRoutes);

// // Listen on the PORT
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
// console.log(`Server is being running on port ${PORT}`);
// });

  // Parse the uploaded PDF file
  // pdfParse(req.files.pdfFile.data) // Access the PDF file data
  //     .then(data => {
  //         const text = data.text;

  //         // Use regex to extract the "Professional Projects" section
  //         const startKeyword = /Work Experience/i;
  //         const endKeyword = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

  //         const startIndex = text.search(startKeyword);
  //         if (startIndex === -1) {
  //             return res.status(404).send("Professional Projects section not found."); // Return 404 if not found
  //         }

  //         const endIndex = text.slice(startIndex).search(endKeyword);
  //         const professionalProjectsSection = endIndex !== -1
  //             ? text.slice(startIndex, startIndex + endIndex)
  //             : text.slice(startIndex); // Extract till the next section or end of text

  //         const extractedData = professionalProjectsSection.trim();

  //         // Create a plain text response for "Professional Projects"
  //         res.set('Content-Type', 'text/plain');
  //         res.send(extractedData);
  //     })
  //     .catch(error => {
  //         res.status(500).send('Error extracting data from PDF: ' + error.message); // Handle parsing errors
  //     });
  // pdfParse(req.files.pdfFile.data)
  //   .then(data => {
  //       const text = data.text;

  //       // Define start and end keywords for "Work Experience" and "Professional Projects"
  //       const workExperienceStart = /Work Experience/i;
  //       const professionalProjectsStart = /Professional Projects/i;
  //       const endKeywords = /Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

  //       // Extract "Work Experience" section
  //       if (workExperienceStart === -1) {
  //         return res.status(404).send("work Experience section not found."); // Return 404 if not found
  //     }

  //       const workExperienceStartIndex = text.search(workExperienceStart);
  //       let workExperienceSection = '';
  //       if (workExperienceStartIndex !== -1) {
  //           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(endKeywords);
  //           workExperienceSection = workExperienceEndIndex !== -1
  //               ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
  //               : text.slice(workExperienceStartIndex);
  //           workExperienceSection = workExperienceSection.trim();
  //       }

  //       if (professionalProjectsStart === -1) {
  //         return res.status(404).send("professional Projects section not found."); // Return 404 if not found
  //     }
  //       // Extract "Professional Projects" section
  //       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
  //       let professionalProjectsSection = '';
  //       if (professionalProjectsStartIndex !== -1) {
  //           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(endKeywords);
  //           professionalProjectsSection = professionalProjectsEndIndex !== -1
  //               ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
  //               : text.slice(professionalProjectsStartIndex);
  //           professionalProjectsSection = professionalProjectsSection.trim();
  //       }

  //       // Combine both sections into one object
  //       const extractedData = {
  //           workExperience: workExperienceSection,
  //           professionalProjects: professionalProjectsSection,
  //       };

  //       // Send JSON response with both sections
  //       // res.json(extractedData);
  //       res.set('Content-Type', 'text/plain');
  //       res.json(extractedData);
  //       // res.send(extractedData);

  //   })
  //   .catch(error => {
  //       res.status(500).send('Error extracting data from PDF: ' + error.message);
  //   });
  // pdfParse(req.files.pdfFile.data)
  //   .then(data => {
  //       const text = data.text;

  //       // Define start and end keywords for "Work Experience" and "Professional Projects"
  //       const workExperienceStart = /Work Experience/i;
  //       const professionalProjectsStart = /Professional Projects/i;
  //       const endKeywords = /Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

  //       // Extract "Work Experience" section
  //       const workExperienceStartIndex = text.search(workExperienceStart);
  //       let workExperienceSection = '';
  //       if (workExperienceStartIndex !== -1) {
  //           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(endKeywords);
  //           workExperienceSection = workExperienceEndIndex !== -1
  //               ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
  //               : text.slice(workExperienceStartIndex);
  //           workExperienceSection = workExperienceSection.trim();
  //       } else {
  //           return res.status(404).send("Work Experience section not found.");
  //       }

  //       // Extract "Professional Projects" section
  //       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
  //       let professionalProjectsSection = '';
  //       if (professionalProjectsStartIndex !== -1) {
  //           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(endKeywords);
  //           professionalProjectsSection = professionalProjectsEndIndex !== -1
  //               ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
  //               : text.slice(professionalProjectsStartIndex);
  //           professionalProjectsSection = professionalProjectsSection.trim();
  //       } else {
  //           return res.status(404).send("Professional Projects section not found.");
  //       }

  //       // Combine both sections into a single plain-text string
  //       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

  //       // Send plain-text response
  //       res.set('Content-Type', 'text/plain');
  //       res.send(combinedText);

  //   })
  //   .catch(error => {
  //       res.status(500).send('Error extracting data from PDF: ' + error.message);
  //   });
  // pdfParse(req.files.pdfFile.data)
  // .then(data => {
  //     const text = data.text;

  //     // Define start and end keywords
  //     const workExperienceStart = /Work Experience/i;
  //     const professionalProjectsStart = /Professional Projects/i;
  //     const endKeywords = /Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

  //     // Extract "Work Experience" section
  //     const workExperienceStartIndex = text.search(workExperienceStart);
  //     let workExperienceSection = '';
  //     if (workExperienceStartIndex !== -1) {
  //         const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(endKeywords);
  //         workExperienceSection = workExperienceEndIndex !== -1
  //             ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
  //             : text.slice(workExperienceStartIndex);
  //         workExperienceSection = workExperienceSection.trim();
  //     } else {
  //         return res.status(404).send("Work Experience section not found.");
  //     }

  //     // Extract "Professional Projects" section after Work Experience
  //     const professionalProjectsStartIndex = text.search(professionalProjectsStart);
  //     let professionalProjectsSection = '';
  //     if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
  //         const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(endKeywords);
  //         professionalProjectsSection = professionalProjectsEndIndex !== -1
  //             ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
  //             : text.slice(professionalProjectsStartIndex);
  //         professionalProjectsSection = professionalProjectsSection.trim();
  //     } else {
  //         return res.status(404).send("Professional Projects section not found.");
  //     }

  //     // Combine both sections into plain text
  //     const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

  //     // Send plain-text response
  //     res.set('Content-Type', 'text/plain');
  //     res.send(combinedText);
  // })
  // .catch(error => {
  //     res.status(500).send('Error extracting data from PDF: ' + error.message);
  // });
  
  // pdfParse(req.files.pdfFile.data)
  // .then(data => {
  //     const text = data.text;

  //     // Define start and end keywords
  //     // const workExperienceStart = /Work Experience/i;
  //     // const professionalProjectsStart = /Professional Projects/i;
  //     // const endKeywords = /Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim|Skills & Tools/i;

  //     // Extract "Work Experience" section
  //     const workExperienceStartIndex = text.search(workExperienceStart);
  //     let workExperienceSection = '';
  //     if (workExperienceStartIndex !== -1) {
  //         const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(endKeywords);
  //         workExperienceSection = workExperienceEndIndex !== -1
  //             ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
  //             : text.slice(workExperienceStartIndex);
  //         workExperienceSection = workExperienceSection.trim();
  //     } else {
  //         return res.status(404).send("Work Experience section not found.");
  //     }

  //     // Extract "Professional Projects" section only if it exists after Work Experience
  //     const professionalProjectsStartIndex = text.search(professionalProjectsStart);
  //     let professionalProjectsSection = '';
  //     if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
  //         const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(endKeywords);
  //         professionalProjectsSection = professionalProjectsEndIndex !== -1
  //             ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
  //             : text.slice(professionalProjectsStartIndex);
  //         professionalProjectsSection = professionalProjectsSection.trim();
  //     } else {
  //         return res.status(404).send("Professional Projects section not found.");
  //     }

  //     // Combine both sections into plain text
  //     const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

  //     // Send plain-text response
  //     res.set('Content-Type', 'text/plain');
  //     res.send(combinedText);
  // })
  // .catch(error => {
  //     res.status(500).send('Error extracting data from PDF: ' + error.message);
  // });

  //
  /////////////////////////////////////////////////////////////////////////////////
  // ya wla sahi chlta ha (work experience + projects)
//   pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex, workExperienceStartIndex + workExperienceEndIndex)
//               : text.slice(workExperienceStartIndex);
//           workExperienceSection = workExperienceSection.trim();
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex, professionalProjectsStartIndex + professionalProjectsEndIndex)
//               : text.slice(professionalProjectsStartIndex);
//           professionalProjectsSection = professionalProjectsSection.trim();
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha")
//   })
//   .catch(error => {
//     console.error('Detailed error:', error);
//     console.log('Detailed error:', error);
//     res.status(500).send('Error extracting data from PDF: ' + error.message);
// });
/////////////////////////////////////////////////////////////////////////////////////
// is code my heading show no ho re (work experience + projects)
// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading and any immediate following lines
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim()
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading and any line right after it
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading and any immediate following lines
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim()
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading and any line right after it
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha")
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Function to clean up text and remove undesired lines
//       const cleanText = (section) => {
//           // Remove lines that are all underscores or are empty
//           return section
//               .split('\n')
//               .filter(line => line.trim() !== '' && !/^_+$/.test(line)) // Ignore empty lines and lines of underscores
//               .join('\n')
//               .trim();
//       };

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading and any immediate following lines
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim()
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading and any line right after it

//           // Clean the section text
//           workExperienceSection = cleanText(workExperienceSection);
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading and any immediate following lines
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim()
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading and any line right after it

//           // Clean the section text
//           professionalProjectsSection = cleanText(professionalProjectsSection);
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha")
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });

// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Function to clean up text and remove lines that are entirely underscores
//       const cleanText = (section) => {
//           return section
//               .split('\n')
//               .filter(line => line.trim() !== '' && line.trim() !== '_________________________________________________________________________________________________' ) // Ignore empty lines and specific line of underscores
//               .join('\n')
//               .trim();
//       };

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim()
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           workExperienceSection = cleanText(workExperienceSection);
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim()
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           professionalProjectsSection = cleanText(professionalProjectsSection);
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha");
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });
////////////////////////////////////////////////////////////////////////////////////////////////
// work experience sy remove ho gai the line
// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Function to clean up text and remove lines that are entirely underscores
//       const cleanText = (section) => {
//           return section
//               .split('\n')
//               .filter(line => line.trim() !== '' && line.trim() !== '_________________________________________________________________________________________________') // Ignore empty lines and the specific line of underscores
//               .join('\n')
//               .trim();
//       };

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim() // Ignore heading
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           workExperienceSection = cleanText(workExperienceSection);
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

      
//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim() // Ignore heading
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           professionalProjectsSection = cleanText(professionalProjectsSection);
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha");
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sb sahi hai is my(underscores bhi nahi aa rhy, headings bhi ni aa re)(work experience + projects)
// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

//       // Function to clean up text and remove lines that are entirely underscores
//       const cleanText = (section) => {
//           return section
//               .split('\n')
//               // .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//               .filter(line => line !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//               .join('\n')
//               .trim();
//       };

//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim() // Ignore heading
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           workExperienceSection = cleanText(workExperienceSection);
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim() // Ignore heading
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           professionalProjectsSection = cleanText(professionalProjectsSection);
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // Combine both sections into plain text
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha");
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });
///////////////////////////////////////////////////////////////////////////////////////////////////
// SKills
// pdfParse(req.files.pdfFile.data)
//   .then(data => {
//       const text = data.text;

//       // Define start keywords for both sections
//       // const skillsStart = /Skills & Tools|Skills|Tools/i; // New keywords for skills section
//       // const skillsEndKeywords = /Work Experience|Professional Projects|Education|Academic Background|Certifications|References|Summary|Profile|CAREER AI|Career Aim/i;

//       const educationStart = /Education|Academic Background/i; // Regex for Education section
//       const educationEndKeywords = /Work Experience|Professional Projects|Skills|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i; // Keywords to end the Education section
      
//       const workExperienceStart = /Work Experience/i;
//       const workExperienceEndKeywords = /Professional Projects|Education|Skills|Academic Background|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;
      

//       const professionalProjectsStart = /Professional Projects/i;
//       const professionalProjectsEndKeywords = /Work Experience|Education|Skills|Academic Background|Certifications|References|Summary|Profile|CAREER AIM|Career Aim/i;

      

//       // Function to clean up text and remove lines that are entirely underscores
//       const cleanText = (section) => {
//           return section
//               .split('\n')
//               // .filter(line => line.trim() !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//               .filter(line => line !== '' && !/^_+$/.test(line.trim())) // Ignore empty lines and lines that are only underscores
//               .join('\n')
//               .trim();
//       };
//       // Skills
//       // const skillsStartIndex = text.search(skillsStart);
//       // let skillsSection = '';
//       // // && skillsStartIndex > professionalProjectsStartIndex)
//       // if (skillsStartIndex !== -1)  
//       // {
//       //     const skillsEndIndex = text.slice(skillsStartIndex).search(skillsEndKeywords);
//       //     // Capture content after the heading
//       //     skillsSection = skillsEndIndex !== -1
//       //         ? text.slice(skillsStartIndex + 'Skills & Tools'.length + 1, skillsStartIndex + skillsEndIndex).trim() // Ignore heading for "Skills & Tools"
//       //         : text.slice(skillsStartIndex + 'Skills & Tools'.length + 1).trim(); // Ignore heading for "Tools" or "Skills"
          
//       //     // Clean the section text
//       //     skillsSection = cleanText(skillsSection);
//       // } else {
//       //     return res.status(404).send("Skills & Tools section not found.");
//       // }
      
//       // Extract "Work Experience" section
//       const workExperienceStartIndex = text.search(workExperienceStart);
//       let workExperienceSection = '';
//       if (workExperienceStartIndex !== -1) {
//           const workExperienceEndIndex = text.slice(workExperienceStartIndex).search(workExperienceEndKeywords);
//           // Capture content after the heading
//           workExperienceSection = workExperienceEndIndex !== -1
//               ? text.slice(workExperienceStartIndex + 'Work Experience'.length + 1, workExperienceStartIndex + workExperienceEndIndex).trim() // Ignore heading
//               : text.slice(workExperienceStartIndex + 'Work Experience'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           workExperienceSection = cleanText(workExperienceSection);
//       } else {
//           return res.status(404).send("Work Experience section not found.");
//       }

      
//       // Extract "Professional Projects" section only if it exists after Work Experience
//       const professionalProjectsStartIndex = text.search(professionalProjectsStart);
//       let professionalProjectsSection = '';
//       if (professionalProjectsStartIndex !== -1 && professionalProjectsStartIndex > workExperienceStartIndex) {
//           const professionalProjectsEndIndex = text.slice(professionalProjectsStartIndex).search(professionalProjectsEndKeywords);
//           // Capture content after the heading
//           professionalProjectsSection = professionalProjectsEndIndex !== -1
//               ? text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1, professionalProjectsStartIndex + professionalProjectsEndIndex).trim() // Ignore heading
//               : text.slice(professionalProjectsStartIndex + 'Professional Projects'.length + 1).trim(); // Ignore heading

//           // Clean the section text
//           professionalProjectsSection = cleanText(professionalProjectsSection);
//       } else {
//           return res.status(404).send("Professional Projects section not found.");
//       }

//       // education 
//       const educationStartIndex = text.search(educationStart);
//       let educationSection = '';
//       if (educationStartIndex !== -1 && educationStartIndex > professionalProjectsStartIndex) {
//           const educationEndIndex = text.slice(educationStartIndex).search(educationEndKeywords);
//           // Capture content after the heading
//           educationSection = educationEndIndex !== -1
//               ? text.slice(educationStartIndex + 'Academic Background'.length + 1, educationStartIndex + educationEndIndex).trim() // Ignore heading
//               : text.slice(educationStartIndex + 'Academic Background'.length + 1).trim(); // Ignore heading
      
//           // Clean the section text
//           educationSection = cleanText(educationSection);
//       } else {
//           return res.status(404).send("Education section not found.");
//       }

//       // Combine both sections into plain text
//       // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}`;
//       // const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nSkills & Tools:\n${skillsSection}`;
//       const combinedText = `Work Experience:\n${workExperienceSection}\n\nProfessional Projects:\n${professionalProjectsSection}\n\nEducation:\n${educationSection}`;

//       // Send plain-text response
//       res.set('Content-Type', 'text/plain');
//       res.send(combinedText);
//       console.log("ya chalta ha");
//   })
//   .catch(error => {
//       console.error('Detailed error:', error);
//       console.log('Detailed error:', error);
//       res.status(500).send('Error extracting data from PDF: ' + error.message);
// });


// });


// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

// // Define Routes
// app.use('/api', authRoutes);

// // Listen on the PORT
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is being running on port ${PORT}`);
// });

///////////////////////////////////////////////////////////////////////////////////////////////
// is my msly ahin kuch
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// const fileUpload = require("express-fileupload");
// const pdfParse = require("pdf-parse");

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3000', // Adjust as necessary
//   credentials: true,
// }));
// app.use(express.json()); // Parse JSON bodies
// app.use("/", express.static("public"));
// app.use(fileUpload());

// app.post("/extract-text", (req, res) => {
//   if (!req.files || !req.files.pdfFile) {
//     res.status(400);
//     res.end();
//     // .send("No file uploaded.");
//   }

//   // pdfParse(req.files.pdfFile).then(result => {
//   //   res.send(result.text);
//   // }).catch(err => {
//   //   res.status(500).send("Error parsing PDF: " + err.message);
//   // });
//   pdfParse(pdfFile.data)
//         .then(data => {
//             const text = data.text;

//             // Example: Use regex or other methods to extract name, email, phone from the text
//             const nameMatch = text.match(/Name:\s*(.*)/);
//             const emailMatch = text.match(/Email:\s*(.*)/);
//             const phoneMatch = text.match(/Phone:\s*(.*)/);

//             const extractedData = {
//                 name: nameMatch ? nameMatch[1] : 'Unknown',
//                 email: emailMatch ? emailMatch[1] : 'Unknown',
//                 phone: phoneMatch ? phoneMatch[1] : 'Unknown'
//             };

//             // Create a plain text response
//             const responseText = `Name: ${extractedData.name}\nEmail: ${extractedData.email}\nPhone: ${extractedData.phone}`;
            
//             // Send the plain text response
//             res.set('Content-Type', 'text/plain');
//             res.send(responseText);
//         })
//         .catch(error => {
//             res.status(500).send('Error extracting data from PDF: ' + error.message);
//         });
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

// // Define Routes
// app.use('/api', authRoutes);

// // Listen on the PORT
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// is my sb kuch ata ha
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// const fileUpload = require("express-fileupload");
// const pdfParse = require("pdf-parse");

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3000', // Adjust as necessary
//   credentials: true,
// }));
// app.use(express.json()); // Parse JSON bodies
// app.use("/", express.static("public"));
// app.use(fileUpload());

// app.post("/extract-text", (req, res) => {
//   if(!req.files && !req.files.pddFile) {
//       res.status(400);
//       res.end();
//   }

//   pdfParse(req.files.pdfFile).then(result => {
//        res.send(result.text);
//   })
// })

// app.listen(3001);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected...'))
//   .catch(err => console.log(err));

// // Define Routes
// app.use('/api', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);

// });